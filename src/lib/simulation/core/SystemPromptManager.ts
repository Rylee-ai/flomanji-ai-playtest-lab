
import { SimulationConfig, AgentMessage } from "@/types";

/**
 * Manages system prompts and instructions for different agents in the simulation
 */
export class SystemPromptManager {
  /**
   * Prepare system prompts and instructions for a scenario
   */
  public async prepareScenario(
    rulesContent: string,
    config: SimulationConfig,
    gameState: any
  ): Promise<{ systemPrompts: any, playerSystemPrompts: any }> {
    // Create base system prompt with game rules
    const baseSystemPrompt = this.createBaseSystemPrompt(rulesContent, config);
    
    // Create scenario-specific prompts
    const scenarioSystemPrompt = this.createScenarioPrompt(config, gameState);
    
    // Create goblet voice prompt
    const gobletVoicePrompt = this.createGobletVoicePrompt(gameState.gobletVoice);
    
    // Combine all prompts
    const systemPrompts = {
      base: baseSystemPrompt,
      scenario: scenarioSystemPrompt,
      gobletVoice: gobletVoicePrompt
    };
    
    // Create player-specific prompts
    const playerSystemPrompts = await this.createPlayerSystemPrompts(
      config,
      gameState,
      baseSystemPrompt
    );
    
    return { systemPrompts, playerSystemPrompts };
  }
  
  /**
   * Generate introduction message by the Goblet
   */
  public async generateIntroduction(
    config: SimulationConfig,
    gameState: any,
    systemPrompts: any
  ): Promise<AgentMessage> {
    // In a real implementation, this would call an AI agent to generate text
    // For now, we'll create a basic introduction message
    const introduction = `Welcome, dungeon divers, to the mysterious world of Flomanji! 
I am the Goblet, your guide and game master. Today, you embark on a perilous journey through ${config.scenarioPrompt || "an unknown land"}.
Your mission, should you choose to accept it: ${this.getObjectivesDescription(config)}.
The heat level is currently at ${gameState.heat}/10. Be careful, as it will increase by ${config.heatPerRound || 0} each round.
Let the adventure begin!`;

    return {
      role: 'GM',
      content: introduction,
      timestamp: new Date().toISOString(),
      metadata: {
        roundNumber: 0,
        phase: "introduction",
        heat: gameState.heat,
        gameState: {...gameState},
        gobletVoice: gameState.gobletVoice,
        gobletMood: gameState.gobletMood
      }
    };
  }
  
  /**
   * Create base system prompt with game rules
   */
  private createBaseSystemPrompt(rulesContent: string, config: SimulationConfig): string {
    return `You are the Game Master for the tabletop game Flomanji. 
Your role is to narrate the adventure, control NPCs, and adjudicate rules.
Use these core rules for reference:
${rulesContent?.substring(0, 2000) || "Standard Flomanji rules apply."}
${config.nightmareDifficulty ? "This game is running in NIGHTMARE difficulty!" : ""}`;
  }
  
  /**
   * Create scenario-specific prompt
   */
  private createScenarioPrompt(config: SimulationConfig, gameState: any): string {
    return `SCENARIO: ${config.scenarioPrompt || "Standard mission"}
OBJECTIVES: ${this.getObjectivesDescription(config)}
STARTING HEAT: ${gameState.heat}/10
EXTRACTION REGION: ${config.extractionRegion || "exit"}`;
  }
  
  /**
   * Create goblet voice prompt
   */
  private createGobletVoicePrompt(gobletVoice: string): string {
    switch (gobletVoice) {
      case 'swamp-prophet':
        return "Speak like an ancient, mysterious swamp prophet with cryptic warnings and old-world wisdom.";
      case 'pirate-radio-dj':
        return "Speak like an energetic pirate radio DJ, with slang, sound effects, and constant enthusiasm.";
      case 'park-ranger':
        return "Speak like a cheerful but stern national park ranger, educational but cautious about dangers.";
      case 'theme-park-mascot':
        return "Speak like an overly enthusiastic theme park mascot, with catchphrases and boundless positivity.";
      default:
        return "Use a balanced, mysterious tone as the magical Goblet guiding the players.";
    }
  }
  
  /**
   * Create player system prompts
   */
  private async createPlayerSystemPrompts(
    config: SimulationConfig,
    gameState: any,
    baseSystemPrompt: string
  ): Promise<any[]> {
    // Return an array of player prompts based on characters
    return (config.fullCharacters || []).map((character, index) => {
      return {
        characterId: character.id,
        prompt: `You are playing as ${character.name}, a ${character.role} in the tabletop game Flomanji.
Your character has the following stats: Health ${character.health}/10, Weirdness ${character.weirdness}/10, Luck ${character.luck}/10.
Your special ability is: ${character.ability}
Your starting gear: ${character.starterGear?.join(", ") || "None"}
${config.secretTraitor && index === 0 ? "SECRET INSTRUCTION: You are the traitor! Subtly work against the group while appearing helpful." : ""}
Make decisions and take actions as this character would.`
      };
    });
  }
  
  /**
   * Get objectives description from config
   */
  private getObjectivesDescription(config: SimulationConfig): string {
    if (config.objectives && config.objectives.length > 0) {
      return config.objectives.map((obj: any) => 
        `${obj.required ? "[Required]" : "[Optional]"} ${obj.description}`
      ).join("; ");
    }
    return "Complete your mission and extract safely";
  }
}
