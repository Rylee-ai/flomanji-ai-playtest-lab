
import { FlomanjiCharacter } from "@/types";
import { ActionType, ActionValidationResult, GameState, PlayerAction, CharacterStatus } from "@/types/game-state";

/**
 * Core Rules Processor for Flomanji
 * Handles central game mechanics including action validation, turn management, 
 * and heat/weirdness progression
 */
export class FlomanjiRulesProcessor {
  // Maximum allowed values for core game metrics
  private static readonly MAX_HEAT = 10;
  private static readonly MAX_WEIRDNESS = 10;
  private static readonly MAX_HEALTH = 10;
  
  /**
   * Validates if a player action is valid according to game rules
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
        return this.validateMoveAction(action, character, gameState);
      case "use-gear":
        return this.validateUseGearAction(action, character, gameState);
      case "interact":
        return this.validateInteractAction(action, character, gameState);
      case "team-up":
        return this.validateTeamUpAction(action, character, gameState);
      case "rest":
        return this.validateRestAction(action, character, gameState);
      case "mission":
        return this.validateMissionAction(action, character, gameState);
      default:
        return { valid: false, message: "Unknown action type" };
    }
  }

  /**
   * Process a player action and update game state accordingly
   * @param action The action to process
   * @param gameState Current game state
   * @returns Updated game state
   */
  public processAction(action: PlayerAction, gameState: GameState): GameState {
    // First validate the action
    const validation = this.validateAction(action, gameState);
    if (!validation.valid) {
      console.error(`Invalid action: ${validation.message}`);
      return gameState; // Return unchanged state for invalid actions
    }

    // Create a deep copy of game state to modify
    let newState = this.cloneGameState(gameState);
    
    // Record action as used
    newState.currentTurn.actionsUsed.push({
      characterId: action.characterId,
      actionType: action.type,
      timestamp: new Date().toISOString()
    });

    // Process the action based on its type
    switch (action.type) {
      case "move":
        return this.processMoveAction(action, newState);
      case "use-gear":
        return this.processUseGearAction(action, newState);
      case "interact":
        return this.processInteractAction(action, newState);
      case "team-up":
        return this.processTeamUpAction(action, newState);
      case "rest":
        return this.processRestAction(action, newState);
      case "mission":
        return this.processMissionAction(action, newState);
      default:
        return newState;
    }
  }

  /**
   * Advances the game to the next turn
   * @param gameState Current game state
   * @returns Updated game state with new turn
   */
  public advanceTurn(gameState: GameState): GameState {
    let newState = this.cloneGameState(gameState);
    
    // Complete the current turn
    newState.currentTurn.completed = true;
    newState.turns.push(newState.currentTurn);
    
    // Apply end-of-turn effects
    newState = this.applyEndOfTurnEffects(newState);
    
    // Create a new turn
    newState.currentTurn = {
      turnNumber: newState.turns.length + 1,
      actionsUsed: [],
      events: [],
      completed: false,
      timestamp: new Date().toISOString()
    };
    
    return newState;
  }

  /**
   * Applies heat level effects to the game state
   * @param gameState Current game state
   * @returns Updated game state with heat effects applied
   */
  public applyHeatEffects(gameState: GameState): GameState {
    const newState = this.cloneGameState(gameState);
    
    // Apply effects based on current heat level
    if (newState.heat >= 9) {
      // At Heat 9+, all players gain +1 Weirdness each round
      newState.characters = newState.characters.map(character => {
        if (character.status === "active") {
          const newWeirdness = Math.min(
            FlomanjiRulesProcessor.MAX_WEIRDNESS, 
            character.weirdness + 1
          );
          return {
            ...character,
            weirdness: newWeirdness,
            // If weirdness hits maximum, character transforms
            status: newWeirdness >= FlomanjiRulesProcessor.MAX_WEIRDNESS 
              ? "transformed" as CharacterStatus 
              : character.status
          };
        }
        return character;
      });
    }
    
    // Check for heat-based mission failure
    if (newState.heat >= 10) {
      newState.gameOver = true;
      newState.missionOutcome = "failure";
      newState.gameOverReason = "Heat level reached maximum";
    }
    
    return newState;
  }

  /**
   * Helper method to create a deep copy of the game state
   * @param state The state to clone
   * @returns A deep copy of the game state
   */
  private cloneGameState(state: GameState): GameState {
    return JSON.parse(JSON.stringify(state));
  }

  // Individual action validation methods
  private validateMoveAction(action: PlayerAction, character: any, gameState: GameState): ActionValidationResult {
    // TODO: Implement move validation logic
    return { valid: true };
  }
  
  private validateUseGearAction(action: PlayerAction, character: any, gameState: GameState): ActionValidationResult {
    // Check if character has the gear item
    const hasGear = character.gear.some(g => g.id === action.targetId);
    if (!hasGear) {
      return { valid: false, message: "Character does not have this gear item" };
    }
    return { valid: true };
  }
  
  private validateInteractAction(action: PlayerAction, character: any, gameState: GameState): ActionValidationResult {
    // TODO: Implement interact validation logic
    return { valid: true };
  }
  
  private validateTeamUpAction(action: PlayerAction, character: any, gameState: GameState): ActionValidationResult {
    // Validate team-up target exists and is in same region
    const targetCharacter = gameState.characters.find(c => c.id === action.targetId);
    if (!targetCharacter) {
      return { valid: false, message: "Target character not found" };
    }
    
    if (targetCharacter.position !== character.position) {
      return { valid: false, message: "Target character must be in same region" };
    }
    
    return { valid: true };
  }
  
  private validateRestAction(action: PlayerAction, character: any, gameState: GameState): ActionValidationResult {
    // Rest is always valid
    return { valid: true };
  }
  
  private validateMissionAction(action: PlayerAction, character: any, gameState: GameState): ActionValidationResult {
    // TODO: Implement mission action validation logic
    return { valid: true };
  }

  // Individual action processing methods
  private processMoveAction(action: PlayerAction, gameState: GameState): GameState {
    // TODO: Implement move processing
    return gameState;
  }
  
  private processUseGearAction(action: PlayerAction, gameState: GameState): GameState {
    // TODO: Implement gear usage
    return gameState;
  }
  
  private processInteractAction(action: PlayerAction, gameState: GameState): GameState {
    // TODO: Implement interaction processing
    return gameState;
  }
  
  private processTeamUpAction(action: PlayerAction, gameState: GameState): GameState {
    // TODO: Implement team-up processing
    return gameState;
  }
  
  private processRestAction(action: PlayerAction, gameState: GameState): GameState {
    // Process rest action - restore 1 Health point
    const characterIndex = gameState.characters.findIndex(c => c.id === action.characterId);
    if (characterIndex !== -1) {
      const character = gameState.characters[characterIndex];
      gameState.characters[characterIndex] = {
        ...character,
        health: Math.min(FlomanjiRulesProcessor.MAX_HEALTH, character.health + 1)
      };
      
      // Add event to turn log
      gameState.currentTurn.events.push({
        type: "character-rest",
        characterId: character.id,
        description: `${character.name} rested and recovered 1 Health`,
        timestamp: new Date().toISOString()
      });
    }
    
    return gameState;
  }
  
  private processMissionAction(action: PlayerAction, gameState: GameState): GameState {
    // TODO: Implement mission action processing
    return gameState;
  }

  /**
   * Apply end of turn effects such as region effects, heat increases, etc.
   * @param gameState Current game state
   * @returns Updated game state with end-of-turn effects applied
   */
  private applyEndOfTurnEffects(gameState: GameState): GameState {
    let updatedState = this.cloneGameState(gameState);
    
    // Apply region effects
    // TODO: Implement region-specific effects
    
    // Process any automatic heat increases
    if (updatedState.heatIncreasePerTurn > 0) {
      updatedState.heat = Math.min(
        FlomanjiRulesProcessor.MAX_HEAT,
        updatedState.heat + updatedState.heatIncreasePerTurn
      );
      
      updatedState.currentTurn.events.push({
        type: "heat-increase",
        description: `Heat increased to ${updatedState.heat}`,
        timestamp: new Date().toISOString()
      });
    }
    
    // Apply heat effects
    updatedState = this.applyHeatEffects(updatedState);
    
    // Check win/loss conditions
    updatedState = this.checkWinLossConditions(updatedState);
    
    return updatedState;
  }

  /**
   * Check if the game has reached a win or loss condition
   * @param gameState Current game state
   * @returns Updated game state with game over flags if applicable
   */
  private checkWinLossConditions(gameState: GameState): GameState {
    const newState = this.cloneGameState(gameState);
    
    // Check if all characters are disabled/transformed
    const activeCharacters = newState.characters.filter(c => c.status === "active");
    if (activeCharacters.length === 0) {
      newState.gameOver = true;
      newState.missionOutcome = "failure";
      newState.gameOverReason = "All characters incapacitated";
      return newState;
    }
    
    // Check if maximum rounds have been reached
    if (newState.currentTurn.turnNumber > newState.maxRounds) {
      newState.gameOver = true;
      newState.missionOutcome = "failure";
      newState.gameOverReason = "Maximum rounds reached";
      return newState;
    }
    
    // Check mission objectives
    const allRequiredCompleted = newState.objectives
      .filter(obj => obj.required)
      .every(obj => newState.completedObjectives.includes(obj.id));
      
    const anyOptionalCompleted = newState.objectives
      .filter(obj => !obj.required)
      .some(obj => newState.completedObjectives.includes(obj.id));
    
    // Full success: all required objectives completed
    if (allRequiredCompleted) {
      if (newState.missionType === "escape" && 
          activeCharacters.some(c => c.position === newState.extractionRegion)) {
        newState.gameOver = true;
        newState.missionOutcome = "success";
        newState.gameOverReason = "Objectives completed and reached extraction";
      } else if (newState.missionType !== "escape") {
        newState.gameOver = true;
        newState.missionOutcome = "success";
        newState.gameOverReason = "All required objectives completed";
      }
    } 
    // Partial success: some optional objectives completed
    else if (anyOptionalCompleted) {
      if (newState.missionType === "escape" && 
          activeCharacters.some(c => c.position === newState.extractionRegion)) {
        newState.gameOver = true;
        newState.missionOutcome = "partial";
        newState.gameOverReason = "Reached extraction with partial objectives";
      }
    }
    
    return newState;
  }
}
