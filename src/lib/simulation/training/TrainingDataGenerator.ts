import { 
  SimulationResult,
  SimulationTrainingData,
  TrainingExample,
  KeyDecisionPoint,
  AgentMessage
} from "@/types";
import { CriticFeedbackProcessor } from "./CriticFeedbackProcessor";

/**
 * Service that processes simulation results and generates structured training data
 * for machine learning models.
 */
export class TrainingDataGenerator {
  private criticFeedbackProcessor: CriticFeedbackProcessor;
  
  constructor() {
    this.criticFeedbackProcessor = new CriticFeedbackProcessor();
  }
  
  /**
   * Generate training data from a completed simulation result
   */
  public generateTrainingData(simulation: SimulationResult): SimulationTrainingData {
    console.log("Generating training data for simulation:", simulation.id);
    
    // Process critic feedback if available
    const criticFeedback = simulation.criticFeedback ? 
      this.criticFeedbackProcessor.processCriticFeedback(simulation) : 
      { gameLogicImprovements: [], keyDecisionPoints: [] };
    
    // Initialize the training data structure
    const trainingData: SimulationTrainingData = {
      simulationId: simulation.id,
      timestamp: simulation.timestamp,
      missionType: simulation.config?.missionType || "unknown",
      examples: [],
      statistics: {
        successRate: this.calculateSuccessRate(simulation),
        averageRounds: simulation.rounds,
        completedObjectives: simulation.gameState?.completedObjectives || [],
        heatProgression: this.extractHeatProgression(simulation),
        keyDecisionPoints: this.identifyKeyDecisionPoints(simulation)
      }
    };
    
    // Generate different types of training examples
    trainingData.examples = [
      ...this.generateGMResponseExamples(simulation),
      ...this.generatePlayerActionExamples(simulation),
      ...this.generateHazardEncounterExamples(simulation),
      ...this.generateObjectiveCompletionExamples(simulation),
      ...criticFeedback.gameLogicImprovements
    ];
    
    // Include critic-identified key decision points in statistics
    if (criticFeedback.keyDecisionPoints.length > 0) {
      trainingData.statistics.keyDecisionPoints = [
        ...trainingData.statistics.keyDecisionPoints,
        ...criticFeedback.keyDecisionPoints
      ];
    }
    
    console.log(`Generated ${trainingData.examples.length} training examples`);
    
    return trainingData;
  }
  
  /**
   * Calculate the success rate based on mission outcome
   */
  private calculateSuccessRate(simulation: SimulationResult): number {
    if (simulation.missionOutcome === "success") {
      return 1.0;
    } else if (simulation.missionOutcome === "partial") {
      // Calculate based on completed objectives
      const totalObjectives = simulation.config?.objectives?.length || 1;
      const completed = simulation.gameState?.completedObjectives?.length || 0;
      return completed / totalObjectives;
    }
    return 0.0;
  }
  
  /**
   * Extract heat progression throughout the simulation
   */
  private extractHeatProgression(simulation: SimulationResult): number[] {
    const heatProgression: number[] = [];
    
    // Extract heat values from each round
    simulation.log.forEach(message => {
      if (message.metadata?.heat !== undefined && 
          message.metadata?.roundNumber !== undefined && 
          message.metadata.phase === "round-summary") {
        // Ensure we don't duplicate rounds
        if (!heatProgression[message.metadata.roundNumber]) {
          heatProgression[message.metadata.roundNumber] = message.metadata.heat;
        }
      }
    });
    
    // Fill in any gaps and return a clean array
    return heatProgression.filter(h => h !== undefined);
  }
  
  /**
   * Identify key decision points in the simulation
   */
  private identifyKeyDecisionPoints(simulation: SimulationResult): KeyDecisionPoint[] {
    const keyPoints: KeyDecisionPoint[] = [];
    
    // Look for messages that indicate important decisions
    simulation.log.forEach((message, index) => {
      // Skip if not a player message
      if (message.role !== 'Player') {
        return;
      }
      
      // Look for the GM response to this player action
      const nextMessages = simulation.log.slice(index + 1, index + 3);
      const gmResponse = nextMessages.find(m => m.role === 'GM');
      
      if (!gmResponse) {
        return;
      }
      
      // Check for keywords indicating important decisions
      const importantDecisionKeywords = [
        'critical', 'success', 'failure', 'objective', 'completed', 'disaster',
        'treasure', 'artifact', 'goblet', 'luck', 'heat'
      ];
      
      const isImportantDecision = importantDecisionKeywords.some(keyword => 
        gmResponse.content.toLowerCase().includes(keyword)
      );
      
      if (isImportantDecision) {
        const round = message.metadata?.roundNumber || 0;
        
        // Determine the impact based on content analysis
        let impact: 'positive' | 'negative' | 'neutral' = 'neutral';
        
        const positiveKeywords = ['success', 'completed', 'treasure', 'found', 'healed'];
        const negativeKeywords = ['failure', 'disaster', 'damage', 'injured', 'heat increases'];
        
        if (positiveKeywords.some(k => gmResponse.content.toLowerCase().includes(k))) {
          impact = 'positive';
        } else if (negativeKeywords.some(k => gmResponse.content.toLowerCase().includes(k))) {
          impact = 'negative';
        }
        
        keyPoints.push({
          round,
          description: `Round ${round} decision`,
          decision: message.content,
          outcome: gmResponse.content.substring(0, 100) + '...',
          impact
        });
      }
    });
    
    return keyPoints;
  }
  
  /**
   * Generate training examples for GM responses
   */
  private generateGMResponseExamples(simulation: SimulationResult): TrainingExample[] {
    const examples: TrainingExample[] = [];
    
    // Process the conversation log to create input-output pairs
    for (let i = 1; i < simulation.log.length; i++) {
      const currentMessage = simulation.log[i];
      
      // We're looking for GM responses
      if (currentMessage.role !== 'GM' || !currentMessage.metadata) {
        continue;
      }
      
      // Get the context (previous messages)
      const contextMessages = simulation.log.slice(0, i);
      
      // Add historical context if critic feedback is available
      const historicalContext = simulation.criticFeedback ? {
        previousVersions: [],
        ruleDescription: this.extractRelevantRules(currentMessage, simulation),
        changeReasoning: ""
      } : undefined;
      
      // Create a training example
      examples.push({
        id: `gm-response-${simulation.id}-${i}`,
        type: 'gm-response',
        context: {
          previousMessages: contextMessages,
          gameState: currentMessage.metadata.gameState || simulation.gameState,
          currentRound: currentMessage.metadata.roundNumber || 0,
          characters: simulation.characters || [],
          heat: currentMessage.metadata.heat || 0
        },
        expectedOutput: {
          content: currentMessage.content,
          metadata: currentMessage.metadata
        },
        historicalContext
      });
    }
    
    return examples;
  }
  
  /**
   * Generate training examples for player actions
   */
  private generatePlayerActionExamples(simulation: SimulationResult): TrainingExample[] {
    const examples: TrainingExample[] = [];
    
    // Process the conversation log to find player actions
    for (let i = 1; i < simulation.log.length; i++) {
      const currentMessage = simulation.log[i];
      
      // We're looking for Player messages
      if (currentMessage.role !== 'Player' || !currentMessage.metadata) {
        continue;
      }
      
      // Get the context (previous messages)
      const contextMessages = simulation.log.slice(0, i);
      
      // Create a training example
      examples.push({
        id: `player-action-${simulation.id}-${i}`,
        type: 'player-action',
        context: {
          previousMessages: contextMessages,
          gameState: currentMessage.metadata.gameState || simulation.gameState,
          currentRound: currentMessage.metadata.roundNumber || 0,
          characters: simulation.characters || [],
          heat: currentMessage.metadata.heat || 0
        },
        expectedOutput: {
          content: currentMessage.content,
          metadata: currentMessage.metadata
        }
      });
    }
    
    return examples;
  }
  
  /**
   * Generate training examples for hazard encounters
   */
  private generateHazardEncounterExamples(simulation: SimulationResult): TrainingExample[] {
    const examples: TrainingExample[] = [];
    
    // Find messages related to hazard encounters
    for (let i = 0; i < simulation.log.length; i++) {
      const message = simulation.log[i];
      
      if (message.role === 'GM' && 
          message.metadata?.phase === 'hazard-encounter') {
        
        // Get context from previous messages
        const contextMessages = simulation.log.slice(0, i);
        
        examples.push({
          id: `hazard-${simulation.id}-${i}`,
          type: 'hazard-encounter',
          context: {
            previousMessages: contextMessages,
            gameState: message.metadata.gameState || simulation.gameState,
            currentRound: message.metadata.roundNumber || 0,
            characters: simulation.characters || [],
            heat: message.metadata.heat || 0
          },
          expectedOutput: {
            content: message.content,
            metadata: message.metadata
          }
        });
      }
    }
    
    return examples;
  }
  
  /**
   * Generate training examples for objective completions
   */
  private generateObjectiveCompletionExamples(simulation: SimulationResult): TrainingExample[] {
    const examples: TrainingExample[] = [];
    
    // Find messages related to objective completions
    for (let i = 0; i < simulation.log.length; i++) {
      const message = simulation.log[i];
      
      if (message.role === 'GM' && 
          message.content.toLowerCase().includes('objective') &&
          message.content.toLowerCase().includes('complete')) {
        
        // Get context from previous messages
        const contextMessages = simulation.log.slice(0, i);
        
        examples.push({
          id: `objective-${simulation.id}-${i}`,
          type: 'objective-completion',
          context: {
            previousMessages: contextMessages,
            gameState: message.metadata?.gameState || simulation.gameState,
            currentRound: message.metadata?.roundNumber || 0,
            characters: simulation.characters || [],
            heat: message.metadata?.heat || 0
          },
          expectedOutput: {
            content: message.content,
            metadata: message.metadata
          }
        });
      }
    }
    
    return examples;
  }
  
  /**
   * Extract relevant rules for a specific GM response
   */
  private extractRelevantRules(message: AgentMessage, simulation: SimulationResult): string {
    // Placeholder implementation
    // In a real implementation, this would analyze the message content
    // to extract relevant rules that were used in making the response
    
    if (message.content.includes("heat")) {
      return "Heat rules: Heat represents the increasing danger and time pressure of the mission.";
    } else if (message.content.includes("objective")) {
      return "Objective rules: Players must complete required objectives to succeed in the mission.";
    } else if (message.content.includes("rest") || message.content.includes("heal")) {
      return "Rest rules: Characters can rest to recover health points.";
    }
    
    return "General game rules apply.";
  }
}
