
import { PlayerAction, GameState } from "@/types/game-state";

/**
 * Process an interact action - Character interacts with an NPC or object
 * @param action The interact action to process
 * @param gameState Current game state
 * @returns Updated game state after interaction
 */
export function processInteractAction(action: PlayerAction, gameState: GameState): GameState {
  const newState = JSON.parse(JSON.stringify(gameState));
  const characterIndex = newState.characters.findIndex(c => c.id === action.characterId);
  
  if (characterIndex === -1 || !action.targetId) {
    return newState;
  }
  
  const character = newState.characters[characterIndex];
  
  // Add event to turn log
  newState.currentTurn.events.push({
    type: "character-interact",
    characterId: character.id,
    description: `${character.name} interacted with an object or NPC`,
    timestamp: new Date().toISOString(),
    details: {
      targetId: action.targetId,
      parameters: action.parameters
    }
  });
  
  // Process interaction based on target type
  // In a real implementation, we would determine if this is an NPC, object, etc., and apply the appropriate effects
  
  // For now, just a placeholder
  // We would check the region for available interactions
  // Then process based on the interaction type
  return newState;
}
