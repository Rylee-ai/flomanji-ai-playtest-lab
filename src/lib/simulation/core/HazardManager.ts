
import { AgentMessage } from "@/types";
import { createChatCompletion } from "@/lib/openrouterChat";
import { drawRandomCard } from "../game-mechanics";
import { getGobletNarration } from "../goblet-voice-manager";
import { HAZARD_CARDS } from "@/lib/cards/hazard-cards";

/**
 * Manages hazard generation and resolution
 */
export class HazardManager {
  /**
   * Generate a hazard encounter for the current round
   */
  public async generateHazardEncounter(
    gameState: any,
    conversationLog: AgentMessage[],
    systemPrompts: any
  ): Promise<AgentMessage[]> {
    const hazardMessages: AgentMessage[] = [];
    
    const hazard = drawRandomCard(HAZARD_CARDS);
    if (!hazard) {
      return hazardMessages;
    }
    
    gameState.activeHazards.push(hazard.name);
    
    const hazardPrompt = `A new hazard appears: ${hazard.name}. ${hazard.flavor || ""} 
    The rules for this hazard are: ${hazard.rules ? hazard.rules.join(", ") : "Standard hazard rules apply."}
    
    As the Flomanji Goblet, dramatically announce this hazard to the players with your unique voice. Describe how the Goblet reacts physically (glowing, trembling, changing temperature). Then call for appropriate checks. The players need to decide if they will Fight (Brawn), Flee (Moxie), Negotiate (Charm), or Outsmart (Weird Sense) this hazard.
    
    ${getGobletNarration('hazard', gameState.gobletVoice, gameState.heat, hazard)}`;
    
    const gmHazardMessage = await createChatCompletion(
      systemPrompts.gmSystemPrompt,
      [...conversationLog.map(entry => {
        const cleanContent = entry.content.replace(/^(GM|Player \d+): /g, '');
        return {
          role: entry.role === 'GM' ? 'assistant' : 'user',
          content: entry.role === 'GM'
            ? `GM: ${cleanContent}`
            : `Player ${entry.playerIndex !== undefined ? entry.playerIndex + 1 : ''}: ${cleanContent}`
        };
      }), { role: "user", content: hazardPrompt }]
    );
    
    hazardMessages.push({
      role: 'GM',
      content: gmHazardMessage,
      timestamp: new Date().toISOString(),
      metadata: {
        roundNumber: gameState.currentRound,
        phase: "hazard-introduction",
        hazard: hazard.name,
        heat: gameState.heat,
        gameState: {...gameState}
      }
    });
    
    return hazardMessages;
  }
}
