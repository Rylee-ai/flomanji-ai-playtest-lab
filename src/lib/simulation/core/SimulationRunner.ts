
/**
 * LEGACY CLASS - KEPT FOR BACKWARDS COMPATIBILITY
 * This class now delegates to the new SimulationOrchestrator
 */

import { SimulationConfig, SimulationResult } from "@/types";
import { SimulationOrchestrator } from "./SimulationOrchestrator";
import { log } from "@/utils/logging";

/**
 * Legacy wrapper for the new SimulationOrchestrator
 * This class exists solely for backwards compatibility
 */
export class SimulationRunner {
  private orchestrator: SimulationOrchestrator;

  constructor() {
    console.warn("SimulationRunner is deprecated. Use SimulationOrchestrator directly.");
    this.orchestrator = new SimulationOrchestrator();
    log.warn("SimulationRunner instantiated (deprecated)", { timestamp: new Date() });
  }

  /**
   * Delegates to the new SimulationOrchestrator
   */
  public async runSimulation(
    config: SimulationConfig,
    rulesContent: string
  ): Promise<SimulationResult> {
    log.info("SimulationRunner.runSimulation called", { 
      missionId: config.missionId,
      characters: config.characters 
    });
    
    try {
      return await this.orchestrator.runSimulation(config, rulesContent);
    } catch (error) {
      log.error("Error in SimulationRunner:", error);
      throw error;
    }
  }
}
