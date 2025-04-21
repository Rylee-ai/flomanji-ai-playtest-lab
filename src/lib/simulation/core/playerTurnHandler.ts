
import { SimulationConfig, AgentMessage, FlomanjiCharacter } from "@/types";
import { processPlayerAction, detectItemUsage } from "../game-events";
import { simulateDiceRoll, drawRandomCard } from "../dice-utils";
import { getPlayerResponse, getGMResponse } from "../agent-communication";
import { TREASURE_CARDS } from "@/lib/cards/treasure-cards";
import { updateStateForHazardResolution } from "./hazardHandler";
import { checkGameEndConditions } from "./gameEndConditions";

/**
 * Processes a single player's turn in the simulation
 * @returns boolean indicating if the simulation should continue
 */
export async function processPlayerTurn(
  playerIdx: number,
  round: number,
  conversationLog: AgentMessage[],
  simulationMeta: any,
  gmSystemPrompt: string,
  playerSystemPrompt: string,
  config: SimulationConfig
): Promise<boolean> {
  console.log(`Processing player ${playerIdx + 1}'s turn`);
  
  // Add player-specific information about their current state
  const playerStatePrompt = `
  [System Information - Your Current State]
  - Health: ${simulationMeta.gameState.playerInventories[playerIdx]?.health || 5}
  - Weirdness: ${simulationMeta.gameState.playerInventories[playerIdx]?.weirdness || 0}
  - Luck: ${simulationMeta.gameState.playerInventories[playerIdx]?.luck || 3}
  - Gear: ${simulationMeta.gameState.playerInventories[playerIdx]?.gear.join(", ") || "None"}
  - Treasures: ${simulationMeta.gameState.playerInventories[playerIdx]?.treasures.join(", ") || "None"}
  
  It's your turn. You have 2 actions from: Move, Use Gear, Interact, Team-Up, Rest, or Mission.
  If responding to a hazard, clearly state if you choose to Fight, Flee, Negotiate, or Outsmart it.
  Please make your decision and specify which stats you will use for any necessary checks.`;
  
  // Get player's action
  const playerResponse = await getPlayerResponse(
    playerSystemPrompt,
    conversationLog,
    playerIdx,
    playerStatePrompt
  );

  // Check for dice rolls and item usage
  const character = config.fullCharacters?.[playerIdx];
  const rollInfo = processPlayerAction(playerResponse, playerIdx, character);
  const itemUsage = detectItemUsage(
    playerResponse, 
    simulationMeta.gameState.playerInventories[playerIdx] || { gear: [], treasures: [] }
  );
  
  let rollResult = null;
  if (rollInfo.needsRoll) {
    rollResult = simulateDiceRoll(rollInfo.statValue);
    simulationMeta.gameState.rolls.push({
      player: playerIdx + 1,
      type: "action",
      value: rollResult.value,
      stat: rollInfo.statName,
      result: rollResult.result
    });
  }

  // Add player response to log
  conversationLog.push({
    role: 'Player',
    content: playerResponse,
    playerIndex: playerIdx,
    timestamp: new Date().toISOString(),
    metadata: {
      roundNumber: round + 1,
      phase: "player-action",
      playerNumber: playerIdx + 1,
      playerName: config.fullCharacters?.[playerIdx]?.name || `Player ${playerIdx+1}`,
      roll: rollResult ? {
        stat: rollInfo.statName,
        value: rollResult.value,
        modifier: rollInfo.statValue,
        total: rollResult.value + rollInfo.statValue,
        result: rollResult.result
      } : undefined,
      inventory: simulationMeta.gameState.playerInventories[playerIdx],
      gameState: {...simulationMeta.gameState}
    }
  });
  
  // Add roll information for GM if a roll was made
  let gmPrompt = `Respond to Player ${playerIdx + 1}'s action.`;
  
  if (rollResult) {
    gmPrompt += ` The player rolled for ${rollInfo.statName}: ${rollResult.value} + ${rollInfo.statValue} = ${rollResult.value + rollInfo.statValue}, which is a ${rollResult.result}.`;
    
    // Update game state based on hazard resolution
    const hazardName = simulationMeta.gameState.activeHazards[0] || null;
    if (hazardName) {
      gmPrompt += updateStateForHazardResolution(simulationMeta, hazardName, rollResult, playerIdx);
      
      // Award treasure on successful hazard resolution
      if (rollResult.result === "success" && Math.random() > 0.6) {
        const treasure = drawRandomCard(TREASURE_CARDS);
        if (treasure) {
          gmPrompt += ` The player finds "${treasure.name}" after resolving the hazard!`;
          const playerInventory = simulationMeta.gameState.playerInventories[playerIdx];
          if (playerInventory) {
            playerInventory.treasures.push(treasure.name);
          }
        }
      }
    }
  }
  
  if (itemUsage.itemUsed) {
    gmPrompt += ` The player is using their "${itemUsage.itemName}" item.`;
  }

  // Get GM's response
  const gmResponse = await getGMResponse(gmSystemPrompt, conversationLog, gmPrompt);

  conversationLog.push({
    role: 'GM',
    content: gmResponse,
    timestamp: new Date().toISOString(),
    metadata: {
      roundNumber: round + 1,
      phase: "gm-response",
      heat: simulationMeta.gameState.heat,
      gameState: {...simulationMeta.gameState}
    }
  });
  
  // Check for game end conditions
  const endResult = checkGameEndConditions(simulationMeta, config, round, conversationLog);
  
  return !endResult.shouldEnd;
}
