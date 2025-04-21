
import { ActionValidationResult, GameState, PlayerAction } from "@/types/game-state";

/**
 * Validates if a team-up action is valid according to game rules
 */
export function validateTeamUpAction(
  action: PlayerAction,
  character: any,
  gameState: GameState
): ActionValidationResult {
  if (!action.targetId) {
    return { valid: false, message: "Team-up action requires a target character ID" };
  }

  // Validate team-up target exists and is active
  const targetCharacter = gameState.characters.find(c => c.id === action.targetId);
  if (!targetCharacter) {
    return { valid: false, message: "Target character not found" };
  }

  if (targetCharacter.status !== "active") {
    return { valid: false, message: "Target character must be active" };
  }

  // Check if characters are in the same region
  if (targetCharacter.position !== character.position) {
    return { valid: false, message: "Target character must be in same region" };
  }

  // Check if character is teaming up with themselves
  if (targetCharacter.id === character.id) {
    return { valid: false, message: "Character cannot team up with themselves" };
  }

  return { valid: true };
}
