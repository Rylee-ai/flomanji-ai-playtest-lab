
import { SimulationConfig, AgentMessage } from "@/types";
import { createChatCompletion } from "@/lib/openrouterChat";
import { simulateDiceRoll } from "../game-mechanics";

/**
 * Manages player actions and turns within the simulation
 */
export class PlayerManager {
  /**
   * Gets the number of players in the simulation
   */
  public getPlayerCount(config: SimulationConfig): number {
    return config.fullCharacters?.length || config.players || 1;
  }
  
  /**
   * Processes all player turns for the current round
   */
  public async processPlayerTurns(
    config: SimulationConfig,
    gameState: any,
    conversationLog: AgentMessage[],
    playerSystemPrompts: string[]
  ): Promise<AgentMessage[]> {
    const playerResponses: AgentMessage[] = [];
    const actualPlayerCount = this.getPlayerCount(config);

    for (let playerIdx = 0; playerIdx < actualPlayerCount; playerIdx++) {
      console.log(`Processing player ${playerIdx + 1}'s turn`);
      
      gameState.currentGobletHolder = playerIdx;
      
      const playerResponse = await this.processPlayerTurn(
        playerIdx,
        playerSystemPrompts[playerIdx],
        gameState,
        conversationLog
      );
      
      playerResponses.push(playerResponse);
    }
    
    return playerResponses;
  }
  
  /**
   * Processes a single player's turn
   */
  private async processPlayerTurn(
    playerIdx: number,
    playerSystemPrompt: string,
    gameState: any,
    conversationLog: AgentMessage[]
  ): Promise<AgentMessage> {
    const playerMessages = conversationLog.map(entry => {
      const cleanContent = entry.content.replace(/^(GM|Player \d+): /g, '');
      return {
        role: entry.role === 'Player' ? 'assistant' : 'user',
        content: entry.role === 'Player' 
          ? `Player ${entry.playerIndex !== undefined ? entry.playerIndex + 1 : ''}: ${cleanContent}`
          : `GM: ${cleanContent}`
      };
    });
    
    const playerStatePrompt = this.generatePlayerStatePrompt(playerIdx, gameState);
    
    playerMessages.push({ 
      role: 'user', 
      content: playerStatePrompt 
    });

    const playerResponse = await createChatCompletion(
      playerSystemPrompt,
      playerMessages
    );

    const cleanPlayerResponse = playerResponse.replace(/^(Player \d+): /g, '');
    const rollResult = this.detectAndProcessRolls(cleanPlayerResponse, playerIdx, gameState);
    
    return {
      role: 'Player',
      content: cleanPlayerResponse,
      playerIndex: playerIdx,
      timestamp: new Date().toISOString(),
      metadata: {
        roundNumber: gameState.currentRound,
        phase: "player-action",
        playerNumber: playerIdx + 1,
        playerName: gameState.characters?.[playerIdx]?.name || `Player ${playerIdx+1}`,
        roll: rollResult,
        inventory: gameState.playerInventories[playerIdx],
        gameState: {...gameState},
        isGobletHolder: true
      }
    };
  }
  
  /**
   * Generates a prompt describing the player's current state
   */
  private generatePlayerStatePrompt(playerIdx: number, gameState: any): string {
    return `
    [System Information - Your Current State]
    - Health: ${gameState.playerInventories[playerIdx]?.health || 5}
    - Weirdness: ${gameState.playerInventories[playerIdx]?.weirdness || 0}
    - Luck: ${gameState.playerInventories[playerIdx]?.luck || 3}
    - Gear: ${gameState.playerInventories[playerIdx]?.gear.join(", ") || "None"}
    - Treasures: ${gameState.playerInventories[playerIdx]?.treasures.join(", ") || "None"}
    
    The Flomanji Goblet has been passed to you - it's your turn! You have 2 actions from: Move, Use Gear, Interact, Team-Up, Rest, or Mission.
    If responding to a hazard, clearly state if you choose to Fight, Flee, Negotiate, or Outsmart it.
    Please make your decision and specify which stats you will use for any necessary checks. To roll dice, say you are "shaking the Goblet" to determine the outcome.`;
  }
  
  /**
   * Detects and processes dice rolls in player response
   */
  private detectAndProcessRolls(
    playerResponse: string, 
    playerIdx: number, 
    gameState: any
  ): any {
    const rollPatterns = [
      /roll(?:s|ing)?\s+(?:for)?\s*(\w+)/i,
      /(\w+)\s+(?:check|roll|test)/i,
      /check(?:s|ing)?\s+(?:with)?\s*(\w+)/i,
      /test(?:s|ing)?\s+(?:with)?\s*(\w+)/i
    ];
    
    let statName = "";
    let statValue = 0;
    
    for (const pattern of rollPatterns) {
      const match = playerResponse.match(pattern);
      if (match && match[1]) {
        statName = match[1].toLowerCase();
        if (statName.includes("brawn") || statName === "strength") {
          statName = "brawn";
          statValue = gameState.characters?.[playerIdx]?.stats.brawn || 0;
        } else if (statName.includes("moxie") || statName === "agility") {
          statName = "moxie";
          statValue = gameState.characters?.[playerIdx]?.stats.moxie || 0;
        } else if (statName.includes("charm") || statName === "social") {
          statName = "charm";
          statValue = gameState.characters?.[playerIdx]?.stats.charm || 0;
        } else if (statName.includes("grit") || statName === "endurance") {
          statName = "grit";
          statValue = gameState.characters?.[playerIdx]?.stats.grit || 0;
        } else if (statName.includes("weird") || statName === "sense") {
          statName = "weirdSense";
          statValue = gameState.characters?.[playerIdx]?.stats.weirdSense || 0;
        }
        
        if (statName) {
          const rollResult = simulateDiceRoll(statValue);
          gameState.rolls.push({
            player: playerIdx + 1,
            type: "action",
            value: rollResult.value,
            stat: statName,
            result: rollResult.result
          });
          
          return {
            stat: statName,
            value: rollResult.value,
            modifier: statValue,
            total: rollResult.value + statValue,
            result: rollResult.result
          };
        }
      }
    }
    
    return undefined;
  }
}
