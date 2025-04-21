
import { ActionValidationResult, GameState, PlayerAction } from "@/types/game-state";

/**
 * Validates if a use-gear action is valid according to game rules
 */
export function validateUseGearAction(
  action: PlayerAction,
  character: any,
  gameState: GameState
): ActionValidationResult {
  if (!action.targetId) {
    return { valid: false, message: "Use gear action requires a gear item ID" };
  }

  const hasGear = character.gear.some((g: any) => g.id === action.targetId);
  if (!hasGear) {
    return { valid: false, message: "Character does not have this gear item" };
  }

  // Check if gear is usable
  const gearItem = character.gear.find((g: any) => g.id === action.targetId);
  if (gearItem && gearItem.usable === false) {
    return { valid: false, message: "This gear item cannot be used" };
  }

  return { valid: true };
}
