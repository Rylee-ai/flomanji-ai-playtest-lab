
import { AgentMessage } from "@/types";

/**
 * Manages the game over conditions and determines if the game should end
 */
export class GameOverConditionManager {
  /**
   * Check if any game over condition has been met
   * @param gameState The current game state
   * @returns An array of messages describing the game over condition
   */
  public checkGameOverConditions(gameState: any): AgentMessage[] {
    const messages: AgentMessage[] = [];
    
    // Check if game is over due to heat level
    if (gameState.heat >= 10) {
      gameState.gameOver = true;
      gameState.missionOutcome = "failure";
      gameState.gameOverReason = "Heat level reached maximum";
      
      messages.push({
        role: 'GM',
        content: `[Game Over] Heat has reached critical levels (${gameState.heat}/10). The mission has failed.`,
        timestamp: new Date().toISOString(),
        metadata: {
          phase: "game-over",
          heat: gameState.heat,
          gameState: {...gameState}
        }
      });
    }
    
    // Check if all objectives completed
    const allRequiredObjectivesCompleted = (gameState.objectives || [])
      .filter((obj: any) => obj.required)
      .every((obj: any) => (gameState.completedObjectives || []).includes(obj.id));
      
    if (allRequiredObjectivesCompleted && gameState.currentRound >= 1) {
      gameState.gameOver = true;
      gameState.missionOutcome = "success";
      gameState.gameOverReason = "All required objectives completed";
      
      messages.push({
        role: 'GM',
        content: `[Game Over] All required objectives have been completed. The mission is a success!`,
        timestamp: new Date().toISOString(),
        metadata: {
          phase: "game-over",
          gameState: {...gameState}
        }
      });
    }
    
    return messages;
  }
}
