
// OpenRouter client configuration
export const getOpenRouterApiKey = (): string => {
  return localStorage.getItem("openrouter-api-key") || "";
};

export const getOpenRouterModel = (): string => {
  return localStorage.getItem("openrouter-model") || "anthropic/claude-3-opus";
};

// Chat completion helper function
export const createChatCompletion = async (
  systemPrompt: string, 
  messages: {role: string, content: string}[]
): Promise<string> => {
  try {
    const apiKey = getOpenRouterApiKey();
    const model = getOpenRouterModel();
    
    if (!apiKey) {
      throw new Error("OpenRouter API key not found. Please set it in the Settings page.");
    }

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
        max_tokens: 2000
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenRouter API error: ${errorData.error?.message || response.statusText}`);
    }
    
    const data = await response.json();
    return data.choices[0]?.message?.content || "No response generated";
  } catch (error) {
    console.error("Error creating chat completion:", error);
    throw new Error(`Failed to get response from OpenRouter: ${error}`);
  }
};

// Function to fetch available OpenRouter models
export const fetchOpenRouterModels = async () => {
  const apiKey = getOpenRouterApiKey();
  
  if (!apiKey) {
    throw new Error("OpenRouter API key not found");
  }
  
  const response = await fetch('https://openrouter.ai/api/v1/models', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': window.location.href,
    }
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch models: ${response.status}`);
  }
  
  return await response.json();
};
