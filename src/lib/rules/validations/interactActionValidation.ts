
import { ActionValidationResult, GameState, PlayerAction } from "@/types/game-state";

/**
 * Validates if an interact action is valid according to game rules
 */
export function validateInteractAction(
  action: PlayerAction,
  character: any,
  gameState: GameState
): ActionValidationResult {
  if (!action.targetId) {
    return { valid: false, message: "Interact action requires a target ID" };
  }

  // Check if the target is in the same region
  const region = gameState.regions.find(r => r.id === character.position);
  if (!region) {
    return { valid: false, message: "Character's region not found" };
  }

  // Check if the target is in the region's interactables
  if (region.interactables && 
      !region.interactables.some((i: any) => i.id === action.targetId)) {
    return { valid: false, message: "Target is not available for interaction in this region" };
  }

  return { valid: true };
}
