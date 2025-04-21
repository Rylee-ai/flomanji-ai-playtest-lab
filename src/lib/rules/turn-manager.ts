
import { GameState, PlayerAction } from "@/types/game-state";
import { FlomanjiRulesProcessor } from "./core-rules-processor";

/**
 * Manages the turn-based flow of a Flomanji game session
 */
export class TurnManager {
  private rulesProcessor: FlomanjiRulesProcessor;
  
  constructor() {
    this.rulesProcessor = new FlomanjiRulesProcessor();
  }
  
  /**
   * Process a player action and update the game state
   * @param action The action to process
   * @param gameState Current game state
   * @returns Updated game state after action is processed
   */
  public processAction(action: PlayerAction, gameState: GameState): GameState {
    // Process the action using the rules processor
    return this.rulesProcessor.processAction(action, gameState);
  }
  
  /**
   * Check if a character has any actions remaining this turn
   * @param characterId ID of the character to check
   * @param gameState Current game state
   * @returns Boolean indicating if character has actions remaining
   */
  public characterHasActionsRemaining(characterId: string, gameState: GameState): boolean {
    const actionsUsed = gameState.currentTurn.actionsUsed.filter(
      a => a.characterId === characterId
    ).length;
    
    return actionsUsed < 2; // Characters have 2 actions per turn
  }
  
  /**
   * Get the number of actions remaining for a character this turn
   * @param characterId ID of the character to check
   * @param gameState Current game state
   * @returns Number of actions remaining (0-2)
   */
  public getActionsRemaining(characterId: string, gameState: GameState): number {
    const actionsUsed = gameState.currentTurn.actionsUsed.filter(
      a => a.characterId === characterId
    ).length;
    
    return Math.max(0, 2 - actionsUsed);
  }
  
  /**
   * Check if the current turn is complete (all characters have used their actions)
   * @param gameState Current game state
   * @returns Boolean indicating if turn is complete
   */
  public isTurnComplete(gameState: GameState): boolean {
    // A turn is complete when all active characters have used their actions
    const activeCharacters = gameState.characters.filter(c => c.status === "active");
    
    const allActionsUsed = activeCharacters.every(character => {
      const actionsUsed = gameState.currentTurn.actionsUsed.filter(
        a => a.characterId === character.id
      ).length;
      
      return actionsUsed >= 2;
    });
    
    return allActionsUsed;
  }
  
  /**
   * Advance to the next turn
   * @param gameState Current game state
   * @returns Updated game state for the next turn
   */
  public advanceToNextTurn(gameState: GameState): GameState {
    // Use rules processor to advance the turn
    return this.rulesProcessor.advanceTurn(gameState);
  }
  
  /**
   * Get the active character whose turn it currently is
   * @param gameState Current game state
   * @returns The active character or undefined if no characters are active
   */
  public getCurrentActiveCharacter(gameState: GameState): any {
    const activeCharacters = gameState.characters.filter(c => c.status === "active");
    
    if (activeCharacters.length === 0) {
      return undefined;
    }
    
    // In a real implementation, you would track whose turn it is
    // For now, we'll return the first character who hasn't used all actions
    return activeCharacters.find(character => {
      const actionsUsed = gameState.currentTurn.actionsUsed.filter(
        a => a.characterId === character.id
      ).length;
      
      return actionsUsed < 2;
    });
  }
  
  /**
   * Check if the game is over
   * @param gameState Current game state
   * @returns Boolean indicating if the game is over
   */
  public isGameOver(gameState: GameState): boolean {
    return gameState.gameOver;
  }
}
