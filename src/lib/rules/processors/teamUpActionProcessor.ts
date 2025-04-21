
import { PlayerAction, GameState } from "@/types/game-state";

/**
 * Process a team-up action - Characters work together
 * @param action The team-up action to process
 * @param gameState Current game state
 * @returns Updated game state after team-up
 */
export function processTeamUpAction(action: PlayerAction, gameState: GameState): GameState {
  const newState = JSON.parse(JSON.stringify(gameState));
  const characterIndex = newState.characters.findIndex(c => c.id === action.characterId);
  
  if (characterIndex === -1 || !action.targetId) {
    return newState;
  }
  
  const character = newState.characters[characterIndex];
  const targetCharacter = newState.characters.find(c => c.id === action.targetId);
  
  if (!targetCharacter) {
    return newState;
  }
  
  // Add event to turn log
  newState.currentTurn.events.push({
    type: "character-team-up",
    characterId: character.id,
    description: `${character.name} teamed up with ${targetCharacter.name}`,
    timestamp: new Date().toISOString(),
    details: {
      targetCharacterId: targetCharacter.id
    }
  });
  
  // Apply team-up effects (track active team-ups, grant bonuses, etc.)
  // For now, this just records the event
  return newState;
}
