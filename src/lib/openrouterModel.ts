
import { supabase } from "@/integrations/supabase/client";

let cachedModel: string | null = null;
const defaultModel = "google/gemini-pro";
export const FALLBACK_MODELS = [
  "google/gemini-pro",
  "anthropic/claude-3-haiku",
  "anthropic/claude-3-sonnet",
  "anthropic/claude-3-opus",
  "openai/gpt-4-turbo",
  "meta-llama/llama-3-8b-instruct",
  "mistralai/mistral-7b-instruct"
];

export const getOpenRouterModel = async (): Promise<string> => {
  if (cachedModel) return cachedModel;
  try {
    if (!supabase) return defaultModel;
    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'openrouter-model')
      .maybeSingle();
    if (!error && data && data.value) {
      cachedModel = data.value;
      return data.value;
    }
  } catch {}
  try {
    const localModel = localStorage.getItem("openrouter-model");
    if (localModel) {
      cachedModel = localModel;
      return localModel;
    }
  } catch {}
  return defaultModel;
};

export const setOpenRouterModel = async (model: string): Promise<boolean> => {
  try {
    if (!supabase) {
      localStorage.setItem("openrouter-model", model);
      cachedModel = model;
      return true;
    }
    const { data: existingData } = await supabase
      .from('settings')
      .select('id')
      .eq('key', 'openrouter-model')
      .maybeSingle();
    const { error } = await supabase
      .from('settings')
      .upsert({
        id: existingData?.id,
        key: 'openrouter-model',
        value: model,
        updated_at: new Date().toISOString()
      });
    if (error) throw error;
    cachedModel = model;
    localStorage.setItem("openrouter-model", model);
    return true;
  } catch {
    try {
      localStorage.setItem("openrouter-model", model);
      cachedModel = model;
      return true;
    } catch {
      return false;
    }
  }
};

export const clearModelCache = () => {
  cachedModel = null;
};
