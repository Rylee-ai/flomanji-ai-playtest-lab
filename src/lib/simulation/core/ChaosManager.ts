
import { AgentMessage } from "@/types";
import { ChaosCard } from "@/types/cards/chaos";
import { createChatCompletion } from "@/lib/openrouterChat";
import { drawRandomCard } from "../game-mechanics";
import { CHAOS_CARDS } from "@/lib/cards/chaos-cards";
import { getGobletNarration } from "../goblet-voice-manager";

/**
 * Manages the drawing and effects of Chaos Cards
 */
export class ChaosManager {
  /**
   * Draw a chaos card and apply its effects
   */
  public async drawChaosCard(
    gameState: any,
    conversationLog: AgentMessage[],
    systemPrompts: any
  ): Promise<AgentMessage[]> {
    const messages: AgentMessage[] = [];
    
    // Draw a random chaos card
    const chaosCard = drawRandomCard(CHAOS_CARDS);
    if (!chaosCard) {
      return messages;
    }
    
    // Track active chaos effect if it's persistent
    if (chaosCard.duration === 'ongoing') {
      // Remove any previous ongoing effects that should be replaced
      gameState.activeChaosEffects = (gameState.activeChaosEffects || [])
        .filter((effect: any) => effect.permanent);
        
      // Add this effect
      gameState.activeChaosEffects.push({
        name: chaosCard.name,
        effect: chaosCard.globalEffect,
        permanent: false
      });
    }
    
    // Apply heat effect if specified
    if (chaosCard.heatEffect) {
      gameState.heat = Math.min(10, gameState.heat + chaosCard.heatEffect);
    }
    
    // Generate the chaos card announcement
    const chaosPrompt = `A Chaos Card has been drawn: ${chaosCard.name}. 
    
    ${chaosCard.globalEffect}
    
    As the Flomanji Goblet, dramatically announce this chaos effect to the players. Describe how the card manifests in the game world with vivid detail. If the card affects heat levels, emphasize the rising danger. Make this feel tense and impactful.
    
    ${getGobletNarration('chaos', gameState.gobletVoice, gameState.heat, chaosCard)}`;
    
    const gmChaosMessage = await createChatCompletion(
      systemPrompts.gmSystemPrompt,
      [...conversationLog.map(entry => {
        const cleanContent = entry.content.replace(/^(GM|Player \d+): /g, '');
        return {
          role: entry.role === 'GM' ? 'assistant' : 'user',
          content: entry.role === 'GM'
            ? `GM: ${cleanContent}`
            : `Player ${entry.playerIndex !== undefined ? entry.playerIndex + 1 : ''}: ${cleanContent}`
        };
      }), { role: "user", content: chaosPrompt }]
    );
    
    messages.push({
      role: 'GM',
      content: gmChaosMessage,
      timestamp: new Date().toISOString(),
      metadata: {
        roundNumber: gameState.currentRound,
        phase: "chaos-card",
        chaosCard: chaosCard.name,
        heatEffect: chaosCard.heatEffect,
        heat: gameState.heat,
        gameState: {...gameState}
      }
    });
    
    return messages;
  }
}
