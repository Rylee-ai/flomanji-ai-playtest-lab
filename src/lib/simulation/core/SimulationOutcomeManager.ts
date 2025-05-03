
import { AgentMessage, SimulationConfig } from "@/types";
import { createChatCompletion } from "@/lib/openrouterChat";

/**
 * Manages the outcome and results of a simulation
 */
export class SimulationOutcomeManager {
  /**
   * Generate the final narration for a simulation
   */
  public async generateFinalNarration(
    config: SimulationConfig,
    gameState: any,
    conversationLog: AgentMessage[],
    systemPrompt: string
  ): Promise<string> {
    const finalPrompt = `
      The game is over. Provide a final narration that summarizes the events of the game.
      
      Include the following information:
      - The outcome of the mission
      - The fate of the characters
      - Any key events that occurred during the game
      - The final heat level
      
      Speak in the voice of the Flomanji Goblet.
    `;
    
    const gmFinalMessage = await createChatCompletion(
      systemPrompt,
      [...conversationLog.map(entry => {
        const cleanContent = entry.content.replace(/^(GM|Player \d+): /g, '');
        return {
          role: entry.role === 'GM' ? 'assistant' : 'user',
          content: entry.role === 'GM'
            ? `GM: ${cleanContent}`
            : `Player ${entry.playerIndex !== undefined ? entry.playerIndex + 1 : ''}: ${cleanContent}`
        };
      }), { role: "user", content: finalPrompt }]
    );
    
    return gmFinalMessage;
  }
  
  /**
   * Generate critic feedback on the simulation
   */
  public async generateCriticFeedback(
    conversationLog: AgentMessage[],
    systemPrompt: string
  ): Promise<string> {
    const feedbackPrompt = `
      Provide feedback on the GM's performance.
      
      Include the following information:
      - Any errors in the GM's narration or game state management
      - Suggestions for improvements to the GM's performance
      - Key events and decision points in the game
      - Suggestions for improvements to the game rules
      
      Be specific and provide examples from the game log to support your claims.
    `;
    
    const criticMessage = await createChatCompletion(
      systemPrompt,
      [...conversationLog.map(entry => {
        const cleanContent = entry.content.replace(/^(GM|Player \d+): /g, '');
        return {
          role: entry.role === 'GM' ? 'assistant' : 'user',
          content: entry.role === 'GM'
            ? `GM: ${cleanContent}`
            : `Player ${entry.playerIndex !== undefined ? entry.playerIndex + 1 : ''}: ${cleanContent}`
        };
      }), { role: "user", content: feedbackPrompt }]
    );
    
    return criticMessage;
  }
  
  /**
   * Extract key events from the simulation to highlight important moments
   */
  public extractKeyEvents(gameState: any, log: AgentMessage[]): string[] {
    const keyEvents: string[] = [];
    
    // Extract objective completions
    const objectiveEvents = log.filter(entry => 
      entry.metadata?.phase === "objective-completed" || 
      (entry.content.includes("objective") && entry.content.includes("complet"))
    );
    
    objectiveEvents.forEach(event => {
      keyEvents.push(`Objective Completed: ${event.content.replace(/^\[.*?\]\s*/, '')}`);
    });
    
    // Extract treasure discoveries
    const treasureEvents = log.filter(entry => entry.metadata?.phase === "treasure-discovery");
    treasureEvents.forEach(event => {
      if (event.metadata?.discoveredTreasure) {
        keyEvents.push(`Treasure Found: ${event.metadata.discoveredTreasure}`);
      }
    });
    
    // Extract chaos card events
    const chaosEvents = log.filter(entry => entry.metadata?.phase === "chaos-card");
    chaosEvents.forEach(event => {
      if (event.metadata?.drawnChaosCard) {
        keyEvents.push(`Chaos Effect: ${event.metadata.drawnChaosCard}`);
      }
    });
    
    // Extract major hazard events
    const hazardEvents = log.filter(entry => entry.metadata?.phase === "hazard-introduction");
    hazardEvents.forEach(event => {
      keyEvents.push(`Hazard Encountered: ${event.metadata?.hazard}`);
    });
    
    // Add game outcome
    if (gameState.missionOutcome) {
      keyEvents.push(
        `Mission ${gameState.missionOutcome === 'success' ? 'Success' : 'Failure'}: ${gameState.gameOverReason || 'Mission completed'}`
      );
    }
    
    return keyEvents;
  }
}
