
import { SimulationResult, SimulationTrainingData } from "@/types";

/**
 * Utility for exporting training data in various formats
 */
export class TrainingDataExporter {
  
  /**
   * Export training data to JSON format
   */
  public exportToJson(simulation: SimulationResult): string {
    if (!simulation.trainingData) {
      throw new Error("No training data available for this simulation");
    }
    
    return JSON.stringify(simulation.trainingData, null, 2);
  }
  
  /**
   * Export training data in JSONL format for easy fine-tuning
   */
  public exportToJsonl(simulation: SimulationResult): string {
    if (!simulation.trainingData) {
      throw new Error("No training data available for this simulation");
    }
    
    const jsonlLines: string[] = [];
    
    // Convert each example to a JSONL format appropriate for fine-tuning
    simulation.trainingData.examples.forEach(example => {
      // Format context into a user prompt
      const contextMessages = example.context.previousMessages
        .map(m => `${m.role}: ${m.content}`)
        .join('\n');
      
      // Create a jsonl entry
      const jsonlEntry = {
        messages: [
          {
            role: "system",
            content: this.generateSystemPrompt(example.type, simulation)
          },
          {
            role: "user",
            content: `Game state: Round ${example.context.currentRound}, Heat: ${example.context.heat}\n\n${contextMessages}`
          },
          {
            role: "assistant",
            content: example.expectedOutput.content
          }
        ]
      };
      
      jsonlLines.push(JSON.stringify(jsonlEntry));
    });
    
    return jsonlLines.join('\n');
  }
  
  /**
   * Export training data to CSV format (for some tools or analysis)
   */
  public exportToCsv(simulation: SimulationResult): string {
    if (!simulation.trainingData) {
      throw new Error("No training data available for this simulation");
    }
    
    // CSV Header
    const csvLines = ['id,type,context_length,output_length,round,heat'];
    
    // CSV Data rows
    simulation.trainingData.examples.forEach(example => {
      const contextLength = example.context.previousMessages.length;
      const outputLength = example.expectedOutput.content.length;
      
      csvLines.push([
        example.id,
        example.type,
        contextLength,
        outputLength,
        example.context.currentRound,
        example.context.heat
      ].join(','));
    });
    
    return csvLines.join('\n');
  }
  
  /**
   * Generate a relevant system prompt based on the example type
   */
  private generateSystemPrompt(exampleType: string, simulation: SimulationResult): string {
    switch (exampleType) {
      case 'gm-response':
        return "You are the Game Master (Goblet) for the tabletop game Flomanji. Your role is to narrate the game, describe environments, control NPCs, and respond to player actions according to the game rules.";
        
      case 'player-action':
        return "You are a player character in the Flomanji tabletop game. Based on the game state and previous conversation, respond with an appropriate in-character action.";
        
      case 'hazard-encounter':
        return "You are the Game Master (Goblet) for Flomanji. Generate a hazard encounter appropriate for the current game state, following the game's rules for hazard difficulty and effects.";
        
      case 'objective-completion':
        return "You are the Game Master (Goblet) for Flomanji. Describe the completion of a mission objective, including any rewards, consequences, and changes to the game state.";
        
      default:
        return "You are an AI assistant helping with the Flomanji tabletop game simulation.";
    }
  }
  
  /**
   * Export all training data from multiple simulations in batch
   */
  public exportBatch(simulations: SimulationResult[], format: 'json' | 'jsonl' | 'csv'): string {
    switch (format) {
      case 'json':
        return JSON.stringify(
          simulations
            .filter(sim => sim.trainingData)
            .map(sim => sim.trainingData),
          null, 
          2
        );
        
      case 'jsonl':
        return simulations
          .filter(sim => sim.trainingData)
          .map(sim => this.exportToJsonl(sim))
          .join('\n');
          
      case 'csv':
        const csvHeaders = 'simulation_id,example_id,type,context_length,output_length,round,heat\n';
        const csvRows = simulations
          .filter(sim => sim.trainingData)
          .flatMap(sim => {
            return sim.trainingData.examples.map(ex => {
              return `${sim.id},${ex.id},${ex.type},${ex.context.previousMessages.length},${ex.expectedOutput.content.length},${ex.context.currentRound},${ex.context.heat}`;
            });
          })
          .join('\n');
        
        return csvHeaders + csvRows;
        
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
  }
}
