
import { SimulationConfig, SimulationResult } from "@/types";
import { startSimulation } from "./simulation/simulation-runner";
import { getExampleRules } from "./rules-loader";
import { getSimulationSummaries, getSimulationById, updateSimulationAnnotations, saveSimulationResult } from "./storage";

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
