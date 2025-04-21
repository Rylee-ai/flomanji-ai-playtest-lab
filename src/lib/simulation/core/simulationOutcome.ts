
import { SimulationConfig, AgentMessage } from "@/types";
import { getCriticSystemPrompt } from "@/lib/prompts";
import { createFormattedTranscript, createSimulationMetadata } from "../game-events";
import { getCriticFeedback } from "../agent-communication";

/**
 * Generates conclusion and critic feedback for a completed simulation
 */
export async function generateConclusionAndFeedback(
  conversationLog: AgentMessage[],
  config: SimulationConfig,
  rulesContent: string
): Promise<string> {
  // Create formatted transcript and metadata
  const formattedTranscript = createFormattedTranscript(conversationLog);
  
  // Extract game state from the last message
  const lastMessageWithGameState = [...conversationLog]
    .reverse()
    .find(msg => msg.metadata?.gameState);
    
  const finalGameState = lastMessageWithGameState?.metadata?.gameState || {};
  
  const metadataString = createSimulationMetadata(
    config, 
    finalGameState.heat || 0,
    finalGameState.completedObjectives || []
  );
  
  // Determine the outcome based on conversation log
  const outcomeMessage = conversationLog.find(msg => 
    msg.metadata?.phase === "game-over");
    
  const outcome = outcomeMessage?.metadata?.outcome || "incomplete";
  
  const criticSystemPrompt = getCriticSystemPrompt(rulesContent);
  
  // Get critic feedback
  return await getCriticFeedback(
    criticSystemPrompt,
    formattedTranscript,
    metadataString
  );
}
