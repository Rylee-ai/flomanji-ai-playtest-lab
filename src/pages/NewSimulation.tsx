
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { startSimulation, getExampleRules } from "@/lib/api";
import { SimulationConfig } from "@/types";
import { toast } from "sonner";
import SimulationSetup from "@/components/simulation/SimulationSetup";
import { recordMissionRun } from "@/lib/mission-analytics";
import { PLAYER_CHARACTER_CARDS } from "@/lib/cards/player-character-cards";
import { MISSION_CARDS } from "@/lib/cards/mission-cards";

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

      // Ensure consistent character data from PLAYER_CHARACTER_CARDS
      if (config.characters && config.characters.length > 0) {
        // Grab the actual character cards
        const selectedCharacterCards = config.characters.map(id =>
          PLAYER_CHARACTER_CARDS.find(card => card.id === id)
        ).filter(Boolean);

        // -- Flomanji Rulebook Character Setup: Health, Luck, Gear -----------------------
        //  Health: Use the value defined on card (usually 5), no more than max allowed.
        //  Luck: Sum stats, halve and round up. All stats available since these are player cards.
        //  Gear: Use starterGear as copy (no mutation).
        //  Weirdness: Start at 0, per rulebook.
        // ------------------------------------------------------------------------------
        const fullCharacters = selectedCharacterCards.map(card => {
          const statTotal = Object.values(card.stats).reduce((sum, stat) => sum + Number(stat), 0);
          return {
            id: card.id,
            name: card.name,
            role: card.role,
            stats: card.stats,
            ability: card.ability,
            health: card.health,
            weirdness: 0,
            // Luck is half total stats, rounded up (Players Guide §2.6)
            luck: Math.ceil(statTotal / 2),
            starterGear: [...(card.starterGear || [])]
          }
        });

        // Find the selected mission to get objectives and extraction region
        const selectedMission = config.missionId 
          ? MISSION_CARDS.find(m => m.id === config.missionId)
          : null;
        
        // Build simulation config with full mission and character data
        const simulationConfig = { 
          ...config, 
          fullCharacters,
          // Make sure extraction region is set
          extractionRegion: config.extractionRegion || selectedMission?.extractionRegion || "exit",
          // Include mission objectives for game state
          objectives: selectedMission?.objectives || []
        };

        // Run the simulation
        const result = await startSimulation(simulationConfig, rulesContent);

        // Record mission run if applicable; per MissionRunData, use character IDs only
        if (config.missionId) {
          const runData = {
            id: result.id,
            timestamp: result.timestamp,
            missionId: config.missionId,
            completed: result.missionOutcome === 'success',
            objectivesCompleted: result.keyEvents?.filter(e => e.description.includes('objective')).map(e => e.description) || [],
            rounds: result.rounds,
            // Only IDs for analytics, NOT full objects
            characters: config.characters,
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
      } else {
        toast.error("No characters selected");
        setIsLoading(false);
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
