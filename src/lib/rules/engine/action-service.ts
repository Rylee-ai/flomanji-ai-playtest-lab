
import { FlomanjiRulesProcessor } from "../core-rules-processor";
import { PlayerAction, GameState, ActionValidationResult } from "@/types/game-state";

/**
 * Handles action validation and processing
 */
export class ActionService {
  private rulesProcessor: FlomanjiRulesProcessor;
  
  constructor() {
    this.rulesProcessor = new FlomanjiRulesProcessor();
  }

  /**
   * Process a player action
   */
  public processAction(action: PlayerAction, gameState: GameState): GameState {
    // Validate action first
    const validation = this.getActionValidation(action, gameState);
    if (!validation.valid) {
      console.error(`Invalid action: ${validation.message}`);
      return gameState; // Return unchanged state for invalid actions
    }
    
    // Process the action
    return this.rulesProcessor.processAction(action, gameState);
  }

  /**
   * Check if a player action is valid
   */
  public isActionValid(action: PlayerAction, gameState: GameState): boolean {
    return this.rulesProcessor.validateAction(action, gameState).valid;
  }

  /**
   * Get validation details for an action (for UI feedback)
   */
  public getActionValidation(action: PlayerAction, gameState: GameState): ActionValidationResult {
    return this.rulesProcessor.validateAction(action, gameState);
  }
}
