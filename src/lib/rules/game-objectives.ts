
// Complete objectives and check for win-conditions
import { GameState } from "@/types/game-state";

export function completeObjective(gameState: GameState, objectiveId: string, characterId?: string): GameState {
  const newState = JSON.parse(JSON.stringify(gameState));
  const objective = newState.objectives.find((o) => o.id === objectiveId);

  if (!objective || newState.completedObjectives.includes(objectiveId)) {
    return newState;
  }
  newState.completedObjectives.push(objectiveId);

  newState.currentTurn.events.push({
    type: "objective-completed",
    description: `Objective completed: ${objective.description}`,
    timestamp: new Date().toISOString(),
    characterId,
    objectiveId
  });

  const allRequiredCompleted = newState.objectives
    .filter((obj) => obj.required)
    .every((obj) => newState.completedObjectives.includes(obj.id));

  if (allRequiredCompleted && newState.missionType !== "escape") {
    newState.gameOver = true;
    newState.missionOutcome = "success";
    newState.gameOverReason = "All required objectives completed";
  }
  return newState;
}
