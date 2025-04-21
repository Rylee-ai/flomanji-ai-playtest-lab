
// Utilities for cloning state
import { GameState } from "@/types/game-state";
export function cloneGameState(state: GameState): GameState {
  return JSON.parse(JSON.stringify(state));
}
