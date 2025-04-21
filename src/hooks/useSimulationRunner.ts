
import { useState, useCallback } from "react";
import { SimulationConfig } from "@/types";
import { startSimulation, getExampleRules } from "@/lib/api";
import { toast } from "sonner";
import { recordMissionRun } from "@/lib/mission-analytics";
import { PLAYER_CHARACTER_CARDS } from "@/lib/cards/player-character-cards";
import { MISSION_CARDS } from "@/lib/cards/mission-cards";

/**
 * Hook for running a simulation and tracking its state/results.
 * Provides real-time access to status and results for the simulation.
 */
export function useSimulationRunner() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [latestSimulationId, setLatestSimulationId] = useState<string | null>(null);
  const [latestResult, setLatestResult] = useState<any>(null);

  // Full typed wrapper to run simulations and store result
  const runSimulation = useCallback(
    async (config: SimulationConfig) => {
      try {
        setIsLoading(true);
        setIsFinished(false);
        setLatestSimulationId(null);
        setLatestResult(null);

        const savedRules = localStorage.getItem("flomanji-rules");
        const rulesContent = savedRules || getExampleRules();

        if (!localStorage.getItem("openrouter-api-key")) {
          toast.error("Please set your OpenRouter API key in Settings first");
          setIsLoading(false);
          setIsFinished(false);
          return;
        }

        // Consistent character setup
        if (config.characters && config.characters.length > 0) {
          const selectedCharacterCards = config.characters
            .map(id =>
              PLAYER_CHARACTER_CARDS.find(card => card.id === id)
            )
            .filter(Boolean);

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
              luck: Math.ceil(statTotal / 2),
              starterGear: [...(card.starterGear || [])]
            }
          });

          const selectedMission = config.missionId 
            ? MISSION_CARDS.find(m => m.id === config.missionId)
            : null;
          
          const simulationConfig = { 
            ...config, 
            fullCharacters,
            extractionRegion: config.extractionRegion || selectedMission?.extractionRegion || "exit",
            objectives: selectedMission?.objectives || []
          };

          // Run the simulation!
          const result = await startSimulation(simulationConfig, rulesContent);
          setLatestResult(result);

          // Analytics/recording
          if (config.missionId) {
            const runData = {
              id: result.id,
              timestamp: result.timestamp,
              missionId: config.missionId,
              completed: result.missionOutcome === "success",
              objectivesCompleted: result.keyEvents?.filter((e: any) => e.description.includes("objective")).map((e: any) => e.description) || [],
              rounds: result.rounds,
              characters: config.characters,
              finalHeatLevel: config.startingHeat || 0,
              keyEvents: result.keyEvents?.map((e: any) => ({
                round: e.round,
                event: e.description,
                impact: e.description
              })) || []
            };

            recordMissionRun(runData);
          }

          setIsLoading(false);
          setIsFinished(true);
          setLatestSimulationId(result.id);

          toast.success("Simulation completed successfully");
        } else {
          toast.error("No characters selected");
          setIsLoading(false);
          setIsFinished(false);
        }
      } catch (error) {
        console.error("Simulation failed:", error);
        toast.error(`Simulation failed: ${error}`);
        setIsLoading(false);
        setIsFinished(false);
      }
    },
    []
  );

  // Results handler
  const goToResults = (navigate: (url: string) => void) => {
    if (latestSimulationId) {
      navigate(`/simulations/${latestSimulationId}`);
    }
  };

  // Expose status, handy events, and all raw result data
  return {
    runSimulation,
    isLoading,
    isFinished,
    latestSimulationId,
    goToResults,
    latestResult,
    setIsFinished, // For custom "View Results" UX pattern
  };
}
