
import { AgentMessage, AgentRole } from "@/types"; // Added AgentRole import
import { createChatCompletion } from "@/lib/openrouterChat";
import { rollDice, checkSuccess } from "../game-mechanics";
import { getGobletNarration } from "../goblet-voice-manager";

/**
 * Manages player actions and profiles
 */
export class PlayerManager {
  /**
   * Initialize player profiles with system prompts
   */
  public async initializePlayerProfiles(
    config: any,
    gameState: any,
    systemPrompt: string
  ): Promise<any[]> {
    const playerSystemPrompts = [];
    
    // For each player, create a system prompt
    for (let i = 0; i < (config.players || 3); i++) {
      const character = gameState.selectedCharacters[i];
      
      if (!character) {
        continue;
      }
      
      // Create a player-specific system prompt
      const playerPrompt = `
        You are playing the character ${character.name} in the role-playing game Flomanji.
        
        Your character has the following attributes:
        - Health: ${character.health || 10}
        - Luck: ${character.luck || 5}
        - Weirdness: ${character.weirdness || 0}
        
        ${character.ability ? `You have a special ability: ${character.ability}` : ''}
        ${character.starterGear && character.starterGear.length > 0 
          ? `You start with the following gear: ${character.starterGear.join(', ')}` 
          : 'You do not start with any special gear.'
        }
        
        Your goal is to work with the other players to complete the mission objectives.
        
        When the Game Master (GM) describes a situation and asks what you want to do, respond
        with your character's actions and dialogue. Stay in character and make decisions that
        align with your character's personality and abilities.
      `;
      
      playerSystemPrompts.push(playerPrompt);
    }
    
    return playerSystemPrompts;
  }
  
  /**
   * Process turns for all players
   */
  public async processPlayerTurns(
    config: any,
    gameState: any,
    conversationLog: AgentMessage[],
    playerSystemPrompts: any[]
  ): Promise<AgentMessage[]> {
    return this.generatePlayerResponses(
      gameState,
      conversationLog,
      playerSystemPrompts,
      gameState.currentRound
    );
  }
  
  /**
   * Generate player responses to a given scenario
   */
  public async generatePlayerResponses(
    gameState: any,
    conversationLog: AgentMessage[],
    systemPrompts: any[],
    currentRound: number
  ): Promise<AgentMessage[]> {
    const messages: AgentMessage[] = [];
    const playerCount = Object.keys(gameState.playerInventories).length;
    
    // Generate response for each player
    for (let i = 0; i < playerCount; i++) {
      const systemPrompt = systemPrompts[i];
      
      if (!systemPrompt) {
        continue;
      }
      
      // Create prompt for the player
      const playerPrompt = `
        It is now your turn to act. What do you want to do?
        
        Current situation:
        - You are in the ${gameState.currentRegion || 'jungle'} region.
        - The heat level is ${gameState.heat}/10.
        - Your character has ${gameState.playerInventories[i]?.health || 10} health remaining.
        
        Respond with your character's actions and dialogue.
      `;
      
      // Generate the player's response
      const playerResponse = await createChatCompletion(
        systemPrompt,
        [...conversationLog.map(entry => {
          const cleanContent = entry.content.replace(/^(GM|Player \d+): /g, '');
          return {
            role: entry.role === 'GM' ? 'assistant' : 'user',
            content: entry.role === 'GM'
              ? `GM: ${cleanContent}`
              : `Player ${entry.playerIndex !== undefined ? entry.playerIndex + 1 : ''}: ${cleanContent}`
          };
        }), { role: "user", content: playerPrompt }]
      );
      
      // Changed from 'Player' to 'Player 1' or appropriate player number
      const playerRole = `Player ${i + 1}` as AgentRole;
      
      // Add the response to the messages array
      messages.push({
        role: playerRole,
        content: playerResponse,
        timestamp: new Date().toISOString(),
        playerIndex: i,
        metadata: {
          roundNumber: currentRound,
          phase: "player-turn",
          playerNumber: i + 1,
          isGobletHolder: gameState.currentGobletHolder === i,
          gameState: {...gameState}
        }
      });
    }
    
    return messages;
  }
  
  /**
   * Simulate a dice roll for a player
   * @param playerIndex The index of the player making the roll
   * @param stat The stat being used for the roll (e.g., "luck", "health")
   * @param gameState The current game state
   */
  public simulateDiceRoll(
    playerIndex: number,
    stat: string,
    gameState: any
  ): { value: number; modifier: number; total: number; result: string } {
    // Get the player's stat value
    const statValue = gameState.playerInventories[playerIndex]?.[stat.toLowerCase()] || 5;
    
    // Calculate the modifier based on the stat
    const modifier = Math.floor(statValue / 2) - 5;
    
    // Roll the dice
    const diceValue = rollDice();
    const total = diceValue + modifier;
    
    // Check the result
    const result = checkSuccess(total);
    
    // Track the roll in game state
    gameState.rolls = gameState.rolls || [];
    gameState.rolls.push({
      playerIndex,
      stat,
      value: diceValue,
      modifier,
      total,
      result
    });
    
    return {
      value: diceValue,
      modifier,
      total,
      result
    };
  }
}
