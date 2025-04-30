
import { FlomanjiCharacter } from "@/types";
import { GameState, PlayerAction, ActionValidationResult, Objective } from "@/types/game-state";

/**
 * Interface for region initialization services
 */
export interface RegionService {
  initializeRegions(missionData: any, missionType: string): any[];
}

/**
 * Interface for objective management services
 */
export interface ObjectiveService {
  completeObjective(gameState: GameState, objectiveId: string, characterId?: string): GameState;
}

/**
 * Interface for action handling services
 */
export interface ActionService {
  processAction(action: PlayerAction, gameState: GameState): GameState;
  isActionValid(action: PlayerAction, gameState: GameState): boolean;
  getActionValidation(action: PlayerAction, gameState: GameState): ActionValidationResult;
}

/**
 * Interface for game state management services
 */
export interface StateService {
  createNewGame(
    missionId: string,
    missionType: string,
    characters: FlomanjiCharacter[],
    startingHeat: number,
    objectives: Objective[],
    maxRounds: number,
    extractionRegion: string
  ): GameState;
  advanceTurn(gameState: GameState): GameState;
  increaseHeat(gameState: GameState, amount: number, reason?: string): GameState;
  decreaseHeat(gameState: GameState, amount: number, reason?: string): GameState;
  isGameOver(gameState: GameState): boolean;
  getGameResult(gameState: GameState): { outcome: string, reason: string } | null;
  cloneGameState(state: GameState): GameState;
}
