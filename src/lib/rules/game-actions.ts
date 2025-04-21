
// Handles player action processing and validation
import { PlayerAction, GameState } from "@/types/game-state";
import { FlomanjiRulesProcessor } from "./core-rules-processor";
import { ActionValidator } from "./action-validator";

const rulesProcessor = new FlomanjiRulesProcessor();
const actionValidator = new ActionValidator();

export function processAction(action: PlayerAction, gameState: GameState): GameState {
  // Validate first
  const validation = actionValidator.validateAction(action, gameState);
  if (!validation.valid) {
    console.error(`Invalid action: ${validation.message}`);
    return gameState;
  }
  return rulesProcessor.processAction(action, gameState);
}

export function isActionValid(action: PlayerAction, gameState: GameState): boolean {
  return actionValidator.validateAction(action, gameState).valid;
}

export function getActionValidation(action: PlayerAction, gameState: GameState): { valid: boolean, message?: string } {
  return actionValidator.validateAction(action, gameState);
}
