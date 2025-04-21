
import { AgentMessage, SimulationConfig } from "@/types";

/**
 * Checks if the game should end based on current state
 */
export function checkGameEndConditions(
  simulationMeta: any,
  config: SimulationConfig,
  round: number,
  conversationLog: AgentMessage[]
): { shouldEnd: boolean; reason?: string; outcome?: string } {
  // Check for heat maximum
  if (simulationMeta.gameState.heat >= 10) {
    conversationLog.push({
      role: 'GM',
      content: `[Game Over] Heat has reached ${simulationMeta.gameState.heat}, exceeding the maximum threshold of 10. The mission has failed.`,
      timestamp: new Date().toISOString(),
      metadata: {
        roundNumber: round + 1,
        phase: "game-over",
        reason: "heat-maximum",
        outcome: "failure",
        heat: simulationMeta.gameState.heat,
        gameState: {...simulationMeta.gameState}
      }
    });
    
    return { shouldEnd: true, reason: "heat-maximum", outcome: "failure" };
  }
  
  // Check if all players have reached high weirdness
  const actualPlayerCount = config.characters ? config.characters.length : (config.players || 1);
  let allPlayersTransformed = true;
  for (let i = 0; i < actualPlayerCount; i++) {
    const playerInventory = simulationMeta.gameState.playerInventories[i];
    if (playerInventory && playerInventory.weirdness < 10) {
      allPlayersTransformed = false;
      break;
    }
  }
  
  if (allPlayersTransformed) {
    conversationLog.push({
      role: 'GM',
      content: `[Game Over] All players have reached maximum Weirdness and have been transformed. The mission has failed.`,
      timestamp: new Date().toISOString(),
      metadata: {
        roundNumber: round + 1,
        phase: "game-over",
        reason: "all-players-transformed",
        outcome: "failure",
        heat: simulationMeta.gameState.heat,
        gameState: {...simulationMeta.gameState}
      }
    });
    
    return { shouldEnd: true, reason: "all-players-transformed", outcome: "failure" };
  }
  
  // Check for mission completion
  if (simulationMeta.gameState.currentRegion === config.extractionRegion) {
    // Check if all required objectives are completed
    const requiredObjectives = config.objectives?.filter(o => o.required) || [];
    const allRequiredCompleted = requiredObjectives.every(obj => 
      simulationMeta.gameState.completedObjectives.includes(obj.id));
      
    if (allRequiredCompleted) {
      conversationLog.push({
        role: 'GM',
        content: `[Game Over] Players have reached the extraction point with all required objectives complete. The mission is successful!`,
        timestamp: new Date().toISOString(),
        metadata: {
          roundNumber: round + 1,
          phase: "game-over",
          reason: "mission-complete",
          outcome: "success",
          heat: simulationMeta.gameState.heat,
          gameState: {...simulationMeta.gameState}
        }
      });
      
      return { shouldEnd: true, reason: "mission-complete", outcome: "success" };
    }
  }
  
  return { shouldEnd: false };
}
