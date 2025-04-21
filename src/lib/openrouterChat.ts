
import { getOpenRouterApiKey } from "./openrouterApiKey";
import { getOpenRouterModel, FALLBACK_MODELS, setOpenRouterModel } from "./openrouterModel";

type ChatMessage = { role: string, content: string };

const makeOpenRouterRequest = async (
  apiKey: string,
  model: string,
  systemPrompt: string,
  messages: ChatMessage[]
): Promise<{ content: string, model: string }> => {
  console.log(`Attempting to use model: ${model}`);
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
    throw new Error(`OpenRouter API error (${model}): ${errorMessage}`);
  }

  const data = await response.json();
  if (!data.choices || !data.choices[0]?.message?.content) {
    throw new Error(`Received invalid response format from OpenRouter using model ${model}`);
  }
  return {
    content: data.choices[0].message.content,
    model: model
  };
};

export const createChatCompletion = async (
  systemPrompt: string,
  messages: ChatMessage[]
): Promise<string> => {
  let apiKey: string;
  let primaryModel: string;
  let attemptedModels: string[] = [];
  let lastError: Error | null = null;
  let successfulModel: string | null = null;
  
  try {
    apiKey = await getOpenRouterApiKey();
    if (!apiKey) {
      throw new Error("OpenRouter API key not found. Please set it in the Settings page.");
    }
    
    // Try primary model first
    primaryModel = await getOpenRouterModel();
    attemptedModels.push(primaryModel);
    
    try {
      const result = await makeOpenRouterRequest(apiKey, primaryModel, systemPrompt, messages);
      successfulModel = result.model;
      return result.content;
    } catch (error) {
      console.error(`Error with primary model ${primaryModel}:`, error);
      lastError = error;
    }
    
    // If primary model failed, try fallbacks one by one
    for (const fallback of FALLBACK_MODELS) {
      if (!attemptedModels.includes(fallback)) {
        attemptedModels.push(fallback);
        try {
          console.log(`Trying fallback model: ${fallback}`);
          const result = await makeOpenRouterRequest(apiKey, fallback, systemPrompt, messages);
          
          // If this fallback worked, update the default model for future requests
          try {
            await setOpenRouterModel(fallback);
            console.log(`Updated default model to ${fallback} since it worked`);
          } catch (e) {
            console.warn("Unable to update default model:", e);
          }
          
          successfulModel = result.model;
          return result.content;
        } catch (error) {
          console.error(`Error with fallback model ${fallback}:`, error);
          lastError = error;
        }
      }
    }
    
    // If we got here, all models failed
    throw new Error(`Failed with all models (${attemptedModels.join(", ")}). Please try again later or select a different model in Settings.`);
  } catch (error) {
    console.error("Chat completion error:", error);
    
    // Provide more helpful error message based on the type of failure
    if (!apiKey) {
      throw new Error("OpenRouter API key not found. Please set it in the Settings page.");
    } else if (attemptedModels.length === 0) {
      throw new Error("No models were attempted. Please check your network connection and try again.");
    } else if (lastError && lastError.message.includes("rate_limit")) {
      throw new Error(`Rate limit exceeded for models (${attemptedModels.join(", ")}). Please try again in a few minutes.`);
    } else if (lastError && lastError.message.includes("insufficient_quota")) {
      throw new Error(`Insufficient quota for models (${attemptedModels.join(", ")}). Please check your OpenRouter account.`);
    } else {
      throw error;
    }
  }
};
