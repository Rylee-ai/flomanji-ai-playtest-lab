
// Cache for API key and model to avoid frequent database calls
let cachedApiKey: string | null = null;
let cachedModel: string | null = null;

export const getCachedApiKey = () => cachedApiKey;
export const setCachedApiKey = (key: string | null) => {
  cachedApiKey = key;
};

export const getCachedModel = () => cachedModel;
export const setCachedModel = (model: string | null) => {
  cachedModel = model;
};

export const clearOpenRouterCache = () => {
  cachedApiKey = null;
  cachedModel = null;
  console.log("OpenRouter cache cleared");
};
