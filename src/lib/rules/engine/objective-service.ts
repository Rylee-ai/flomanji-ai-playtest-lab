
import { GameState } from "@/types/game-state";

/**
 * Handles objective-related operations including completion and tracking
 */
export class ObjectiveService {
  /**
   * Complete an objective and update game state
   */
  public completeObjective(gameState: GameState, objectiveId: string, characterId?: string): GameState {
    const newState = this.cloneGameState(gameState);
    
    // Check if objective exists and isn't already completed
    const objective = newState.objectives.find(o => o.id === objectiveId);
    if (!objective || newState.completedObjectives.includes(objectiveId)) {
      return newState;
    }
    
    // Add to completed objectives
    newState.completedObjectives.push(objectiveId);
    
    // Add event to turn log
    newState.currentTurn.events.push({
      type: "objective-completed",
      description: `Objective completed: ${objective.description}`,
      timestamp: new Date().toISOString(),
      characterId,
      objectiveId
    });
    
    // Check win conditions after completing objective
    const allRequiredCompleted = newState.objectives
      .filter(obj => obj.required)
      .every(obj => newState.completedObjectives.includes(obj.id));
      
    if (allRequiredCompleted && newState.missionType !== "escape") {
      newState.gameOver = true;
      newState.missionOutcome = "success";
      newState.gameOverReason = "All required objectives completed";
    }
    
    return newState;
  }

  /**
   * Helper method to create a deep copy of the game state
   */
  private cloneGameState(state: GameState): GameState {
    return JSON.parse(JSON.stringify(state));
  }
}
