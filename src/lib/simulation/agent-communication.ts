
import { createChatCompletion } from "@/lib/openrouterChat";
import { AgentMessage } from "@/types";

/**
 * Handles communication with AI agents through the OpenRouter API
 */
export async function getGMResponse(
  gmSystemPrompt: string, 
  conversationLog: AgentMessage[], 
  prompt: string
): Promise<string> {
  // Format messages properly for the GM without role repetition
  const formattedMessages = conversationLog.map(entry => {
    // Remove any role prefixes that might already be in the content
    const cleanContent = entry.content.replace(/^(GM|Player \d+): /g, '');
    
    return {
      role: entry.role === 'GM' ? 'assistant' : 'user',
      content: entry.role === 'GM'
        ? `GM: ${cleanContent}`
        : `Player ${entry.playerIndex !== undefined ? entry.playerIndex + 1 : ''}: ${cleanContent}`
    };
  });
  
  // Add the new prompt
  formattedMessages.push({ role: "user", content: prompt });
  
  // Get GM's response
  const gmResponse = await createChatCompletion(
    gmSystemPrompt,
    formattedMessages
  );

  // Remove role prefix if it exists in the response
  return gmResponse.replace(/^GM: /g, '');
}

/**
 * Handles getting player character responses
 */
export async function getPlayerResponse(
  playerSystemPrompt: string,
  conversationLog: AgentMessage[],
  playerIdx: number,
  prompt: string
): Promise<string> {
  // Format messages properly for the player without role repetition
  const playerMessages = conversationLog.map(entry => {
    // Remove any role prefixes that might already be in the content
    const cleanContent = entry.content.replace(/^(GM|Player \d+): /g, '');
    
    return {
      role: entry.role === 'Player' ? 'assistant' : 'user',
      content: entry.role === 'Player' 
        ? `Player ${entry.playerIndex !== undefined ? entry.playerIndex + 1 : ''}: ${cleanContent}`
        : `GM: ${cleanContent}`
    };
  });
  
  // Add player-specific prompt
  playerMessages.push({ 
    role: 'user', 
    content: prompt 
  });

  // Get player's response
  const playerResponse = await createChatCompletion(
    playerSystemPrompt,
    playerMessages
  );

  // Remove role prefix if it exists in the response
  return playerResponse.replace(/^(Player \d+): /g, '');
}

/**
 * Handles getting critic feedback
 */
export async function getCriticFeedback(
  criticSystemPrompt: string,
  transcript: string,
  simulationMetadata: string
): Promise<string> {
  const criticPrompt = `
  Here is the full simulation metadata:
  ${simulationMetadata}
  
  Here is the transcript of the session:
  
  ${transcript}
  
  Please provide your analysis focusing on how well the rules were applied, the balance of the game, and the player experience.`;

  return createChatCompletion(
    criticSystemPrompt,
    [{ role: "user", content: criticPrompt }]
  );
}
