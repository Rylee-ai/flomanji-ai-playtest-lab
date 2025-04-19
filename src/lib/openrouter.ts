
// OpenRouter client configuration
export const OPENROUTER_API_KEY = localStorage.getItem("openrouter-api-key") || "";

// Chat completion helper function
export const createChatCompletion = async (
  systemPrompt: string, 
  messages: {role: string, content: string}[]
): Promise<string> => {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': window.location.href,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-opus',
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
    
    const data = await response.json();
    return data.choices[0]?.message?.content || "No response generated";
  } catch (error) {
    console.error("Error creating chat completion:", error);
    throw new Error(`Failed to get response from OpenRouter: ${error}`);
  }
};
