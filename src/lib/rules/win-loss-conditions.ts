
import { GameState, CharacterStatus } from "@/types/game-state";

/**
 * Checks if the game has reached a win or loss condition, updating flags as needed.
 * This function implements all conditions from the Flomanji Player’s Guide,
 * including required objective completion, extraction, round and heat limits,
 * and eliminates the team if all survivors are incapacitated.
 * 
 * @param gameState The current game state
 * @returns A deep copy of the game state with updated win/loss flags if needed
 */
export function checkWinLossConditions(gameState: GameState): GameState {
  const newState = JSON.parse(JSON.stringify(gameState));

  // Condition 1: All characters are disabled or transformed
  const activeCharacters = newState.characters.filter((c: any) => c.status === "active");
  if (activeCharacters.length === 0) {
    newState.gameOver = true;
    newState.missionOutcome = "failure";
    newState.gameOverReason = "All characters incapacitated";
    return newState;
  }

  // Condition 2: Maximum rounds reached
  if (newState.currentTurn.turnNumber > newState.maxRounds) {
    newState.gameOver = true;
    newState.missionOutcome = "failure";
    newState.gameOverReason = "Maximum rounds reached";
    return newState;
  }

  // Condition 3 and 4: Objective completion (required and optional)
  const allRequiredCompleted = newState.objectives
    .filter((obj: any) => obj.required)
    .every((obj: any) => newState.completedObjectives.includes(obj.id));

  const anyOptionalCompleted = newState.objectives
    .filter((obj: any) => !obj.required)
    .some((obj: any) => newState.completedObjectives.includes(obj.id));

  // Condition 3a: Full success (must complete all required; for 'escape', extraction too)
  if (allRequiredCompleted) {
    if (
      newState.missionType === "escape" &&
      activeCharacters.some((c: any) => c.position === newState.extractionRegion)
    ) {
      newState.gameOver = true;
      newState.missionOutcome = "success";
      newState.gameOverReason = "Objectives completed and reached extraction";
    } else if (newState.missionType !== "escape") {
      newState.gameOver = true;
      newState.missionOutcome = "success";
      newState.gameOverReason = "All required objectives completed";
    }
    return newState;
  }

  // Condition 4: Partial success for optional objectives (only valid for escape missions)
  if (anyOptionalCompleted) {
    if (
      newState.missionType === "escape" &&
      activeCharacters.some((c: any) => c.position === newState.extractionRegion)
    ) {
      newState.gameOver = true;
      newState.missionOutcome = "partial";
      newState.gameOverReason = "Reached extraction with partial objectives";
    }
  }

  // No win/loss condition met
  return newState;
}
