
import { useState, useCallback } from "react";
import { SimulationConfig } from "@/types";
import { startSimulation, getExampleRules } from "@/lib/api";
import { toast } from "sonner";
import { recordMissionRun } from "@/lib/mission-analytics";
import { PLAYER_CHARACTER_CARDS } from "@/lib/cards/player-character-cards";
import { MISSION_CARDS } from "@/lib/cards/mission-cards";
import { clearOpenRouterCache } from "@/lib/openrouterCache";
import { showErrorToast, showInfoToast, showSuccessToast } from "@/lib/toast";
import { logCardOperation, formatCardError } from "@/utils/error-handling/cardErrorHandler";

/**
 * Hook for running a simulation and tracking its state/results.
 * Provides real-time access to status and results for the simulation.
 */
export function useSimulationRunner() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [latestSimulationId, setLatestSimulationId] = useState<string | null>(null);
  const [latestResult, setLatestResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentConfig, setCurrentConfig] = useState<SimulationConfig | null>(null);

  // Clear error state when starting a new simulation
  const clearErrorState = () => {
    setError(null);
  };

  // Reset the OpenRouter cache and try a different model
  const retryWithDifferentModel = useCallback(async () => {
    if (!currentConfig) {
      showErrorToast("No previous configuration found to retry");
      return;
    }
    
    // Clear any cached model/API key to force a refresh
    clearOpenRouterCache();
    
    logCardOperation("Retrying simulation with different model", {
      config: {
        missionId: currentConfig.missionId,
        players: currentConfig.players,
        characterCount: currentConfig.characters?.length
      }
    });
    
    // Clear errors
    clearErrorState();
    
    // Run the simulation again with the same config
    await runSimulation(currentConfig);
  }, [currentConfig]);

  // Full typed wrapper to run simulations and store result
  const runSimulation = useCallback(
    async (config: SimulationConfig) => {
      try {
        logCardOperation("Starting simulation", {
          missionId: config.missionId,
          players: config.players,
          characterCount: config.characters?.length
        });
        
        setIsLoading(true);
        setIsFinished(false);
        setLatestSimulationId(null);
        setLatestResult(null);
        setError(null);
        setCurrentConfig(config); // Save config for potential retries

        const savedRules = localStorage.getItem("flomanji-rules");
        const rulesContent = savedRules || getExampleRules();

        if (!localStorage.getItem("openrouter-api-key")) {
          showErrorToast("Please set your OpenRouter API key in Settings first");
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
              starterGear: card.starterGear ? card.starterGear.map(gear => 
                typeof gear === 'string' ? gear : gear.name
              ) : []
            }
          });

          const selectedMission = config.missionId 
            ? MISSION_CARDS.find(m => m.id === config.missionId)
            : null;
          
          const simulationConfig: SimulationConfig = { 
            ...config, 
            fullCharacters,
            extractionRegion: config.extractionRegion || selectedMission?.extractionRegion || "exit",
            objectives: selectedMission?.objectives || []
          };

          try {
            // Run the simulation!
            showInfoToast("Running simulation...");
            logCardOperation("Executing simulation", { 
              missionId: simulationConfig.missionId,
              characterCount: simulationConfig.fullCharacters?.length
            });
            
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
              logCardOperation("Simulation recorded", { 
                simulationId: result.id,
                missionId: config.missionId,
                success: result.missionOutcome === "success"
              });
            }

            setIsLoading(false);
            setIsFinished(true);
            setLatestSimulationId(result.id);

            showSuccessToast("Simulation completed successfully");
          } catch (error) {
            const formattedError = formatCardError(error, "simulation execution");
            console.error("Simulation failed:", formattedError);
            setError(formattedError.message);
            setIsLoading(false);
            setIsFinished(false);
            showErrorToast("Simulation failed", formattedError.message);
            logCardOperation("Simulation execution failed", { error: formattedError });
          }
        } else {
          showErrorToast("No characters selected");
          setIsLoading(false);
          setIsFinished(false);
        }
      } catch (error) {
        const formattedError = formatCardError(error, "simulation setup");
        console.error("Simulation failed:", formattedError);
        setError(formattedError.message);
        setIsLoading(false);
        setIsFinished(false);
        showErrorToast("Simulation failed", formattedError.message);
        logCardOperation("Simulation setup failed", { error: formattedError });
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
    error,
    retryWithDifferentModel,
    clearErrorState,
    setIsFinished, // For custom "View Results" UX pattern
  };
}
