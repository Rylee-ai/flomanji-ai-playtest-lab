
import { FlomanjiCharacter } from "@/types";
import { GameState, Objective } from "@/types/game-state";
import { initializeGameState } from "@/types/game-state";
import { TurnManager } from "../turn-manager";
import { HeatManager } from "../heat-manager";
import { MissionSheet } from "@/types/cards/mission";
import { MISSION_CARDS } from "@/lib/cards/mission-cards";

/**
 * Manages core game state operations
 */
export class StateService {
  private turnManager: TurnManager;
  private heatManager: HeatManager;
  
  constructor() {
    this.turnManager = new TurnManager();
    this.heatManager = new HeatManager();
  }

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
    // Create the base game state
    const gameState = initializeGameState(
      missionId,
      missionType,
      characters,
      startingHeat,
      objectives,
      maxRounds,
      extractionRegion
    );
    
    // Set heat increase per turn if mission type is "escape"
    if (missionType === "escape") {
      gameState.heatIncreasePerTurn = 1;
    }
    
    return gameState;
  }

  /**
   * Find mission data by ID from the mission cards collection
   */
  public findMissionById(missionId: string): MissionSheet | null {
    return MISSION_CARDS.find(m => m.id === missionId) || null;
  }

  /**
   * Advance to the next turn
   */
  public advanceTurn(gameState: GameState): GameState {
    return this.turnManager.advanceToNextTurn(gameState);
  }

  /**
   * Increase heat level
   */
  public increaseHeat(gameState: GameState, amount: number = 1, reason?: string): GameState {
    return this.heatManager.increaseHeat(gameState, amount, reason);
  }

  /**
   * Decrease heat level
   */
  public decreaseHeat(gameState: GameState, amount: number = 1, reason?: string): GameState {
    return this.heatManager.decreaseHeat(gameState, amount, reason);
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
   * Helper method to create a deep copy of the game state
   */
  public cloneGameState(state: GameState): GameState {
    return JSON.parse(JSON.stringify(state));
  }
}
