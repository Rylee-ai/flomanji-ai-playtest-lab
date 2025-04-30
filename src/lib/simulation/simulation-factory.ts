
import { SimulationConfig, SimulationResult } from "@/types";
import { SimulationRunner } from "./core/SimulationRunner";

/**
 * Factory for creating and managing simulation instances
 */
class SimulationFactory {
  private simulationRunner: SimulationRunner;
  
  constructor() {
    this.simulationRunner = new SimulationRunner();
  }
  
  /**
   * Start a new simulation with the given configuration
   */
  public async startSimulation(
    config: SimulationConfig,
    rulesContent: string
  ): Promise<SimulationResult> {
    return this.simulationRunner.runSimulation(config, rulesContent);
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
