
import { ActionType, ActionValidationResult, GameState, PlayerAction } from "@/types/game-state";

/**
 * Validates player actions against game rules
 */
export class ActionValidator {
  /**
   * Validate a player action against game rules
   * @param action The action to validate
   * @param gameState Current game state
   * @returns Validation result with success flag and optional message
   */
  public validateAction(action: PlayerAction, gameState: GameState): ActionValidationResult {
    // Verify character exists and is active
    const character = gameState.characters.find(c => c.id === action.characterId);
    
    if (!character) {
      return { valid: false, message: "Character not found" };
    }
    
    if (character.status !== "active") {
      return { 
        valid: false, 
        message: `Character cannot act: ${character.status}` 
      };
    }

    // Check if player has actions remaining this turn
    const actionsUsed = gameState.currentTurn.actionsUsed.filter(
      a => a.characterId === character.id
    ).length;
    
    if (actionsUsed >= 2) {
      return { valid: false, message: "No actions remaining this turn" };
    }

    // Validate action by type
    switch (action.type) {
      case "move":
        return this.validateMove(action, character, gameState);
        
      case "use-gear":
        return this.validateUseGear(action, character, gameState);
        
      case "interact":
        return this.validateInteract(action, character, gameState);
        
      case "team-up":
        return this.validateTeamUp(action, character, gameState);
        
      case "rest":
        return this.validateRest(action, character, gameState);
        
      case "mission":
        return this.validateMission(action, character, gameState);
        
      default:
        return { valid: false, message: "Unknown action type" };
    }
  }
  
  /**
   * Validate a move action
   */
  private validateMove(action: PlayerAction, character: any, gameState: GameState): ActionValidationResult {
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
    
    // In a real implementation, check region adjacency here
    // For now, we'll assume all moves are valid for simplicity
    
    return { valid: true };
  }
  
  /**
   * Validate a use-gear action
   */
  private validateUseGear(action: PlayerAction, character: any, gameState: GameState): ActionValidationResult {
    if (!action.targetId) {
      return { valid: false, message: "Use gear action requires a gear item ID" };
    }
    
    // Check if character has the gear item
    const hasGear = character.gear.some(g => g.id === action.targetId);
    if (!hasGear) {
      return { valid: false, message: "Character does not have this gear item" };
    }
    
    return { valid: true };
  }
  
  /**
   * Validate an interact action
   */
  private validateInteract(action: PlayerAction, character: any, gameState: GameState): ActionValidationResult {
    if (!action.targetId) {
      return { valid: false, message: "Interact action requires a target ID" };
    }
    
    // In a real implementation, check if the target is in the same region
    // and is interactable (NPC, object, etc.)
    
    return { valid: true };
  }
  
  /**
   * Validate a team-up action
   */
  private validateTeamUp(action: PlayerAction, character: any, gameState: GameState): ActionValidationResult {
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
    
    return { valid: true };
  }
  
  /**
   * Validate a rest action
   */
  private validateRest(action: PlayerAction, character: any, gameState: GameState): ActionValidationResult {
    // Rest is always valid if the character has actions left
    // Additional restrictions could be added here (e.g., can't rest in certain regions)
    return { valid: true };
  }
  
  /**
   * Validate a mission action
   */
  private validateMission(action: PlayerAction, character: any, gameState: GameState): ActionValidationResult {
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
    
    // In a real implementation, check other objective-specific requirements
    // such as character being in a specific region, having certain items, etc.
    
    return { valid: true };
  }
}
