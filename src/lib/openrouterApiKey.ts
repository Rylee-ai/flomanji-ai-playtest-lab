
import { supabase } from "@/integrations/supabase/client";

let cachedApiKey: string | null = null;

const MAX_RETRIEVAL_ATTEMPTS = 3;

export const getOpenRouterApiKey = async (attempts = 0): Promise<string> => {
  if (cachedApiKey) {
    console.log("Using cached API key (masked)");
    return cachedApiKey;
  }
  try {
    if (!supabase) throw new Error("Database connection not available");
    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'openrouter-api-key')
      .maybeSingle();
    if (error) throw new Error(`Database error: ${error.message}`);
    if (data && data.value) {
      cachedApiKey = data.value;
      return data.value;
    }
  } catch (e) {
    if (attempts < MAX_RETRIEVAL_ATTEMPTS - 1) {
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempts) * 500));
      return getOpenRouterApiKey(attempts + 1);
    }
  }
  try {
    const localKey = localStorage.getItem("openrouter-api-key");
    if (localKey) {
      cachedApiKey = localKey;
      return localKey;
    }
  } catch (e) {}
  return "";
};

export const setOpenRouterApiKey = async (apiKey: string): Promise<boolean> => {
  try {
    if (!supabase) throw new Error("Database connection not available");
    const { data: existingData, error: checkError } = await supabase
      .from('settings')
      .select('id')
      .eq('key', 'openrouter-api-key')
      .maybeSingle();
    const { error } = await supabase
      .from('settings')
      .upsert({
        id: existingData?.id,
        key: 'openrouter-api-key',
        value: apiKey,
        updated_at: new Date().toISOString()
      });
    if (error) throw error;
    cachedApiKey = apiKey;
    try {
      localStorage.setItem("openrouter-api-key", apiKey);
    } catch {}
    return true;
  } catch {
    return false;
  }
};

export const clearApiKeyCache = () => {
  cachedApiKey = null;
};
