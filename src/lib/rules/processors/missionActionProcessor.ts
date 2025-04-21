
import { PlayerAction, GameState } from "@/types/game-state";

/**
 * Process a mission action - Character attempts to complete an objective
 * @param action The mission action to process
 * @param gameState Current game state
 * @returns Updated game state after mission action
 */
export function processMissionAction(action: PlayerAction, gameState: GameState): GameState {
  const newState = JSON.parse(JSON.stringify(gameState));
  const characterIndex = newState.characters.findIndex(c => c.id === action.characterId);
  
  if (characterIndex === -1 || !action.targetId) {
    return newState;
  }
  
  const character = newState.characters[characterIndex];
  
  // Check if the objective exists
  const objective = newState.objectives.find(o => o.id === action.targetId);
  if (!objective) {
    return newState;
  }
  
  // Check if objective is already completed
  if (newState.completedObjectives.includes(objective.id)) {
    return newState;
  }
  
  // Add to completed objectives
  newState.completedObjectives.push(objective.id);
  
  // Add event to turn log
  newState.currentTurn.events.push({
    type: "objective-completed",
    description: `Objective completed: ${objective.description}`,
    timestamp: new Date().toISOString(),
    characterId: character.id,
    objectiveId: objective.id
  });
  
  // Check win conditions after completing objective
  const allRequiredCompleted = newState.objectives
    .filter(obj => obj.required)
    .every(obj => newState.completedObjectives.includes(obj.id));
    
  if (allRequiredCompleted && newState.missionType !== "escape") {
    newState.gameOver = true;
    newState.missionOutcome = "success";
    newState.gameOverReason = "All required objectives completed";
  }
  
  return newState;
}
