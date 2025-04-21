import { FlomanjiCharacter } from "@/types";
import { GameState, PlayerAction, initializeGameState, Objective } from "@/types/game-state";
import { FlomanjiRulesProcessor } from "./core-rules-processor";
import { TurnManager } from "./turn-manager";
import { HeatManager } from "./heat-manager";
import { ActionValidator } from "./action-validator";
import { MissionSheet } from "@/types/cards/mission";
import { MISSION_CARDS } from "@/lib/cards/mission-cards";

/**
 * Central game engine that coordinates all game rule mechanics
 */
export class FlomanjiGameEngine {
  private rulesProcessor: FlomanjiRulesProcessor;
  private turnManager: TurnManager;
  private heatManager: HeatManager;
  private actionValidator: ActionValidator;
  
  constructor() {
    this.rulesProcessor = new FlomanjiRulesProcessor();
    this.turnManager = new TurnManager();
    this.heatManager = new HeatManager();
    this.actionValidator = new ActionValidator();
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
    const missionData = this.findMissionById(missionId);
    
    // Initialize regions based on mission data if available
    const regions = this.initializeRegions(missionData, missionType);
    
    // Create the game state
    const gameState = initializeGameState(
      missionId,
      missionType,
      characters,
      startingHeat,
      objectives,
      maxRounds,
      extractionRegion
    );
    
    // Add the regions to the game state
    gameState.regions = regions;
    
    // Set heat increase per turn if mission type is "escape"
    if (missionType === "escape") {
      gameState.heatIncreasePerTurn = 1;
    }
    
    return gameState;
  }
  
  /**
   * Find mission data by ID
   */
  private findMissionById(missionId: string): MissionSheet | null {
    return MISSION_CARDS.find(m => m.id === missionId) || null;
  }
  
  /**
   * Initialize regions based on mission data
   */
  private initializeRegions(missionData: MissionSheet | null, missionType: string): any[] {
    // Default regions if no mission data is available
    const defaultRegions = [
      { id: "start", name: "Starting Area", connections: ["path1"] },
      { id: "path1", name: "Path 1", connections: ["start", "path2"] },
      { id: "path2", name: "Path 2", connections: ["path1", "exit"] },
      { id: "exit", name: "Exit", connections: ["path2"] }
    ];
    
    // If no mission data is available, return default regions
    if (!missionData) {
      return defaultRegions;
    }
    
    // TODO: Parse mission.mapLayout to create a proper region structure
    // For now, return default regions with mission-specific names
    const regions = [
      { id: "start", name: "Starting Area", connections: ["region1"] },
      { id: "region1", name: `${missionData.name} Area 1`, connections: ["start", "region2"] },
      { id: "region2", name: `${missionData.name} Area 2`, connections: ["region1", "region3"] },
      { id: "region3", name: `${missionData.name} Area 3`, connections: ["region2", missionData.extractionRegion] },
      { id: missionData.extractionRegion, name: "Extraction Point", connections: ["region3"] }
    ];
    
    return regions;
  }
  
  /**
   * Process a player action
   */
  public processAction(action: PlayerAction, gameState: GameState): GameState {
    // Validate action first
    const validation = this.actionValidator.validateAction(action, gameState);
    if (!validation.valid) {
      console.error(`Invalid action: ${validation.message}`);
      return gameState; // Return unchanged state for invalid actions
    }
    
    // Process the action
    return this.rulesProcessor.processAction(action, gameState);
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
   * Check if a player action is valid
   */
  public isActionValid(action: PlayerAction, gameState: GameState): boolean {
    return this.actionValidator.validateAction(action, gameState).valid;
  }
  
  /**
   * Get validation details for an action (for UI feedback)
   */
  public getActionValidation(action: PlayerAction, gameState: GameState): { valid: boolean, message?: string } {
    return this.actionValidator.validateAction(action, gameState);
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
    const newState = this.cloneGameState(gameState);
    
    // Check if objective exists and isn't already completed
    const objective = newState.objectives.find(o => o.id === objectiveId);
    if (!objective || newState.completedObjectives.includes(objectiveId)) {
      return newState;
    }
    
    // Add to completed objectives
    newState.completedObjectives.push(objectiveId);
    
    // Add event to turn log
    newState.currentTurn.events.push({
      type: "objective-completed",
      description: `Objective completed: ${objective.description}`,
      timestamp: new Date().toISOString(),
      characterId,
      objectiveId
    });
    
    // Check win conditions after completing objective
    const allRequiredCompleted = newState.objectives
      .filter(obj => obj.required)
      .every(obj => newState.completedObjectives.includes(obj.id));
      
    if (allRequiredCompleted && newState.missionType !== "escape") {
      newState.gameOver = true;
      newState.missionOutcome = "success";
      newState.gameOverReason = "All required objectives completed";
    }
    
    return newState;
  }
  
  /**
   * Helper method to create a deep copy of the game state
   */
  private cloneGameState(state: GameState): GameState {
    return JSON.parse(JSON.stringify(state));
  }
}

// Create a singleton instance for easy import
export const gameEngine = new FlomanjiGameEngine();
