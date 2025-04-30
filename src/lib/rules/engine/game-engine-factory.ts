
import { FlomanjiGameEngine } from "./game-engine";

/**
 * Factory for creating and managing game engine instances
 * This supports dependency injection and singleton pattern
 */
export class GameEngineFactory {
  private static instance: FlomanjiGameEngine;
  
  /**
   * Get the singleton instance of the game engine
   */
  public static getEngine(): FlomanjiGameEngine {
    if (!GameEngineFactory.instance) {
      GameEngineFactory.instance = new FlomanjiGameEngine();
    }
    return GameEngineFactory.instance;
  }
  
  /**
   * Create a new game engine instance (for testing or specialized use)
   */
  public static createEngine(): FlomanjiGameEngine {
    return new FlomanjiGameEngine();
  }
}

// Export a singleton instance for easy import
export const gameEngine = GameEngineFactory.getEngine();
