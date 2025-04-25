
import { getExampleRules as getExampleRulesImpl } from './rules-loader';
import { getSimulationSummaries as getSimulationSummariesFromStorage, getSimulationById } from './storage';
import { SimulationConfig, SimulationResult } from '@/types';

// Re-export with the same interface
export const getExampleRules = async (): Promise<string> => {
  return getExampleRulesImpl();
};

// Re-export storage functions
export const getSimulationSummaries = () => {
  return getSimulationSummariesFromStorage();
};

// Simulation running functionality
export const startSimulation = async (
  config: SimulationConfig, 
  rulesContent: string
): Promise<SimulationResult> => {
  // This is a placeholder implementation until we have a real API
  console.log("Starting simulation with config:", config);
  console.log("Using rules content:", rulesContent);
  
  // For now, return a mock result
  const mockResult: SimulationResult = {
    id: `sim-${Date.now()}`,
    timestamp: new Date().toISOString(),
    scenario: config.scenario || "Unnamed Simulation",
    rounds: config.rounds || 10,
    log: [
      { role: "GM", content: "Simulation started", timestamp: new Date().toISOString() },
      { role: "Player", content: "Example simulation log entry", timestamp: new Date().toISOString() }
    ],
    annotations: "",
    missionOutcome: "pending",
    keyEvents: []
  };
  
  return mockResult;
};

// Function to get a specific simulation result
export const getSimulationResult = (id: string): SimulationResult | null => {
  return getSimulationById(id);
};

// Add any other API functions here
