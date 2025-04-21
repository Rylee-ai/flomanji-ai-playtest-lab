
import { GameState, CharacterStatus } from "@/types/game-state";

const MAX_HEAT = 10;
const MAX_WEIRDNESS = 10;

export function applyHeatEffects(gameState: GameState): GameState {
  const newState = JSON.parse(JSON.stringify(gameState));
  
  // Apply effects based on current heat level
  if (newState.heat >= 9) {
    // At Heat 9+, all players gain +1 Weirdness each round
    newState.characters = newState.characters.map(character => {
      if (character.status === "active") {
        const newWeirdness = Math.min(MAX_WEIRDNESS, character.weirdness + 1);
        return {
          ...character,
          weirdness: newWeirdness,
          // If weirdness hits maximum, character transforms
          status: newWeirdness >= MAX_WEIRDNESS 
            ? "transformed" as CharacterStatus 
            : character.status
        };
      }
      return character;
    });
  }
  
  // Check for heat-based mission failure
  if (newState.heat >= MAX_HEAT) {
    newState.gameOver = true;
    newState.missionOutcome = "failure";
    newState.gameOverReason = "Heat level reached maximum";
  }
  
  return newState;
}
