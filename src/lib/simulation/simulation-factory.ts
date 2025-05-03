
import { SimulationConfig, SimulationResult } from "@/types";
import { SimulationOrchestrator } from "./core/SimulationOrchestrator";

/**
 * Factory for creating and managing simulation instances
 */
class SimulationFactory {
  private simulationOrchestrator: SimulationOrchestrator;
  
  constructor() {
    this.simulationOrchestrator = new SimulationOrchestrator();
  }
  
  /**
   * Start a new simulation with the given configuration
   */
  public async startSimulation(
    config: SimulationConfig,
    rulesContent: string
  ): Promise<SimulationResult> {
    return this.simulationOrchestrator.runSimulation(config, rulesContent);
  }
}

// Export a singleton instance
export const simulationFactory = new SimulationFactory();

// Export the main function for backward compatibility
export const startSimulation = (
  config: SimulationConfig,
  rulesContent: string
): Promise<SimulationResult> => {
  return simulationFactory.startSimulation(config, rulesContent);
};
