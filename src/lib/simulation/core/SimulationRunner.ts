
/**
 * LEGACY CLASS - KEPT FOR BACKWARDS COMPATIBILITY
 * This class now delegates to the new SimulationOrchestrator
 */

import { SimulationConfig, SimulationResult } from "@/types";
import { SimulationOrchestrator } from "./SimulationOrchestrator";

/**
 * Legacy wrapper for the new SimulationOrchestrator
 * This class exists solely for backwards compatibility
 */
export class SimulationRunner {
  private orchestrator: SimulationOrchestrator;

  constructor() {
    console.warn("SimulationRunner is deprecated. Use SimulationOrchestrator directly.");
    this.orchestrator = new SimulationOrchestrator();
  }

  /**
   * Delegates to the new SimulationOrchestrator
   */
  public async runSimulation(
    config: SimulationConfig,
    rulesContent: string
  ): Promise<SimulationResult> {
    return this.orchestrator.runSimulation(config, rulesContent);
  }
}
