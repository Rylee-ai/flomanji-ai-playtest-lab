
// Handles advancing turn logic
import { GameState } from "@/types/game-state";
import { TurnManager } from "./turn-manager";

const turnManager = new TurnManager();
export function advanceTurn(gameState: GameState): GameState {
  return turnManager.advanceToNextTurn(gameState);
}
