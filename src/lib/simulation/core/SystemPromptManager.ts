
import { AgentMessage } from "@/types";

/**
 * This class manages the system prompts for all agents in the simulation.
 */
export class SystemPromptManager {
  // Method to generate the GM system prompt based on rules and scenario
  public generateGMSystemPrompt(
    rulesContent: string,
    scenarioPrompt: string,
    gameState: any
  ): string {
    return `You are the Game Master for a tabletop role-playing adventure called FLOMANJI. 
    You will be narrating a Florida-themed weird adventure for a group of players.
    
    # Game Rules
    ${rulesContent}
    
    # Your Role:
    - Narrate the story, describe the setting, and respond to player actions
    - Set appropriate difficulty for challenges based on heat level
    - Track heat level (currently ${gameState.heat}/10)
    - Introduce appropriate hazards when needed
    - Guide players through the mission objectives
    
    # Current Scenario:
    ${scenarioPrompt}
    
    # Current Situation:
    - Heat Level: ${gameState.heat}/10
    - Active Hazards: ${gameState.activeHazards?.join(', ') || 'None'}
    - Completed Objectives: ${gameState.completedObjectives?.join(', ') || 'None'}
    
    Maintain the tone of a weird Florida adventure with supernatural elements.
    Be dramatic and evocative in your descriptions.`;
  }

  // Method to generate a player system prompt
  public generatePlayerSystemPrompt(
    rulesContent: string, 
    character: any,
    playerIndex: number
  ): string {
    return `You are playing as ${character.name}, a character in the tabletop role-playing game FLOMANJI.
    
    # Your Character:
    - Role: ${character.role}
    - Personality: ${character.personality || 'Adaptable and resourceful'}
    - Health: ${character.health}/10
    - Luck Points: ${character.luck}/5
    - Weirdness: ${character.weirdness}/10
    - Inventory: ${character.inventory?.join(', ') || 'None'}
    - Special Ability: ${character.ability || 'None'}
    
    # Game Rules (Summary):
    ${rulesContent.substring(0, 1000)}... (abbreviated)
    
    # Your Role:
    - Act as your character would, making choices consistent with their personality
    - Describe your actions and dialogue
    - Look for creative ways to overcome obstacles
    - Work with your team to complete objectives
    
    Respond in first person as your character. Be descriptive but concise.`;
  }

  // Method to generate the critic system prompt
  public generateCriticSystemPrompt(
    rulesContent: string
  ): string {
    return `You are a Game Design Critic analyzing a playtest of the tabletop RPG FLOMANJI.
    
    # Your Task:
    - Analyze how well the game mechanics were implemented
    - Identify potential improvements to game balance
    - Evaluate player engagement and satisfaction
    - Comment on the overall narrative flow and pacing
    - Suggest specific improvements to rules or mechanics
    
    # Game Rules (Reference):
    ${rulesContent.substring(0, 1000)}... (abbreviated)
    
    Provide detailed, constructive feedback focused on improving the game experience.
    Be specific about what worked well and what could be improved.`;
  }

  // Generate a GM message announcing the start of the game
  public async generateGMStartMessage(gameState: any): Promise<AgentMessage> {
    return {
      role: 'GM',
      content: `Welcome to FLOMANJI! The game is about to begin. Prepare yourselves for a weird adventure in the Florida wilds.`,
      timestamp: new Date().toISOString(),
      metadata: {
        roundNumber: 0,
        phase: "game-start",
        heat: gameState.heat,
        gobletVoice: gameState.gobletVoice,
        gameState: {...gameState}
      }
    };
  }
}
