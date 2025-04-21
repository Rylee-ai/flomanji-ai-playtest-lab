
import { ActionValidationResult, GameState, PlayerAction, CharacterStatus } from "@/types/game-state";

// Action-specific validation methods for FlomanjiRulesProcessor

/**
 * Validates if a move action is valid according to game rules
 * @param action The move action to validate
 * @param character The character performing the action
 * @param gameState Current game state
 * @returns Validation result with success flag and optional message
 */
export function validateMoveAction(
  action: PlayerAction,
  character: any,
  gameState: GameState
): ActionValidationResult {
  if (!action.targetId) {
    return { valid: false, message: "Move action requires a target region" };
  }
  
  // Check if target region exists
  const targetRegion = gameState.regions.find(r => r.id === action.targetId);
  if (!targetRegion) {
    return { valid: false, message: "Target region does not exist" };
  }
  
  // Check if regions are adjacent
  const currentRegion = gameState.regions.find(r => r.id === character.position);
  if (!currentRegion) {
    return { valid: false, message: "Character's current region not found" };
  }
  
  // Check if target region is adjacent to current region
  if (currentRegion.adjacentRegions && 
      !currentRegion.adjacentRegions.includes(action.targetId)) {
    return { valid: false, message: "Target region is not adjacent" };
  }
  
  // Check if region is locked
  if (targetRegion.locked) {
    return { valid: false, message: "Target region is locked" };
  }
  
  return { valid: true };
}

/**
 * Validates if a use-gear action is valid according to game rules
 * @param action The use-gear action to validate
 * @param character The character performing the action
 * @param gameState Current game state
 * @returns Validation result with success flag and optional message
 */
export function validateUseGearAction(
  action: PlayerAction,
  character: any,
  gameState: GameState
): ActionValidationResult {
  if (!action.targetId) {
    return { valid: false, message: "Use gear action requires a gear item ID" };
  }
  
  const hasGear = character.gear.some((g: any) => g.id === action.targetId);
  if (!hasGear) {
    return { valid: false, message: "Character does not have this gear item" };
  }
  
  // Check if gear is usable
  const gearItem = character.gear.find((g: any) => g.id === action.targetId);
  if (gearItem && gearItem.usable === false) {
    return { valid: false, message: "This gear item cannot be used" };
  }
  
  return { valid: true };
}

/**
 * Validates if an interact action is valid according to game rules
 * @param action The interact action to validate
 * @param character The character performing the action
 * @param gameState Current game state
 * @returns Validation result with success flag and optional message
 */
export function validateInteractAction(
  action: PlayerAction,
  character: any,
  gameState: GameState
): ActionValidationResult {
  if (!action.targetId) {
    return { valid: false, message: "Interact action requires a target ID" };
  }
  
  // Check if the target is in the same region
  const region = gameState.regions.find(r => r.id === character.position);
  if (!region) {
    return { valid: false, message: "Character's region not found" };
  }
  
  // Check if the target is in the region's interactables
  if (region.interactables && 
      !region.interactables.some((i: any) => i.id === action.targetId)) {
    return { valid: false, message: "Target is not available for interaction in this region" };
  }
  
  return { valid: true };
}

/**
 * Validates if a team-up action is valid according to game rules
 * @param action The team-up action to validate
 * @param character The character performing the action
 * @param gameState Current game state
 * @returns Validation result with success flag and optional message
 */
export function validateTeamUpAction(
  action: PlayerAction,
  character: any,
  gameState: GameState
): ActionValidationResult {
  if (!action.targetId) {
    return { valid: false, message: "Team-up action requires a target character ID" };
  }
  
  // Validate team-up target exists and is active
  const targetCharacter = gameState.characters.find(c => c.id === action.targetId);
  if (!targetCharacter) {
    return { valid: false, message: "Target character not found" };
  }
  
  if (targetCharacter.status !== "active") {
    return { valid: false, message: "Target character must be active" };
  }
  
  // Check if characters are in the same region
  if (targetCharacter.position !== character.position) {
    return { valid: false, message: "Target character must be in same region" };
  }
  
  // Check if character is teaming up with themselves
  if (targetCharacter.id === character.id) {
    return { valid: false, message: "Character cannot team up with themselves" };
  }
  
  return { valid: true };
}

/**
 * Validates if a rest action is valid according to game rules
 * @param action The rest action to validate
 * @param character The character performing the action
 * @param gameState Current game state
 * @returns Validation result with success flag and optional message
 */
export function validateRestAction(
  action: PlayerAction,
  character: any,
  gameState: GameState
): ActionValidationResult {
  // Check if character is already at max health
  if (character.health >= 10) {
    return { valid: false, message: "Character already at maximum health" };
  }
  
  // Check if the region allows resting
  const region = gameState.regions.find(r => r.id === character.position);
  if (region && region.noRest) {
    return { valid: false, message: "Resting is not allowed in this region" };
  }
  
  return { valid: true };
}

/**
 * Validates if a mission action is valid according to game rules
 * @param action The mission action to validate
 * @param character The character performing the action
 * @param gameState Current game state
 * @returns Validation result with success flag and optional message
 */
export function validateMissionAction(
  action: PlayerAction,
  character: any,
  gameState: GameState
): ActionValidationResult {
  if (!action.targetId) {
    return { valid: false, message: "Mission action requires an objective ID" };
  }
  
  // Check if the objective exists
  const objective = gameState.objectives.find(o => o.id === action.targetId);
  if (!objective) {
    return { valid: false, message: "Objective not found" };
  }
  
  // Check if objective is already completed
  if (gameState.completedObjectives.includes(objective.id)) {
    return { valid: false, message: "Objective already completed" };
  }
  
  // Check if character is in the required region (if applicable)
  if (objective.regionId && character.position !== objective.regionId) {
    return { valid: false, message: "Character must be in the required region to complete this objective" };
  }
  
  // Check if character has required items (if applicable)
  if (objective.requiredItems && objective.requiredItems.length > 0) {
    const missingItems = objective.requiredItems.filter(
      itemId => !character.gear.some((g: any) => g.id === itemId)
    );
    
    if (missingItems.length > 0) {
      return { valid: false, message: "Character is missing required items" };
    }
  }
  
  return { valid: true };
}
