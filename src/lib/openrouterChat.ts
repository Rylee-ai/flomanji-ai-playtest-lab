
import { getOpenRouterApiKey } from "./openrouterApiKey";
import { getOpenRouterModel, FALLBACK_MODELS } from "./openrouterModel";

type ChatMessage = { role: string, content: string };

const makeOpenRouterRequest = async (
  apiKey: string,
  model: string,
  systemPrompt: string,
  messages: ChatMessage[]
): Promise<string> => {
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
      max_tokens: 2000,
      return_images: false,
      return_related_questions: false,
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
};

export const createChatCompletion = async (
  systemPrompt: string,
  messages: ChatMessage[]
): Promise<string> => {
  let apiKey: string;
  let primaryModel: string;
  let attemptedModels: string[] = [];
  apiKey = await getOpenRouterApiKey();
  primaryModel = await getOpenRouterModel();

  if (!apiKey) {
    throw new Error("OpenRouter API key not found. Please set it in the Settings page.");
  }

  let modelToUse = primaryModel;
  attemptedModels.push(modelToUse);
  try {
    return await makeOpenRouterRequest(apiKey, modelToUse, systemPrompt, messages);
  } catch {
    // Try fallbacks, one by one
    for (const fallback of FALLBACK_MODELS) {
      if (!attemptedModels.includes(fallback)) {
        attemptedModels.push(fallback);
        try {
          return await makeOpenRouterRequest(apiKey, fallback, systemPrompt, messages);
        } catch {}
      }
    }
    throw new Error(`Failed with all models (${attemptedModels.join(", ")}). Please try again later or select a different model in Settings.`);
  }
};
