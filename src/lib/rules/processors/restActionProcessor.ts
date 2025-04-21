
import { PlayerAction, GameState } from "@/types/game-state";

/**
 * Process a rest action - Character recovers health
 * @param action The rest action to process
 * @param gameState Current game state
 * @returns Updated game state after rest
 */
export function processRestAction(action: PlayerAction, gameState: GameState): GameState {
  const newState = JSON.parse(JSON.stringify(gameState));
  const characterIndex = newState.characters.findIndex(c => c.id === action.characterId);
  
  if (characterIndex === -1) {
    return newState;
  }
  
  const character = newState.characters[characterIndex];
  
  // Process rest action - restore 1 Health point
  const healthBefore = character.health;
  character.health = Math.min(10, character.health + 1);
  
  // Add event to turn log
  newState.currentTurn.events.push({
    type: "character-rest",
    characterId: character.id,
    description: `${character.name} rested and recovered ${character.health - healthBefore} Health`,
    timestamp: new Date().toISOString()
  });
  
  return newState;
}
