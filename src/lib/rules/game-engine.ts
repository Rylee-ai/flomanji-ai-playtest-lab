
import { FlomanjiCharacter } from "@/types";
import { PlayerAction, GameState, Objective } from "@/types/game-state";
import { createNewGame, findMissionById, initializeRegions } from "./game-initializer";
import { processAction, isActionValid, getActionValidation } from "./game-actions";
import { advanceTurn } from "./game-turns";
import { increaseHeat, decreaseHeat } from "./game-heat";
import { completeObjective } from "./game-objectives";
import { cloneGameState } from "./game-utils";

export class FlomanjiGameEngine {
  /**
   * Create a new game state for a mission
   */
  public createNewGame(
    missionId: string,
    missionType: string,
    characters: FlomanjiCharacter[],
    startingHeat: number,
    objectives: Objective[],
    maxRounds: number,
    extractionRegion: string
  ): GameState {
    return createNewGame(missionId, missionType, characters, startingHeat, objectives, maxRounds, extractionRegion);
  }

  /**
   * Find mission data by ID
   */
  public findMissionById(missionId: string) {
    return findMissionById(missionId);
  }

  /**
   * Initialize regions based on mission data
   */
  public initializeRegions(missionData: any, missionType: string) {
    return initializeRegions(missionData, missionType);
  }

  /**
   * Process a player action
   */
  public processAction(action: PlayerAction, gameState: GameState): GameState {
    return processAction(action, gameState);
  }

  /**
   * Advance to the next turn
   */
  public advanceTurn(gameState: GameState): GameState {
    return advanceTurn(gameState);
  }

  /**
   * Increase heat level
   */
  public increaseHeat(gameState: GameState, amount: number = 1, reason?: string): GameState {
    return increaseHeat(gameState, amount, reason);
  }

  /**
   * Decrease heat level
   */
  public decreaseHeat(gameState: GameState, amount: number = 1, reason?: string): GameState {
    return decreaseHeat(gameState, amount, reason);
  }

  /**
   * Check if a player action is valid
   */
  public isActionValid(action: PlayerAction, gameState: GameState): boolean {
    return isActionValid(action, gameState);
  }

  /**
   * Get validation details for an action (for UI feedback)
   */
  public getActionValidation(action: PlayerAction, gameState: GameState): { valid: boolean, message?: string } {
    return getActionValidation(action, gameState);
  }

  /**
   * Check if the game is over
   */
  public isGameOver(gameState: GameState): boolean {
    return gameState.gameOver;
  }

  /**
   * Get the game result if game is over
   */
  public getGameResult(gameState: GameState): { outcome: string, reason: string } | null {
    if (!gameState.gameOver) {
      return null;
    }

    return {
      outcome: gameState.missionOutcome || "unknown",
      reason: gameState.gameOverReason || "Game ended for unknown reason"
    };
  }

  /**
   * Complete an objective
   */
  public completeObjective(gameState: GameState, objectiveId: string, characterId?: string): GameState {
    return completeObjective(gameState, objectiveId, characterId);
  }

  /**
   * Helper method to create a deep copy of the game state
   */
  private cloneGameState(state: GameState): GameState {
    return cloneGameState(state);
  }
}

// Singleton export (for existing imports elsewhere)
export const gameEngine = new FlomanjiGameEngine();
