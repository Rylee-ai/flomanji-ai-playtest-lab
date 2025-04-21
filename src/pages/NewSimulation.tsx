
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { startSimulation, getExampleRules } from "@/lib/api";
import { SimulationConfig } from "@/types";
import { toast } from "sonner";
import SimulationSetup from "@/components/simulation/SimulationSetup";
import { recordMissionRun } from "@/lib/mission-analytics";
import { PLAYER_CHARACTER_CARDS } from "@/lib/cards/player-character-cards";

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

      // Ensure we're using consistent character data from PLAYER_CHARACTER_CARDS
      if (config.characters && config.characters.length > 0) {
        // Map selected character IDs to full character objects
        const selectedCharacterCards = config.characters.map(id => 
          PLAYER_CHARACTER_CARDS.find(card => card.id === id)
        ).filter(Boolean);
        
        // Create proper FlomanjiCharacters from PlayerCharacterCards
        const fullCharacters = selectedCharacterCards.map(card => ({
          id: card.id,
          name: card.name,
          role: card.role,
          stats: card.stats,
          ability: card.ability,
          health: card.health,
          weirdness: card.weirdness,
          luck: card.luck,
          starterGear: card.starterGear,
        }));
        
        // Update config with complete character information
        const simulationConfig = { ...config, fullCharacters };
        
        // Run the simulation with complete character data
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
            characters: fullCharacters,
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
      } else {
        // If no characters were selected, use the standard simulation approach
        const result = await startSimulation(config, rulesContent);
        
        if (config.missionId) {
          // Similar run data collection as above
          const runData = {
            id: result.id,
            timestamp: result.timestamp,
            missionId: config.missionId,
            completed: result.missionOutcome === 'success',
            objectivesCompleted: result.keyEvents?.filter(e => e.description.includes('objective')).map(e => e.description) || [],
            rounds: result.rounds,
            characters: config.characters || [],
            finalHeatLevel: config.startingHeat || 0,
            keyEvents: result.keyEvents?.map(e => ({
              round: e.round,
              event: e.description,
              impact: e.description
            })) || []
          };
          
          recordMissionRun(runData);
        }
        
        setIsLoading(false);
        toast.success("Simulation completed successfully");
        navigate(`/simulations/${result.id}`);
      }
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
