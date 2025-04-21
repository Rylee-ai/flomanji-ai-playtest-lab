
import { SimulationConfig, AgentMessage, FlomanjiCharacter } from "@/types";
import { processPlayerTurn } from "./playerTurnHandler";
import { processHazard } from "./hazardHandler";
import { getGMResponse } from "../agent-communication";
import { drawRandomCard } from "../dice-utils";
import { HAZARD_CARDS } from "@/lib/cards/hazard-cards";

/**
 * Processes a single round of the simulation
 * @returns boolean indicating if the simulation should continue
 */
export async function processRound(
  round: number,
  conversationLog: AgentMessage[],
  simulationMeta: any,
  gmSystemPrompt: string,
  playerSystemPrompts: string[],
  config: SimulationConfig
): Promise<boolean> {
  simulationMeta.gameState.currentRound = round + 1;
  console.log(`Starting round ${round + 1}`);
  
  // Potentially increase heat at start of round based on config
  if (config.heatPerRound && config.heatPerRound > 0 && round > 0) {
    simulationMeta.gameState.heat += config.heatPerRound;
    
    // Log heat increase
    conversationLog.push({
      role: 'GM',
      content: `[System] Heat increases to ${simulationMeta.gameState.heat} at the start of round ${round+1}.`,
      timestamp: new Date().toISOString(),
      metadata: {
        roundNumber: round + 1,
        phase: "heat-update",
        heat: simulationMeta.gameState.heat,
        gameState: {...simulationMeta.gameState}
      }
    });
  }
  
  // Draw hazard card for this round
  const hazard = drawRandomCard(HAZARD_CARDS);
  if (hazard) {
    await processHazard(hazard, conversationLog, simulationMeta, gmSystemPrompt, round);
  }
  
  // Each player takes their turn in this round
  const actualPlayerCount = config.characters ? config.characters.length : (config.players || 1);
  for (let playerIdx = 0; playerIdx < actualPlayerCount; playerIdx++) {
    const shouldContinue = await processPlayerTurn(
      playerIdx, 
      round, 
      conversationLog, 
      simulationMeta,
      gmSystemPrompt,
      playerSystemPrompts[playerIdx],
      config
    );
    
    // Check if game ended during this player's turn
    if (!shouldContinue) {
      return false;
    }
  }
  
  // Check if game ended during this round
  if (conversationLog.some(entry => entry.metadata?.phase === "game-over")) {
    return false;
  }
  
  // End of round summary by GM
  await processEndOfRoundSummary(round, conversationLog, simulationMeta, gmSystemPrompt, config);
  
  return true;
}

/**
 * Process the end of round summary from the GM
 */
async function processEndOfRoundSummary(
  round: number,
  conversationLog: AgentMessage[],
  simulationMeta: any,
  gmSystemPrompt: string,
  config: SimulationConfig
): Promise<void> {
  const roundSummaryPrompt = `Provide a summary of round ${round + 1}. Current Heat level is ${simulationMeta.gameState.heat}. 
  Active hazards: ${simulationMeta.gameState.activeHazards.length > 0 ? simulationMeta.gameState.activeHazards.join(", ") : "None"}. 
  Required Objectives completed: ${simulationMeta.gameState.completedObjectives.length} / ${config.objectives?.filter(o => o.required).length || 0}.`;
  
  const gmSummaryResponse = await getGMResponse(gmSystemPrompt, conversationLog, roundSummaryPrompt);
  
  conversationLog.push({
    role: 'GM',
    content: gmSummaryResponse,
    timestamp: new Date().toISOString(),
    metadata: {
      roundNumber: round + 1,
      phase: "round-summary",
      heat: simulationMeta.gameState.heat,
      activeHazards: simulationMeta.gameState.activeHazards,
      completedObjectives: simulationMeta.gameState.completedObjectives,
      gameState: {...simulationMeta.gameState}
    }
  });
}
