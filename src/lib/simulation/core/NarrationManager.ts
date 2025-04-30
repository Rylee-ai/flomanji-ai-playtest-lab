
import { SimulationConfig } from "@/types";
import { createChatCompletion } from "@/lib/openrouterChat";
import { getGobletNarration } from "../goblet-voice-manager";

/**
 * Manages narration and GM responses during the simulation
 */
export class NarrationManager {
  /**
   * Generate the introduction narration
   */
  public async generateIntroduction(
    config: SimulationConfig,
    gameState: any,
    systemPrompts: any
  ): Promise<string> {
    let initPrompt = "Introduce yourself as the Flomanji Goblet and set the scene for the players. Describe the starting region, current Heat level, and initial objectives. Each player should make a roll at the start to determine if they notice any important details. Use your unique Goblet personality voice.";
    
    // Add objectives information
    if (config.objectives && config.objectives.length > 0) {
      initPrompt += " The mission objectives are:";
      config.objectives.forEach((obj: any, idx: number) => {
        initPrompt += `\n${idx+1}. ${obj.description} ${obj.required ? '(Required)' : '(Optional)'}`;
      });
    }
    
    // Add character information
    if (config.fullCharacters && config.fullCharacters.length > 0) {
      initPrompt += "\n\nThe player characters are:";
      config.fullCharacters.forEach((char: any, idx: number) => {
        initPrompt += `\nPlayer ${idx+1}: ${char.name} (${char.role}) - Brawn ${char.stats.brawn}, Moxie ${char.stats.moxie}, Charm ${char.stats.charm}, Grit ${char.stats.grit}, Weird Sense ${char.stats.weirdSense}. Special ability: ${char.ability.name}`;
      });
    }
    
    // Add gear information
    initPrompt += "\n\nPlayers start with the following gear:";
    if (config.fullCharacters) {
      config.fullCharacters.forEach((char: any, idx: number) => {
        initPrompt += `\nPlayer ${idx+1}: ${(char.starterGear || []).join(", ")}`;
      });
    }
    
    // Add heat information
    initPrompt += `\n\nStarting Heat Level: ${config.startingHeat}`;
    if (config.heatPerRound > 0) {
      initPrompt += `\nHeat increases by ${config.heatPerRound} each round.`;
    }
    
    // Add goblet narration
    initPrompt += `\n\n${getGobletNarration('intro', gameState.gobletVoice, gameState.heat)}`;

    // Generate the introduction message
    const gmIntroMessage = await createChatCompletion(
      systemPrompts.gmSystemPrompt,
      [{ role: "user", content: initPrompt }]
    );

    return gmIntroMessage;
  }
  
  /**
   * Generate the results of all player actions in a round
   */
  public async generateActionResults(
    gameState: any,
    conversationLog: any[],
    systemPrompts: any
  ): Promise<string> {
    const gmActionSummaryPrompt = `All players have acted this round. 
    
    As the Flomanji Goblet, provide a detailed response to all player actions using your unique voice style. Describe how the Goblet physically reacts to each roll (glowing, bubbling, changing color, etc). Resolve all outcomes and explain the current state of the mission. Include any changes to Heat, health, or objectives.
    
    ${getGobletNarration('result', gameState.gobletVoice, gameState.heat)}`;
    
    const gmResponseMessages = conversationLog.map((entry: any) => {
      const cleanContent = entry.content.replace(/^(GM|Player \d+): /g, '');
      return {
        role: entry.role === 'GM' ? 'assistant' : 'user',
        content: entry.role === 'GM'
          ? `GM: ${cleanContent}`
          : `Player ${entry.playerIndex !== undefined ? entry.playerIndex + 1 : ''}: ${cleanContent}`
      };
    });
    
    const gmCollectiveResponse = await createChatCompletion(
      systemPrompts.gmSystemPrompt,
      [...gmResponseMessages, { role: "user", content: gmActionSummaryPrompt }]
    );
    
    return gmCollectiveResponse.replace(/^GM: /g, '');
  }
  
  /**
   * Generate the round summary
   */
  public async generateRoundSummary(
    round: number,
    gameState: any,
    conversationLog: any[],
    systemPrompts: any
  ): Promise<string> {
    const roundSummaryPrompt = `Provide a summary of round ${round} as the Flomanji Goblet. Current Heat level is ${gameState.heat}. 
    Active hazards: ${gameState.activeHazards.length > 0 ? gameState.activeHazards.join(", ") : "None"}. 
    Required Objectives completed: ${gameState.completedObjectives.length} / ${gameState.objectives?.filter((o: any) => o.required).length || 0}.
    
    ${getGobletNarration('round-end', gameState.gobletVoice, gameState.heat)}
    
    Mention that the Goblet will now be passed to the next player for the following round.`;
    
    const gmSummaryResponse = await createChatCompletion(
      systemPrompts.gmSystemPrompt,
      [...conversationLog.map((entry: any) => {
        const cleanContent = entry.content.replace(/^(GM|Player \d+): /g, '');
        return {
          role: entry.role === 'GM' ? 'assistant' : 'user',
          content: entry.role === 'GM'
            ? `GM: ${cleanContent}`
            : `Player ${entry.playerIndex !== undefined ? entry.playerIndex + 1 : ''}: ${cleanContent}`
        };
      }), { role: "user", content: roundSummaryPrompt }]
    );
    
    return gmSummaryResponse;
  }
}
