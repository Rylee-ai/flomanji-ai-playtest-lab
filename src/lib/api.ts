
import { SimulationConfig, AgentMessage, SimulationResult } from "@/types";
import { startSimulation } from "./simulationRunner";
import { getExampleRules } from "./rules-loader";
import { getSimulationSummaries, getSimulationById, updateSimulationAnnotations, saveSimulationResult } from "@/lib/storage";

/**
 * Exported API utilities for simulation modules.
 * - startSimulation: Runs a simulation and returns results
 * - getExampleRules: Loads rules content (from localStorage or default)
 * - Storage and annotation utilities: getSimulationSummaries, getSimulationById, updateSimulationAnnotations, saveSimulationResult
 */

export {
  startSimulation,
  getExampleRules,
  getSimulationSummaries,
  getSimulationById,
  updateSimulationAnnotations,
  saveSimulationResult,
};

// Mock implementation of startSimulation for testing/development
export const mockStartSimulation = async (
  config: SimulationConfig,
  rulesContent: string
): Promise<SimulationResult> => {
  // This is a placeholder implementation for testing
  console.log("Starting mock simulation with config:", config);
  console.log("Using rules content:", rulesContent);
  
  // For now, return a mock result with all required fields
  const mockResult: SimulationResult = {
    id: `sim-${Date.now()}`,
    timestamp: new Date().toISOString(),
    scenario: config.scenarioPrompt || "Unnamed Simulation", // Fixed property name
    rounds: config.rounds || 10,
    playerCount: config.players || 2, // Added missing property
    log: [
      { 
        role: "GM", 
        content: "Simulation started", 
        timestamp: new Date().toISOString() 
      },
      { 
        role: "Player 1", 
        content: "Example simulation log entry", 
        timestamp: new Date().toISOString() 
      }
    ],
    criticFeedback: "", // Added missing property
    annotations: "",
    missionOutcome: "pending",
    keyEvents: []
  };
  
  return mockResult;
};
