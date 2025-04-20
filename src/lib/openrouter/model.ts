
import { supabase } from "@/integrations/supabase/client";
import { getCachedModel, setCachedModel } from "./cache";

export const getOpenRouterModel = async (): Promise<string> => {
  if (getCachedModel()) {
    return getCachedModel()!;
  }
  
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'openrouter-model')
      .maybeSingle();
      
    if (error) {
      console.error("Error fetching model from database:", error);
    } else if (data && data.value) {
      setCachedModel(data.value);
      return data.value;
    }
  } catch (e) {
    console.error("Error fetching model from database:", e);
  }
  
  const localModel = localStorage.getItem("openrouter-model") || "anthropic/claude-3-opus";
  setCachedModel(localModel);
  
  return localModel;
};

export const setOpenRouterModel = async (model: string): Promise<boolean> => {
  try {
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
    
    setCachedModel(model);
    localStorage.setItem("openrouter-model", model);
    
    return true;
  } catch (e) {
    console.error("Error setting model in database:", e);
    return false;
  }
};
