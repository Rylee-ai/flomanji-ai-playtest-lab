
import { SimulationResult } from "@/types";

// Local storage keys
const SIMULATIONS_STORAGE_KEY = "flomanji:simulations";

// Save simulation result to storage
export const saveSimulationResult = (result: SimulationResult) => {
  try {
    const existingSimulations = JSON.parse(localStorage.getItem(SIMULATIONS_STORAGE_KEY) || "[]");
    existingSimulations.unshift(result);
    localStorage.setItem(SIMULATIONS_STORAGE_KEY, JSON.stringify(existingSimulations));
  } catch (error) {
    console.error("Failed to save simulation result:", error);
  }
};

// Get simulation summaries
export const getSimulationSummaries = () => {
  try {
    const simulations = JSON.parse(localStorage.getItem(SIMULATIONS_STORAGE_KEY) || "[]");
    return simulations.map((sim: SimulationResult) => ({
      id: sim.id,
      timestamp: sim.timestamp,
      scenario: sim.scenario,
      rounds: sim.rounds,
      result: sim.log.slice(-1)[0]?.message.substring(0, 100) + "...",
      notes: sim.annotations
    }));
  } catch (error) {
    console.error("Failed to get simulation summaries:", error);
    return [];
  }
};

// Get a specific simulation by ID
export const getSimulationById = (id: string): SimulationResult | null => {
  try {
    const simulations = JSON.parse(localStorage.getItem(SIMULATIONS_STORAGE_KEY) || "[]");
    const simulation = simulations.find((sim: SimulationResult) => sim.id === id);
    return simulation || null;
  } catch (error) {
    console.error("Failed to get simulation by ID:", error);
    return null;
  }
};

// Update annotations for a simulation
export const updateSimulationAnnotations = (id: string, annotations: string): boolean => {
  try {
    const simulations = JSON.parse(localStorage.getItem(SIMULATIONS_STORAGE_KEY) || "[]");
    const index = simulations.findIndex((sim: SimulationResult) => sim.id === id);
    
    if (index !== -1) {
      simulations[index].annotations = annotations;
      localStorage.setItem(SIMULATIONS_STORAGE_KEY, JSON.stringify(simulations));
      return true;
    }
    
    return false;
  } catch (error) {
    console.error("Failed to update simulation annotations:", error);
    return false;
  }
};
