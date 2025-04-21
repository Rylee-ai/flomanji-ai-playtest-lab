
import { getOpenRouterApiKey } from "./openrouterApiKey";

export const fetchOpenRouterModels = async () => {
  const apiKey = await getOpenRouterApiKey();
  if (!apiKey) throw new Error("OpenRouter API key not found");
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
  const data = await response.json();
  return data;
};
