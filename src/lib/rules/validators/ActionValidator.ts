
import { ActionValidationResult, GameState, PlayerAction } from "@/types/game-state";
import {
  validateMoveAction,
  validateUseGearAction,
  validateInteractAction,
  validateTeamUpAction,
  validateRestAction,
  validateMissionAction
} from "../action-validations";

/**
 * Validates if a player action is valid according to game rules
 */
export function validateAction(action: PlayerAction, gameState: GameState): ActionValidationResult {
  // Verify character exists and is active
  const character = gameState.characters.find(c => c.id === action.characterId);
  
  if (!character) {
    return { valid: false, message: "Character not found" };
  }
  
  if (character.status !== "active") {
    return { 
      valid: false, 
      message: `Character cannot act: ${character.status}` 
    };
  }

  // Check if player has actions remaining this turn
  const actionsUsed = gameState.currentTurn.actionsUsed.filter(
    a => a.characterId === character.id
  ).length;
  
  if (actionsUsed >= 2) {
    return { valid: false, message: "No actions remaining this turn" };
  }

  // Validate action by type
  switch (action.type) {
    case "move":
      return validateMoveAction(action, character, gameState);
    case "use-gear":
      return validateUseGearAction(action, character, gameState);
    case "interact":
      return validateInteractAction(action, character, gameState);
    case "team-up":
      return validateTeamUpAction(action, character, gameState);
    case "rest":
      return validateRestAction(action, character, gameState);
    case "mission":
      return validateMissionAction(action, character, gameState);
    default:
      return { valid: false, message: "Unknown action type" };
  }
}
