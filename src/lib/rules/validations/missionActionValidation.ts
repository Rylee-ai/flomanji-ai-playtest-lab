
import { ActionValidationResult, GameState, PlayerAction } from "@/types/game-state";

/**
 * Validates if a mission action is valid according to game rules
 */
export function validateMissionAction(
  action: PlayerAction,
  character: any,
  gameState: GameState
): ActionValidationResult {
  if (!action.targetId) {
    return { valid: false, message: "Mission action requires an objective ID" };
  }

  // Check if the objective exists
  const objective = gameState.objectives.find(o => o.id === action.targetId);
  if (!objective) {
    return { valid: false, message: "Objective not found" };
  }

  // Check if objective is already completed
  if (gameState.completedObjectives.includes(objective.id)) {
    return { valid: false, message: "Objective already completed" };
  }

  // Check if character is in the required region (if applicable)
  if (objective.regionId && character.position !== objective.regionId) {
    return { valid: false, message: "Character must be in the required region to complete this objective" };
  }

  // Check if character has required items (if applicable)
  if (objective.requiredItems && objective.requiredItems.length > 0) {
    const missingItems = objective.requiredItems.filter(
      itemId => !character.gear.some((g: any) => g.id === itemId)
    );

    if (missingItems.length > 0) {
      return { valid: false, message: "Character is missing required items" };
    }
  }

  return { valid: true };
}
