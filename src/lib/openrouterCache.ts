
import { clearApiKeyCache } from "./openrouterApiKey";
import { clearModelCache } from "./openrouterModel";

export const clearOpenRouterCache = () => {
  clearApiKeyCache();
  clearModelCache();
  console.log("OpenRouter cache cleared");
};
