
import { SimulationResult } from "@/types";
import { getSimulationSummaries, getSimulationById } from "@/lib/storage";
import { TrainingDataExporter } from "./TrainingDataExporter";

/**
 * Service to facilitate training data collection and pipeline integration
 */
export class TrainingDataPipeline {
  private exporter: TrainingDataExporter;
  
  constructor() {
    this.exporter = new TrainingDataExporter();
  }
  
  /**
   * Get all available training data from local storage
   */
  public async getAllTrainingData(format: 'json' | 'jsonl' | 'csv' = 'json'): Promise<string> {
    console.log("Collecting all available training data...");
    
    try {
      // Get all simulation summaries
      const summaries = getSimulationSummaries();
      console.log(`Found ${summaries.length} simulations`);
      
      // Load full data for each simulation
      const simulations: SimulationResult[] = [];
      
      for (const summary of summaries) {
        const simulation = getSimulationById(summary.id);
        if (simulation) {
          simulations.push(simulation);
        }
      }
      
      console.log(`Loaded ${simulations.length} simulation results`);
      
      // Filter simulations that have training data
      const simulationsWithTrainingData = simulations.filter(sim => sim.trainingData);
      console.log(`Found ${simulationsWithTrainingData.length} simulations with training data`);
      
      // Export all training data in batch
      return this.exporter.exportBatch(simulationsWithTrainingData, format);
    } catch (error) {
      console.error("Error collecting training data:", error);
      throw new Error(`Failed to collect training data: ${error.message}`);
    }
  }
  
  /**
   * Get training data for specific simulation IDs
   */
  public async getTrainingDataForSimulations(
    simulationIds: string[],
    format: 'json' | 'jsonl' | 'csv' = 'json'
  ): Promise<string> {
    console.log(`Collecting training data for ${simulationIds.length} simulations...`);
    
    try {
      const simulations: SimulationResult[] = [];
      
      for (const id of simulationIds) {
        const simulation = getSimulationById(id);
        if (simulation && simulation.trainingData) {
          simulations.push(simulation);
        }
      }
      
      console.log(`Loaded ${simulations.length} simulations with training data`);
      
      // Export training data in batch
      return this.exporter.exportBatch(simulations, format);
    } catch (error) {
      console.error("Error collecting training data for specific simulations:", error);
      throw new Error(`Failed to collect training data: ${error.message}`);
    }
  }
  
  /**
   * Upload training data to an MCP server endpoint
   */
  public async uploadToMcpServer(
    endpoint: string,
    apiKey: string,
    format: 'json' | 'jsonl' | 'csv' = 'jsonl',
    simulationIds?: string[]
  ): Promise<{ success: boolean, message: string }> {
    try {
      // Get training data
      const trainingData = simulationIds 
        ? await this.getTrainingDataForSimulations(simulationIds, format)
        : await this.getAllTrainingData(format);
      
      // Upload to MCP server
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': format === 'csv' ? 'text/csv' : 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: trainingData
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Upload failed');
      }
      
      const data = await response.json();
      return {
        success: true,
        message: data.message || 'Training data uploaded successfully'
      };
    } catch (error) {
      console.error("Error uploading training data to MCP server:", error);
      return {
        success: false,
        message: `Upload failed: ${error.message}`
      };
    }
  }
}
