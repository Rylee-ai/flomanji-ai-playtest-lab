
import { GameState, PlayerAction } from "@/types/game-state";
import { validateAction } from "../validators/ActionValidator";
import { processMoveAction, processUseGearAction, processInteractAction, processTeamUpAction, processRestAction, processMissionAction } from "../action-processors";

export class ActionProcessor {
  /**
   * Process a player action and update game state accordingly
   * @param action The action to process
   * @param gameState Current game state
   * @returns Updated game state
   */
  public static processAction(action: PlayerAction, gameState: GameState): GameState {
    // First validate the action
    const validation = validateAction(action, gameState);
    if (!validation.valid) {
      console.error(`Invalid action: ${validation.message}`);
      return gameState; // Return unchanged state for invalid actions
    }

    // Create a deep copy of game state to modify
    let newState = JSON.parse(JSON.stringify(gameState));
    
    // Record action as used
    newState.currentTurn.actionsUsed.push({
      characterId: action.characterId,
      actionType: action.type,
      timestamp: new Date().toISOString()
    });

    // Process the action based on its type using the action processors
    switch (action.type) {
      case "move":
        return processMoveAction(action, newState);
      case "use-gear":
        return processUseGearAction(action, newState);
      case "interact":
        return processInteractAction(action, newState);
      case "team-up":
        return processTeamUpAction(action, newState);
      case "rest":
        return processRestAction(action, newState);
      case "mission":
        return processMissionAction(action, newState);
      default:
        return newState;
    }
  }
}
