
import { ActionValidationResult, GameState, PlayerAction } from "@/types/game-state";

/**
 * Validates if a move action is valid according to game rules
 */
export function validateMoveAction(
  action: PlayerAction,
  character: any,
  gameState: GameState
): ActionValidationResult {
  if (!action.targetId) {
    return { valid: false, message: "Move action requires a target region" };
  }

  // Check if target region exists
  const targetRegion = gameState.regions.find(r => r.id === action.targetId);
  if (!targetRegion) {
    return { valid: false, message: "Target region does not exist" };
  }

  // Check if regions are adjacent
  const currentRegion = gameState.regions.find(r => r.id === character.position);
  if (!currentRegion) {
    return { valid: false, message: "Character's current region not found" };
  }

  // Check if target region is adjacent to current region
  if (currentRegion.adjacentRegions && 
      !currentRegion.adjacentRegions.includes(action.targetId)) {
    return { valid: false, message: "Target region is not adjacent" };
  }

  // Check if region is locked
  if (targetRegion.locked) {
    return { valid: false, message: "Target region is locked" };
  }

  return { valid: true };
}
