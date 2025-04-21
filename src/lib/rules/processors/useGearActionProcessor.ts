
import { PlayerAction, GameState } from "@/types/game-state";
import { HeatManager } from "../heat-manager";

const heatManager = new HeatManager();

/**
 * Process a use-gear action - Character uses a gear item
 * @param action The use-gear action to process
 * @param gameState Current game state
 * @returns Updated game state after gear usage
 */
export function processUseGearAction(action: PlayerAction, gameState: GameState): GameState {
  const newState = JSON.parse(JSON.stringify(gameState));
  const characterIndex = newState.characters.findIndex(c => c.id === action.characterId);
  
  if (characterIndex === -1 || !action.targetId) {
    return newState;
  }
  
  const character = newState.characters[characterIndex];
  const gearItem = character.gear.find(g => g.id === action.targetId);
  
  if (!gearItem) {
    return newState;
  }
  
  // Add event to turn log
  newState.currentTurn.events.push({
    type: "character-use-gear",
    characterId: character.id,
    description: `${character.name} used ${gearItem.name}`,
    timestamp: new Date().toISOString(),
    details: {
      gearItem: gearItem
    }
  });
  
  // Apply gear effects
  // In a complete implementation, we would have a registry of gear effects
  // For now, we'll implement some common effects based on gear type
  
  if (gearItem.type === "healing") {
    // Healing items restore health
    const healthBefore = character.health;
    character.health = Math.min(10, character.health + (gearItem.healAmount || 1));
    
    newState.currentTurn.events.push({
      type: "character-status-change",
      characterId: character.id,
      description: `${character.name} healed ${character.health - healthBefore} health`,
      timestamp: new Date().toISOString()
    });
  } else if (gearItem.type === "utility" && gearItem.reduces_heat) {
    // Some utility items reduce heat
    return heatManager.decreaseHeat(
      newState, 
      gearItem.reduces_heat, 
      `Used ${gearItem.name}`
    );
  } else if (gearItem.type === "combat") {
    // Combat gear might have different effects
    // Implementation depends on the specific game mechanics
  }
  
  // If the gear is consumable, remove it after use
  if (gearItem.consumable) {
    character.gear = character.gear.filter(g => g.id !== gearItem.id);
  }
  
  return newState;
}
