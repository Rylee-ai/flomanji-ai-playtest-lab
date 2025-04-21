
import { FlomanjiCharacter } from "@/types";
import { ActionType, GameState, PlayerAction, CharacterStatus } from "@/types/game-state";
import { HeatManager } from "./heat-manager";

/**
 * Collection of methods for processing different action types in Flomanji
 */

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
  // In a real implementation, we would determine if this is an NPC, object, etc.
  // and apply the appropriate effects
  
  // For now, this is just a placeholder
  // We would check the region for available interactions
  const region = newState.regions.find(r => r.id === character.position);
  
  // Then process based on the interaction type
  // This could be a conversation with an NPC, examination of an object, etc.
  
  return newState;
}

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
  
  // Apply team-up effects
  // In a real implementation, this might grant bonuses, allow special actions, etc.
  
  // In Flomanji, team-ups often allow characters to share resources
  // or gain temporary bonuses when facing hazards
  
  // For this example, we'll just record the team-up
  // A more complete implementation would track active team-ups and apply effects
  
  return newState;
}

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
