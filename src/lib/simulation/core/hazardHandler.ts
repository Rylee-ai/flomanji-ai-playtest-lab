
import { AgentMessage } from "@/types";
import { getGMResponse } from "../agent-communication";

/**
 * Processes a hazard appearance in the simulation
 */
export async function processHazard(
  hazard: any,
  conversationLog: AgentMessage[],
  simulationMeta: any,
  gmSystemPrompt: string,
  round: number
): Promise<void> {
  simulationMeta.gameState.activeHazards.push(hazard.name);
  
  // Update GM about the hazard (as a system message)
  const hazardPrompt = `A new hazard appears: ${hazard.name}. ${hazard.description || ""} 
  The rules for this hazard are: ${hazard.rules ? hazard.rules.join(", ") : "Standard hazard rules apply."}
  
  Introduce this hazard to the players and call for appropriate checks. The players need to decide if they will Fight (Brawn), Flee (Moxie), Negotiate (Charm), or Outsmart (Weird Sense) this hazard.`;
  
  // GM describes the hazard
  const gmHazardMessage = await getGMResponse(gmSystemPrompt, conversationLog, hazardPrompt);
  
  conversationLog.push({
    role: 'GM',
    content: gmHazardMessage,
    timestamp: new Date().toISOString(),
    metadata: {
      roundNumber: round + 1,
      phase: "hazard-introduction",
      hazard: hazard.name,
      heat: simulationMeta.gameState.heat,
      gameState: {...simulationMeta.gameState}
    }
  });
}

/**
 * Updates the game state based on hazard resolution
 */
export function updateStateForHazardResolution(
  simulationMeta: any, 
  hazardName: string, 
  rollResult: { result: string; value: number; },
  playerIdx: number
): string {
  let gmPrompt = "";
  
  // If hazard was involved, update heat based on result
  if (hazardName && simulationMeta.gameState.activeHazards.length > 0) {
    if (rollResult.result === "failure") {
      simulationMeta.gameState.heat += 2;
      gmPrompt += ` This increases Heat by 2 to ${simulationMeta.gameState.heat}.`;
      
      // Check for potential damage or weirdness increase
      const playerInventory = simulationMeta.gameState.playerInventories[playerIdx];
      if (playerInventory) {
        playerInventory.health -= 1;
        gmPrompt += ` The player takes 1 damage (health now ${playerInventory.health}).`;
      }
    } else if (rollResult.result === "partial success") {
      simulationMeta.gameState.heat += 1;
      gmPrompt += ` This increases Heat by 1 to ${simulationMeta.gameState.heat}.`;
    }
    
    // Check if the hazard is resolved
    if (rollResult.result === "success") {
      simulationMeta.gameState.activeHazards = 
        simulationMeta.gameState.activeHazards.filter(h => h !== hazardName);
      gmPrompt += ` The hazard "${hazardName}" is fully resolved.`;
    }
  }
  
  return gmPrompt;
}
