
import { SimulationResult, TrainingExample, KeyDecisionPoint } from "@/types";

/**
 * Processes critic feedback into structured data for training examples
 */
export class CriticFeedbackProcessor {
  /**
   * Process critic feedback from a simulation result
   */
  public processCriticFeedback(simulation: SimulationResult): {
    gameLogicImprovements: TrainingExample[],
    keyDecisionPoints: KeyDecisionPoint[]
  } {
    if (!simulation.criticFeedback) {
      return {
        gameLogicImprovements: [],
        keyDecisionPoints: []
      };
    }
    
    // Extract game logic improvements
    const gameLogicImprovements = this.extractGameLogicImprovements(simulation);
    
    // Identify key decision points from critic feedback
    const keyDecisionPoints = this.identifyKeyDecisionPoints(simulation);
    
    return {
      gameLogicImprovements,
      keyDecisionPoints
    };
  }
  
  /**
   * Extract game logic improvement examples from critic feedback
   */
  private extractGameLogicImprovements(simulation: SimulationResult): TrainingExample[] {
    const examples: TrainingExample[] = [];
    const criticFeedback = simulation.criticFeedback || "";
    
    // Regular expressions to find rule critique segments
    const ruleCritiques = this.extractRuleCritiques(criticFeedback);
    
    // Generate training examples for each rule critique
    ruleCritiques.forEach((critique, index) => {
      examples.push({
        id: `game-logic-${simulation.id}-${index}`,
        type: 'game-logic-improvement',
        context: {
          previousMessages: simulation.log.slice(0, 5), // Context from start of game
          gameState: simulation.gameState,
          currentRound: 0, // Logic improvements are game-wide, not round-specific
          characters: simulation.characters || [],
          heat: simulation.gameState?.heat || 0
        },
        expectedOutput: {
          content: critique.suggestion,
          metadata: {
            ruleArea: critique.ruleArea,
            currentImplementation: critique.currentRule,
            suggestedChange: critique.suggestion,
            reasoning: critique.reasoning,
            version: simulation.timestamp
          }
        },
        feedbackSignals: {
          consistency: 0.8, // Default values
          engagement: 0.7,
          advancement: 0.9
        },
        historicalContext: {
          previousVersions: [], // Would be populated in a real implementation
          ruleDescription: critique.currentRule,
          changeReasoning: critique.reasoning
        }
      });
    });
    
    return examples;
  }
  
  /**
   * Extract rule critiques from critic feedback text
   */
  private extractRuleCritiques(criticFeedback: string): {
    ruleArea: string,
    currentRule: string,
    suggestion: string,
    reasoning: string
  }[] {
    // This is a placeholder implementation
    // In a real implementation, this would use NLP or structured feedback
    const critiques: {
      ruleArea: string,
      currentRule: string,
      suggestion: string,
      reasoning: string
    }[] = [];
    
    // Check if feedback contains rule critiques
    if (criticFeedback.includes("rule") || 
        criticFeedback.includes("mechanic") || 
        criticFeedback.includes("gameplay")) {
      
      // Simple implementation: split by paragraphs and look for keywords
      const paragraphs = criticFeedback.split("\n\n");
      
      for (const paragraph of paragraphs) {
        if (paragraph.toLowerCase().includes("rule") || 
            paragraph.toLowerCase().includes("mechanic") || 
            paragraph.toLowerCase().includes("gameplay")) {
          
          critiques.push({
            ruleArea: this.inferRuleArea(paragraph),
            currentRule: "Current implementation not specified in critique",
            suggestion: paragraph,
            reasoning: "Extracted from critic feedback"
          });
        }
      }
    }
    
    return critiques;
  }
  
  /**
   * Infer rule area from critique text
   */
  private inferRuleArea(text: string): string {
    if (text.includes("heat") || text.includes("temperature")) return "Heat Mechanics";
    if (text.includes("weirdness")) return "Weirdness Mechanics";
    if (text.includes("objective") || text.includes("mission")) return "Mission Objectives";
    if (text.includes("character") || text.includes("stat")) return "Character Mechanics";
    if (text.includes("combat") || text.includes("attack")) return "Combat System";
    if (text.includes("move") || text.includes("region")) return "Movement System";
    return "General Game Rules";
  }
  
  /**
   * Identify key decision points from critic feedback
   */
  private identifyKeyDecisionPoints(simulation: SimulationResult): KeyDecisionPoint[] {
    const keyPoints: KeyDecisionPoint[] = [];
    
    // Placeholder implementation
    // In a real implementation, this would analyze the critic feedback
    // and the game log to identify pivotal decision points
    
    return keyPoints;
  }
}
