
import { supabase } from "@/integrations/supabase/client";
import { getCachedApiKey, setCachedApiKey } from "./cache";

// Maximum retry attempts for API key retrieval
const MAX_RETRIEVAL_ATTEMPTS = 3;

export const getOpenRouterApiKey = async (attempts = 0): Promise<string> => {
  // If we already have a cached key, return it
  if (getCachedApiKey()) {
    console.log("Using cached API key (masked)");
    return getCachedApiKey()!;
  }
  
  // Try to get the API key from Supabase
  try {
    console.log(`Retrieving API key from database (attempt ${attempts + 1}/${MAX_RETRIEVAL_ATTEMPTS})`);
    
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
      setCachedApiKey(data.value);
      return data.value;
    }
    
    console.log("No API key record found in database");
  } catch (e) {
    console.error("Exception during API key fetch:", e);
    
    if (attempts < MAX_RETRIEVAL_ATTEMPTS - 1) {
      const delay = Math.pow(2, attempts) * 500;
      console.log(`Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return getOpenRouterApiKey(attempts + 1);
    }
  }
  
  // Fallback to localStorage
  try {
    const localKey = localStorage.getItem("openrouter-api-key");
    if (localKey) {
      console.log("Retrieved API key from localStorage");
      setCachedApiKey(localKey);
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
    console.log("Saving API key to database");
    
    const { data: existingData, error: checkError } = await supabase
      .from('settings')
      .select('id')
      .eq('key', 'openrouter-api-key')
      .maybeSingle();
    
    if (checkError) {
      console.error("Error checking existing API key:", checkError);
    }
    
    const { error } = await supabase
      .from('settings')
      .upsert({ 
        id: existingData?.id,
        key: 'openrouter-api-key', 
        value: apiKey,
        updated_at: new Date().toISOString()
      });
      
    if (error) {
      console.error("Error saving API key to database:", error);
      throw error;
    }
    
    console.log("API key saved to database successfully");
    
    setCachedApiKey(apiKey);
    
    try {
      localStorage.setItem("openrouter-api-key", apiKey);
      console.log("API key saved to localStorage");
    } catch (e) {
      console.error("Failed to save API key to localStorage:", e);
    }
    
    return true;
  } catch (e) {
    console.error("Error setting API key:", e);
    return false;
  }
};
