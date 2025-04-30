
import { FlomanjiCharacter } from "@/types";
import { GameState, PlayerAction, ActionValidationResult, Objective } from "@/types/game-state";
import { StateService } from "./state-service";
import { ActionService } from "./action-service";
import { RegionService } from "./region-service";
import { ObjectiveService } from "./objective-service";

/**
 * Central game engine that coordinates all game rule mechanics
 * This class delegates specific responsibilities to specialized services
 */
export class FlomanjiGameEngine {
  private stateService: StateService;
  private actionService: ActionService;
  private regionService: RegionService;
  private objectiveService: ObjectiveService;
  
  constructor() {
    this.stateService = new StateService();
    this.actionService = new ActionService();
    this.regionService = new RegionService();
    this.objectiveService = new ObjectiveService();
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
    // Find detailed mission data if available
    const missionData = this.stateService.findMissionById(missionId);
    
    // Create the base game state
    const gameState = this.stateService.createNewGame(
      missionId,
      missionType,
      characters,
      startingHeat,
      objectives,
      maxRounds,
      extractionRegion
    );
    
    // Initialize regions based on mission data if available
    const regions = this.regionService.initializeRegions(missionData, missionType);
    
    // Add the regions to the game state
    gameState.regions = regions;
    
    return gameState;
  }
  
  /**
   * Process a player action
   */
  public processAction(action: PlayerAction, gameState: GameState): GameState {
    return this.actionService.processAction(action, gameState);
  }
  
  /**
   * Advance to the next turn
   */
  public advanceTurn(gameState: GameState): GameState {
    return this.stateService.advanceTurn(gameState);
  }
  
  /**
   * Increase heat level
   */
  public increaseHeat(gameState: GameState, amount: number = 1, reason?: string): GameState {
    return this.stateService.increaseHeat(gameState, amount, reason);
  }
  
  /**
   * Decrease heat level
   */
  public decreaseHeat(gameState: GameState, amount: number = 1, reason?: string): GameState {
    return this.stateService.decreaseHeat(gameState, amount, reason);
  }
  
  /**
   * Check if a player action is valid
   */
  public isActionValid(action: PlayerAction, gameState: GameState): boolean {
    return this.actionService.isActionValid(action, gameState);
  }
  
  /**
   * Get validation details for an action (for UI feedback)
   */
  public getActionValidation(action: PlayerAction, gameState: GameState): ActionValidationResult {
    return this.actionService.getActionValidation(action, gameState);
  }
  
  /**
   * Check if the game is over
   */
  public isGameOver(gameState: GameState): boolean {
    return this.stateService.isGameOver(gameState);
  }
  
  /**
   * Get the game result if game is over
   */
  public getGameResult(gameState: GameState): { outcome: string, reason: string } | null {
    return this.stateService.getGameResult(gameState);
  }
  
  /**
   * Complete an objective
   */
  public completeObjective(gameState: GameState, objectiveId: string, characterId?: string): GameState {
    return this.objectiveService.completeObjective(gameState, objectiveId, characterId);
  }
}
