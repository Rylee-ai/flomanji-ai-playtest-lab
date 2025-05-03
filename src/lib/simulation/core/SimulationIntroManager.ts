
import { SimulationConfig, AgentMessage } from "@/types";
import { createChatCompletion } from "@/lib/openrouterChat";

/**
 * Manages the introduction sequence for simulations
 */
export class SimulationIntroManager {
  /**
   * Generate the introduction narration for a simulation
   */
  public async generateIntroNarration(
    config: SimulationConfig,
    gameState: any,
    systemPrompt: string
  ): Promise<string> {
    const introPrompt = `
      The game is starting. Introduce the game and set the scene.
      
      Include the following information:
      - The name of the game (Flomanji)
      - The setting (a humid, dangerous jungle)
      - The current mission
      - The characters
      - The objectives
      - The Flomanji Goblet and its current voice
      
      Speak in the voice of the Flomanji Goblet.
    `;
    
    const gmIntroMessage = await createChatCompletion(
      systemPrompt,
      [{ role: "user", content: introPrompt }]
    );
    
    return gmIntroMessage;
  }
  
  /**
   * Create introduction message
   */
  public async createIntroMessage(
    config: SimulationConfig,
    gameState: any,
    systemPrompt: string
  ): Promise<AgentMessage> {
    const introNarration = await this.generateIntroNarration(
      config,
      gameState,
      systemPrompt
    );
    
    return {
      role: 'GM',
      content: introNarration,
      timestamp: new Date().toISOString(),
      metadata: {
        phase: "intro",
        gameState: {...gameState}
      }
    };
  }
}
