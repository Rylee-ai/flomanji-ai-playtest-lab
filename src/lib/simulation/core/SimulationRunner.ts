
/**
 * LEGACY CLASS - KEPT FOR BACKWARDS COMPATIBILITY
 * This class now delegates to the new SimulationOrchestrator
 */

import { SimulationConfig, SimulationResult } from "@/types";
import { SimulationOrchestrator } from "./SimulationOrchestrator";
import { logCardOperation } from "@/utils/error-handling/cardErrorHandler";

/**
 * Legacy wrapper for the new SimulationOrchestrator
 * This class exists solely for backwards compatibility
 */
export class SimulationRunner {
  private orchestrator: SimulationOrchestrator;

  constructor() {
    console.warn("SimulationRunner is deprecated. Use SimulationOrchestrator directly.");
    this.orchestrator = new SimulationOrchestrator();
    logCardOperation("SimulationRunner instantiated (deprecated)", { timestamp: new Date() });
  }

  /**
   * Delegates to the new SimulationOrchestrator
   */
  public async runSimulation(
    config: SimulationConfig,
    rulesContent: string
  ): Promise<SimulationResult> {
    logCardOperation("SimulationRunner.runSimulation called", { 
      missionId: config.missionId,
      characters: config.characters // Fixed: Use characters array instead of characterId
    });
    
    try {
      return await this.orchestrator.runSimulation(config, rulesContent);
    } catch (error) {
      console.error("Error in SimulationRunner:", error);
      throw error;
    }
  }
}
