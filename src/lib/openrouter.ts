import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

// Cache for API key to avoid frequent database calls
let cachedApiKey: string | null = null;
let cachedModel: string | null = null;

export const getOpenRouterApiKey = async (): Promise<string> => {
  // If we already have a cached key, return it
  if (cachedApiKey) return cachedApiKey;
  
  // Try to get the API key from Supabase
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'openrouter-api-key')
      .single();
      
    if (error) {
      console.error("Error fetching API key from database:", error);
      // If there's an error, we'll fall back to localStorage
    } else if (data && data.value) {
      console.log("Retrieved API key from database (masked)");
      cachedApiKey = data.value;
      return data.value;
    }
  } catch (e) {
    console.error("Exception during API key fetch:", e);
  }
  
  // Fallback to localStorage if database fetch fails
  try {
    const localKey = localStorage.getItem("openrouter-api-key");
    if (localKey) {
      console.log("Retrieved API key from localStorage (masked)");
      cachedApiKey = localKey;
      return localKey;
    }
  } catch (e) {
    console.error("Error accessing localStorage:", e);
  }
  
  console.log("No API key found in database or localStorage");
  return "";
};

export const setOpenRouterApiKey = async (apiKey: string): Promise<boolean> => {
  try {
    console.log("Attempting to save API key to database");
    // Update the database
    const { error } = await supabase
      .from('settings')
      .upsert({ 
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

export const getOpenRouterModel = async (): Promise<string> => {
  if (cachedModel) return cachedModel;
  
  // Try to get the model from Supabase
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'openrouter-model')
      .single();
      
    if (error) {
      console.error("Error fetching model from database:", error);
      // If there's an error or no model found, fall back to localStorage
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

export const setOpenRouterModel = async (model: string): Promise<boolean> => {
  try {
    // Update the database
    const { error } = await supabase
      .from('settings')
      .upsert({ 
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
      const errorData = await response.json();
      throw new Error(`OpenRouter API error: ${errorData.error?.message || response.statusText}`);
    }
    
    const data = await response.json();
    return data.choices[0]?.message?.content || "No response generated";
  } catch (error) {
    console.error("Error creating chat completion:", error);
    throw new Error(`Failed to get response from OpenRouter: ${error}`);
  }
};

// Function to fetch available OpenRouter models
export const fetchOpenRouterModels = async () => {
  const apiKey = await getOpenRouterApiKey();
  
  if (!apiKey) {
    throw new Error("OpenRouter API key not found");
  }
  
  const response = await fetch('https://openrouter.ai/api/v1/models', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': window.location.href,
    }
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch models: ${response.status}`);
  }
  
  return await response.json();
};
