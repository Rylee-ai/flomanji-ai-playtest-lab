
import { AgentMessage, SimulationConfig, FlomanjiCharacter } from "@/types";

/**
 * Processes player action and determines if a dice roll is needed
 * @param playerResponse - The player's response text
 * @param playerIdx - Index of the player
 * @param character - The player's character
 * @returns Information about any detected rolls
 */
export function processPlayerAction(
  playerResponse: string,
  playerIdx: number,
  character?: FlomanjiCharacter
): { 
  needsRoll: boolean, 
  statName: string, 
  statValue: number 
} {
  let statName = "";
  let statValue = 0;
  const rollPatterns = [
    /roll(?:s|ing)?\s+(?:for)?\s*(\w+)/i, // "roll for Brawn" or "rolling Charm"
    /(\w+)\s+(?:check|roll|test)/i,       // "Brawn check" or "Moxie roll"
    /check(?:s|ing)?\s+(?:with)?\s*(\w+)/i, // "checking with Charm"
    /test(?:s|ing)?\s+(?:with)?\s*(\w+)/i  // "testing with Weird Sense"
  ];
  
  // Check for dice roll references in player response
  for (const pattern of rollPatterns) {
    const match = playerResponse.match(pattern);
    if (match && match[1]) {
      statName = match[1].toLowerCase();
      // Convert stat name to proper form
      if (statName.includes("brawn") || statName === "strength") {
        statName = "brawn";
        statValue = character?.stats.brawn || 0;
      } else if (statName.includes("moxie") || statName === "agility") {
        statName = "moxie";
        statValue = character?.stats.moxie || 0;
      } else if (statName.includes("charm") || statName === "social") {
        statName = "charm";
        statValue = character?.stats.charm || 0;
      } else if (statName.includes("grit") || statName === "endurance") {
        statName = "grit";
        statValue = character?.stats.grit || 0;
      } else if (statName.includes("weird") || statName === "sense") {
        statName = "weirdSense";
        statValue = character?.stats.weirdSense || 0;
      }
      
      if (statName) {
        return { needsRoll: true, statName, statValue };
      }
    }
  }
  
  return { needsRoll: false, statName: "", statValue: 0 };
}

/**
 * Detects item usage in player responses
 * @param playerResponse - The player's response text 
 * @param playerInventory - The player's inventory
 * @returns Information about detected item usage
 */
export function detectItemUsage(
  playerResponse: string,
  playerInventory: { gear: string[], treasures: string[] }
): { itemUsed: boolean, itemName: string } {
  const cardUsagePatterns = [
    /use(?:s|ing)?\s+(?:my)?\s*"?([^.,"]+)"?/i,  // "using my Flashlight"
    /activate(?:s|ing)?\s+(?:my)?\s*"?([^.,"]+)"?/i, // "activating my Lucky Charm"
    /pull(?:s|ing)? out(?:my)?\s*"?([^.,"]+)"?/i    // "pulls out First Aid Kit"
  ];
  
  for (const pattern of cardUsagePatterns) {
    const match = playerResponse.match(pattern);
    if (match && match[1]) {
      const itemName = match[1].trim();
      // Check if player has this item
      if (playerInventory && 
          (playerInventory.gear.some(g => g.toLowerCase().includes(itemName.toLowerCase())) || 
           playerInventory.treasures.some(t => t.toLowerCase().includes(itemName.toLowerCase())))) {
        return { itemUsed: true, itemName };
      }
    }
  }
  
  return { itemUsed: false, itemName: "" };
}

/**
 * Creates a formatted transcript of the conversation
 * @param conversationLog - The complete conversation log
 * @returns Formatted transcript as string
 */
export function createFormattedTranscript(conversationLog: AgentMessage[]): string {
  return conversationLog.map(entry => {
    const cleanContent = entry.content.replace(/^(GM|Player \d+): /g, '');
    return `${entry.role}${entry.playerIndex !== undefined ? ` ${entry.playerIndex + 1}` : ''}: ${cleanContent}`;
  }).join("\n\n");
}

/**
 * Creates a formatted simulation metadata string
 * @param config - Simulation configuration
 * @param heat - Final heat level
 * @param completedObjectives - Array of completed objectives
 * @returns Formatted metadata string
 */
export function createSimulationMetadata(
  config: SimulationConfig,
  heat: number,
  completedObjectives: string[]
): string {
  return `
  - Scenario: ${config.scenarioPrompt}
  - Players: ${config.players || 1}
  - Rounds: ${config.rounds || 5}
  - Starting Heat: ${config.startingHeat || 0}
  - Heat per Round: ${config.heatPerRound || 0}
  - Characters: ${config.fullCharacters?.map(c => c.name).join(", ") || "Standard characters"}
  - Final Heat Level: ${heat}
  - Completed Objectives: ${completedObjectives.length}
  `;
}
