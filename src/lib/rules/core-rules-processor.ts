
import { GameState, PlayerAction } from "@/types/game-state";
import { ActionProcessor } from "./processors/ActionProcessor";
import { TurnProcessor } from "./processors/TurnProcessor";
import { validateAction } from "./validators/ActionValidator";

/**
 * Core Rules Processor for Flomanji
 * Handles central game mechanics including action validation and turn management
 */
export class FlomanjiRulesProcessor {
  /**
   * Validates if a player action is valid according to game rules
   */
  public validateAction(action: PlayerAction, gameState: GameState) {
    return validateAction(action, gameState);
  }

  /**
   * Process a player action and update game state accordingly
   */
  public processAction(action: PlayerAction, gameState: GameState): GameState {
    return ActionProcessor.processAction(action, gameState);
  }

  /**
   * Advances the game to the next turn
   */
  public advanceTurn(gameState: GameState): GameState {
    return TurnProcessor.advanceTurn(gameState);
  }
}
