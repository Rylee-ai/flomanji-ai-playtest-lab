
import { PlayerAction, GameState } from "@/types/game-state";
import { HeatManager } from "../heat-manager";

const heatManager = new HeatManager();

/**
 * Process a move action - Character moves to a new region
 * @param action The move action to process
 * @param gameState Current game state
 * @returns Updated game state after move
 */
export function processMoveAction(action: PlayerAction, gameState: GameState): GameState {
  const newState = JSON.parse(JSON.stringify(gameState));
  const characterIndex = newState.characters.findIndex(c => c.id === action.characterId);
  
  if (characterIndex === -1 || !action.targetId) {
    return newState;
  }
  
  const character = newState.characters[characterIndex];
  const oldRegionId = character.position;
  const newRegionId = action.targetId;
  
  // Update character position
  character.position = newRegionId;
  
  // Add event to turn log
  newState.currentTurn.events.push({
    type: "character-move",
    characterId: character.id,
    regionId: newRegionId,
    description: `${character.name} moved to a new region`,
    timestamp: new Date().toISOString(),
    details: {
      fromRegion: oldRegionId,
      toRegion: newRegionId
    }
  });
  
  // Check if region has any special effects
  const region = newState.regions.find(r => r.id === newRegionId);
  
  // If the region has heat effects, apply them
  if (region && region.heatEffect) {
    return heatManager.increaseHeat(
      newState, 
      region.heatEffect, 
      `Entered high-risk region (${region.name})`
    );
  }
  
  return newState;
}
