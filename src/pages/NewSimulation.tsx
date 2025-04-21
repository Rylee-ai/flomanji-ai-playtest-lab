
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { startSimulation, getExampleRules } from "@/lib/api";
import { SimulationConfig } from "@/types";
import { toast } from "sonner";
import { PLAYER_CHARACTER_CARDS } from "@/lib/cards/player-character-cards";
import SimulationSetup from "@/components/simulation/SimulationSetup";
import { recordMissionRun } from "@/lib/mission-analytics";

const NewSimulation = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const runSimulation = async (config: SimulationConfig) => {
    try {
      setIsLoading(true);
      
      const savedRules = localStorage.getItem("flomanji-rules");
      const rulesContent = savedRules || getExampleRules();

      if (!localStorage.getItem("openrouter-api-key")) {
        toast.error("Please set your OpenRouter API key in Settings first");
        setIsLoading(false);
        return;
      }

      // Create a copy of the config to avoid modifying the original
      const simulationConfig = { ...config };
      
      // Run the simulation
      const result = await startSimulation(simulationConfig, rulesContent);
      
      // Record mission run if a mission ID was provided
      if (config.missionId) {
        // Create minimal run data from simulation result
        const runData = {
          id: result.id,
          timestamp: result.timestamp,
          missionId: config.missionId,
          completed: result.missionOutcome === 'success',
          objectivesCompleted: result.keyEvents?.filter(e => e.description.includes('objective')).map(e => e.description) || [],
          rounds: result.rounds,
          characters: config.characters || [],
          finalHeatLevel: config.startingHeat || 0, // This is an approximation since we don't track heat in the result yet
          keyEvents: result.keyEvents?.map(e => ({
            round: e.round,
            event: e.description,
            impact: e.description
          })) || []
        };
        
        // Record the run
        recordMissionRun(runData);
      }
      
      setIsLoading(false);
      
      toast.success("Simulation completed successfully");
      navigate(`/simulations/${result.id}`);
    } catch (error) {
      console.error("Simulation failed:", error);
      toast.error(`Simulation failed: ${error}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">New Simulation</h1>
      </div>
      
      <SimulationSetup 
        onStartSimulation={runSimulation}
        isLoading={isLoading}
      />
    </div>
  );
};

export default NewSimulation;
