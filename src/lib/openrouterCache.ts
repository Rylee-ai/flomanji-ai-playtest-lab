
import { clearApiKeyCache } from "./openrouterApiKey";
import { clearModelCache } from "./openrouterModel";

// Clears all OpenRouter-related caches
export const clearOpenRouterCache = () => {
  clearApiKeyCache();
  clearModelCache();
};
