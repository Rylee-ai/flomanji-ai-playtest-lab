
import { ActionValidationResult, GameState, PlayerAction } from "@/types/game-state";

/**
 * Validates if a rest action is valid according to game rules
 */
export function validateRestAction(
  action: PlayerAction,
  character: any,
  gameState: GameState
): ActionValidationResult {
  // Check if character is already at max health
  if (character.health >= 10) {
    return { valid: false, message: "Character already at maximum health" };
  }

  // Check if the region allows resting
  const region = gameState.regions.find(r => r.id === character.position);
  if (region && region.noRest) {
    return { valid: false, message: "Resting is not allowed in this region" };
  }

  return { valid: true };
}
