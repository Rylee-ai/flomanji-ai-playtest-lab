
// Heat increase/decrease
import { GameState } from "@/types/game-state";
import { HeatManager } from "./heat-manager";

const heatManager = new HeatManager();

export function increaseHeat(gameState: GameState, amount: number = 1, reason?: string): GameState {
  return heatManager.increaseHeat(gameState, amount, reason);
}

export function decreaseHeat(gameState: GameState, amount: number = 1, reason?: string): GameState {
  return heatManager.decreaseHeat(gameState, amount, reason);
}
