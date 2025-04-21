
import { GameState, GameEvent } from "@/types/game-state";

/**
 * Manages the Heat mechanics in Flomanji
 */
export class HeatManager {
  private static readonly MAX_HEAT = 10;
  
  /**
   * Increase the heat level by a specified amount
   * @param gameState Current game state
   * @param amount Amount to increase heat (default: 1)
   * @param reason Optional reason for the heat increase
   * @returns Updated game state with increased heat
   */
  public increaseHeat(gameState: GameState, amount: number = 1, reason?: string): GameState {
    const newState = this.cloneGameState(gameState);
    
    // Calculate new heat level, capped at maximum
    const newHeat = Math.min(
      HeatManager.MAX_HEAT,
      newState.heat + amount
    );
    
    // Only record an event if heat actually changes
    if (newHeat !== newState.heat) {
      const description = reason
        ? `Heat increased to ${newHeat} (${reason})`
        : `Heat increased to ${newHeat}`;
        
      const event: GameEvent = {
        type: "heat-increase",
        description,
        timestamp: new Date().toISOString(),
        details: {
          previousLevel: newState.heat,
          newLevel: newHeat,
          amount
        }
      };
      
      newState.currentTurn.events.push(event);
      newState.heat = newHeat;
      
      // Check for game over at max heat
      if (newState.heat >= HeatManager.MAX_HEAT) {
        newState.gameOver = true;
        newState.missionOutcome = "failure";
        newState.gameOverReason = "Heat level reached maximum";
      }
    }
    
    return newState;
  }
  
  /**
   * Decrease the heat level by a specified amount
   * @param gameState Current game state
   * @param amount Amount to decrease heat (default: 1)
   * @param reason Optional reason for the heat decrease
   * @returns Updated game state with decreased heat
   */
  public decreaseHeat(gameState: GameState, amount: number = 1, reason?: string): GameState {
    const newState = this.cloneGameState(gameState);
    
    // Calculate new heat level, minimum 0
    const newHeat = Math.max(0, newState.heat - amount);
    
    // Only record an event if heat actually changes
    if (newHeat !== newState.heat) {
      const description = reason
        ? `Heat decreased to ${newHeat} (${reason})`
        : `Heat decreased to ${newHeat}`;
        
      const event: GameEvent = {
        type: "heat-decrease",
        description,
        timestamp: new Date().toISOString(),
        details: {
          previousLevel: newState.heat,
          newLevel: newHeat,
          amount
        }
      };
      
      newState.currentTurn.events.push(event);
      newState.heat = newHeat;
    }
    
    return newState;
  }
  
  /**
   * Set automatic heat increase per turn
   * @param gameState Current game state
   * @param amount Amount to increase heat each turn (0 to disable)
   * @returns Updated game state with configured heat increase
   */
  public setHeatIncreasePerTurn(gameState: GameState, amount: number): GameState {
    const newState = this.cloneGameState(gameState);
    newState.heatIncreasePerTurn = amount;
    return newState;
  }
  
  /**
   * Get the current heat danger level description
   * @param heat Current heat level
   * @returns String description of the current heat danger
   */
  public getHeatLevelDescription(heat: number): string {
    if (heat <= 2) {
      return "Low - The situation is under control";
    } else if (heat <= 5) {
      return "Moderate - Tension is building";
    } else if (heat <= 8) {
      return "High - Danger is imminent";
    } else {
      return "Critical - The situation is about to explode";
    }
  }
  
  /**
   * Helper method to create a deep copy of the game state
   * @param state The state to clone
   * @returns A deep copy of the game state
   */
  private cloneGameState(state: GameState): GameState {
    return JSON.parse(JSON.stringify(state));
  }
}
