
import { supabase } from "@/integrations/supabase/client";

// Cache for API key to avoid frequent database calls
let cachedApiKey: string | null = null;
let cachedModel: string | null = null;

// Maximum retry attempts for API key retrieval
const MAX_RETRIEVAL_ATTEMPTS = 3;

/**
 * Gets the OpenRouter API key with retry mechanism
 * Fetches from database first, then fallbacks to localStorage
 */
export const getOpenRouterApiKey = async (attempts = 0): Promise<string> => {
  // If we already have a cached key, return it
  if (cachedApiKey) {
    console.log("Using cached API key (masked)");
    return cachedApiKey;
  }
  
  // Try to get the API key from Supabase
  try {
    console.log(`Retrieving API key from database (attempt ${attempts + 1}/${MAX_RETRIEVAL_ATTEMPTS})`);
    
    // Use maybeSingle to properly handle no results case
    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'openrouter-api-key')
      .maybeSingle();
      
    if (error) {
      console.error("Database error fetching API key:", error.message);
      throw new Error(`Database error: ${error.message}`);
    } 
    
    if (data && data.value) {
      console.log("Successfully retrieved API key from database");
      cachedApiKey = data.value;
      return data.value;
    } else {
      console.log("No API key record found in database");
    }
  } catch (e) {
    console.error("Exception during API key fetch:", e);
    
    // If we haven't reached max attempts, retry with exponential backoff
    if (attempts < MAX_RETRIEVAL_ATTEMPTS - 1) {
      const delay = Math.pow(2, attempts) * 500; // Exponential backoff
      console.log(`Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return getOpenRouterApiKey(attempts + 1);
    }
  }
  
  // Fallback to localStorage if database fetch fails
  try {
    const localKey = localStorage.getItem("openrouter-api-key");
    if (localKey) {
      console.log("Retrieved API key from localStorage");
      cachedApiKey = localKey;
      return localKey;
    }
  } catch (e) {
    console.error("Error accessing localStorage:", e);
  }
  
  console.log("No API key found in database or localStorage");
  return "";
};

/**
 * Saves the OpenRouter API key to both database and localStorage
 */
export const setOpenRouterApiKey = async (apiKey: string): Promise<boolean> => {
  try {
    console.log("Saving API key to database");
    
    // Check if a record already exists
    const { data: existingData, error: checkError } = await supabase
      .from('settings')
      .select('id')
      .eq('key', 'openrouter-api-key')
      .maybeSingle();
    
    if (checkError) {
      console.error("Error checking existing API key:", checkError);
    }
    
    // Update the database - use upsert to handle both insert and update cases
    const { error } = await supabase
      .from('settings')
      .upsert({ 
        id: existingData?.id, // Will be undefined for new records
        key: 'openrouter-api-key', 
        value: apiKey,
        updated_at: new Date().toISOString()
      });
      
    if (error) {
      console.error("Error saving API key to database:", error);
      throw error;
    }
    
    console.log("API key saved to database successfully");
    
    // Update the cache
    cachedApiKey = apiKey;
    
    // Also update localStorage as fallback
    try {
      localStorage.setItem("openrouter-api-key", apiKey);
      console.log("API key saved to localStorage");
    } catch (e) {
      console.error("Failed to save API key to localStorage:", e);
      // Continue anyway since we saved to database
    }
    
    return true;
  } catch (e) {
    console.error("Error setting API key:", e);
    return false;
  }
};

/**
 * Gets the selected OpenRouter model
 */
export const getOpenRouterModel = async (): Promise<string> => {
  if (cachedModel) {
    return cachedModel;
  }
  
  // Try to get the model from Supabase
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'openrouter-model')
      .maybeSingle();
      
    if (error) {
      console.error("Error fetching model from database:", error);
    } else if (data && data.value) {
      cachedModel = data.value;
      return data.value;
    }
  } catch (e) {
    console.error("Error fetching model from database:", e);
  }
  
  // Fallback to localStorage
  const localModel = localStorage.getItem("openrouter-model") || "anthropic/claude-3-opus";
  if (localModel) {
    cachedModel = localModel;
  }
  
  return cachedModel || "anthropic/claude-3-opus";
};

/**
 * Saves the selected OpenRouter model
 */
export const setOpenRouterModel = async (model: string): Promise<boolean> => {
  try {
    // Check if a record already exists
    const { data: existingData } = await supabase
      .from('settings')
      .select('id')
      .eq('key', 'openrouter-model')
      .maybeSingle();
      
    // Update the database
    const { error } = await supabase
      .from('settings')
      .upsert({ 
        id: existingData?.id, // Will be undefined for new records
        key: 'openrouter-model', 
        value: model,
        updated_at: new Date().toISOString()
      });
      
    if (error) throw error;
    
    // Update the cache
    cachedModel = model;
    
    // Also update localStorage as fallback
    localStorage.setItem("openrouter-model", model);
    
    return true;
  } catch (e) {
    console.error("Error setting model in database:", e);
    return false;
  }
};

// Function to clear cached values (for testing or debugging)
export const clearOpenRouterCache = () => {
  cachedApiKey = null;
  cachedModel = null;
  console.log("OpenRouter cache cleared");
};

// Chat completion helper function
export const createChatCompletion = async (
  systemPrompt: string, 
  messages: {role: string, content: string}[]
): Promise<string> => {
  try {
    const apiKey = await getOpenRouterApiKey();
    const model = await getOpenRouterModel();
    
    if (!apiKey) {
      throw new Error("OpenRouter API key not found. Please set it in the Settings page.");
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': window.location.href,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.map(msg => ({
            role: msg.role === "user" ? "user" : "assistant",
            content: msg.content
          }))
        ],
        temperature: 0.7,
        max_tokens: 2000
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error?.message || response.statusText || `Status ${response.status}`;
      throw new Error(`OpenRouter API error: ${errorMessage}`);
    }
    
    const data = await response.json();
    
    if (!data.choices || !data.choices[0]?.message?.content) {
      throw new Error("Received invalid response format from OpenRouter");
    }
    
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error creating chat completion:", error);
    throw new Error(`Failed to get response from OpenRouter: ${error.message || error}`);
  }
};

// Function to fetch available OpenRouter models
export const fetchOpenRouterModels = async () => {
  const apiKey = await getOpenRouterApiKey();
  
  if (!apiKey) {
    throw new Error("OpenRouter API key not found");
  }
  
  try {
    const response = await fetch('https://openrouter.ai/api/v1/models', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': window.location.href,
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error || response.statusText || `Status ${response.status}`;
      throw new Error(`Failed to fetch models: ${errorMessage}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching OpenRouter models:", error);
    throw error;
  }
};
