
import { GameState } from "@/types/game-state";
import { applyHeatEffects } from "./HeatProcessor";
import { checkWinLossConditions } from "../win-loss-conditions";

export class TurnProcessor {
  /**
   * Advances the game to the next turn
   * @param gameState Current game state
   * @returns Updated game state with new turn
   */
  public static advanceTurn(gameState: GameState): GameState {
    let newState = JSON.parse(JSON.stringify(gameState));
    
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

  private static applyEndOfTurnEffects(gameState: GameState): GameState {
    let updatedState = JSON.parse(JSON.stringify(gameState));
    
    // Process any automatic heat increases
    if (updatedState.heatIncreasePerTurn > 0) {
      updatedState.heat = Math.min(
        10, // MAX_HEAT
        updatedState.heat + updatedState.heatIncreasePerTurn
      );
      
      updatedState.currentTurn.events.push({
        type: "heat-increase",
        description: `Heat increased to ${updatedState.heat}`,
        timestamp: new Date().toISOString()
      });
    }
    
    // Apply heat effects
    updatedState = applyHeatEffects(updatedState);
    
    // Check win/loss conditions
    updatedState = checkWinLossConditions(updatedState);
    
    return updatedState;
  }
}
