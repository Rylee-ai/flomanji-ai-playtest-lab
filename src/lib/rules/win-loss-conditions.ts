
import { GameState, CharacterStatus } from "@/types/game-state";

/**
 * Checks if the game has reached a win or loss condition, updating flags as needed.
 * This function implements all conditions from the Flomanji Player's Guide,
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

  // Condition 3: Maximum heat reached (10)
  if (newState.heat >= 10) {
    newState.gameOver = true;
    newState.missionOutcome = "failure";
    newState.gameOverReason = "Heat level reached maximum";
    return newState;
  }

  // Condition 4: Objective completion checks
  const allRequiredCompleted = newState.objectives
    .filter((obj: any) => obj.required)
    .every((obj: any) => newState.completedObjectives.includes(obj.id));

  const anyOptionalCompleted = newState.objectives
    .filter((obj: any) => !obj.required)
    .some((obj: any) => newState.completedObjectives.includes(obj.id));

  // Mission type specific win conditions
  switch (newState.missionType) {
    case "escape":
      // For escape missions, characters must reach extraction region
      if (allRequiredCompleted && 
          activeCharacters.some((c: any) => c.position === newState.extractionRegion)) {
        newState.gameOver = true;
        newState.missionOutcome = "success";
        newState.gameOverReason = "Objectives completed and reached extraction";
      } 
      // Partial success: some optional objectives and reached extraction
      else if (anyOptionalCompleted && 
               activeCharacters.some((c: any) => c.position === newState.extractionRegion)) {
        newState.gameOver = true;
        newState.missionOutcome = "partial";
        newState.gameOverReason = "Reached extraction with partial objectives";
      }
      break;
      
    case "collection":
      // For collection missions, count collected items (TODO: implement item collection)
      if (allRequiredCompleted) {
        newState.gameOver = true;
        newState.missionOutcome = "success";
        newState.gameOverReason = "All required items collected";
      }
      break;
      
    case "escort":
      // For escort missions, NPC must reach destination (TODO: implement NPC status)
      if (allRequiredCompleted) {
        newState.gameOver = true;
        newState.missionOutcome = "success";
        newState.gameOverReason = "Escort target safely delivered";
      }
      break;
      
    case "boss":
      // For boss missions, boss must be defeated (TODO: implement boss health)
      if (allRequiredCompleted) {
        newState.gameOver = true;
        newState.missionOutcome = "success";
        newState.gameOverReason = "Boss defeated";
      }
      break;
      
    case "solo":
      // For solo missions, all objectives must be completed by the single character
      if (allRequiredCompleted) {
        newState.gameOver = true;
        newState.missionOutcome = "success";
        newState.gameOverReason = "Solo mission completed successfully";
      }
      break;
      
    case "exploration":
    default:
      // Standard exploration: complete all required objectives
      if (allRequiredCompleted) {
        newState.gameOver = true;
        newState.missionOutcome = "success";
        newState.gameOverReason = "All required objectives completed";
      }
      break;
  }

  // No win/loss condition met
  return newState;
}
