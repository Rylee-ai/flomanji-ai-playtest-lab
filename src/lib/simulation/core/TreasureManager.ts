
import { AgentMessage } from "@/types";
import { createChatCompletion } from "@/lib/openrouterChat";
import { drawRandomCard } from "../game-mechanics";
import { TREASURE_CARDS } from "@/lib/cards/treasure-cards";
import { getGobletNarration } from "../goblet-voice-manager";

/**
 * Manages the discovery and effects of Treasure Cards
 */
export class TreasureManager {
  /**
   * Check if players should discover treasure based on their actions
   */
  public async checkForTreasureDiscovery(
    gameState: any,
    conversationLog: AgentMessage[],
    playerResponses: AgentMessage[],
    systemPrompts: any
  ): Promise<AgentMessage[]> {
    const messages: AgentMessage[] = [];
    
    // Skip if no treasure should be found this round
    // Logic: 33% chance per round if players have completed objectives or overcome hazards
    const objectivesCompleted = gameState.completedObjectives?.length > 0;
    const hazardsOvercome = gameState.activeHazards?.length > 0;
    
    const shouldDiscoverTreasure = (objectivesCompleted || hazardsOvercome) && 
      Math.random() < 0.33;
    
    if (!shouldDiscoverTreasure) {
      return messages;
    }
    
    // Draw a random treasure card
    const treasureCard = drawRandomCard(TREASURE_CARDS);
    if (!treasureCard) {
      return messages;
    }
    
    // Track the discovered treasure
    gameState.discoveredTreasures = gameState.discoveredTreasures || [];
    gameState.discoveredTreasures.push(treasureCard.name);
    
    // Determine which player found the treasure (random active player)
    const playerIndices = Array.from(
      new Set(playerResponses.map(response => response.playerIndex))
    ).filter(index => index !== undefined);
    
    if (playerIndices.length === 0) {
      return messages;
    }
    
    const finderIndex = playerIndices[Math.floor(Math.random() * playerIndices.length)];
    
    // Generate the treasure discovery announcement
    const treasurePrompt = `Player ${finderIndex + 1} has discovered a treasure: ${treasureCard.name}!
    
    Description: ${treasureCard.flavor}
    Effect: ${treasureCard.passiveEffect || treasureCard.useEffect || "Provides a valuable item that may help in the mission."}
    
    As the Flomanji Goblet, dramatically announce this treasure discovery to the players. Describe how they found it, what it looks like, and hint at its powers. Make this feel exciting and rewarding!
    
    ${getGobletNarration('treasure', gameState.gobletVoice, gameState.heat, treasureCard)}`;
    
    const gmTreasureMessage = await createChatCompletion(
      systemPrompts.gmSystemPrompt,
      [...conversationLog.map(entry => {
        const cleanContent = entry.content.replace(/^(GM|Player \d+): /g, '');
        return {
          role: entry.role === 'GM' ? 'assistant' : 'user',
          content: entry.role === 'GM'
            ? `GM: ${cleanContent}`
            : `Player ${entry.playerIndex !== undefined ? entry.playerIndex + 1 : ''}: ${cleanContent}`
        };
      }), { role: "user", content: treasurePrompt }]
    );
    
    messages.push({
      role: 'GM',
      content: gmTreasureMessage,
      timestamp: new Date().toISOString(),
      metadata: {
        roundNumber: gameState.currentRound,
        phase: "treasure-discovery",
        treasureCard: treasureCard.name,  // Changed from discoveredTreasure to treasureCard
        finderPlayerIndex: finderIndex,
        gameState: {...gameState}
      }
    });
    
    return messages;
  }
}
