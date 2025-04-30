
import React, { useState, useEffect, useCallback } from "react";
import { SimulationConfig } from "@/types";
import { MISSION_CARDS } from "@/lib/cards/mission-cards";
import { toast } from "sonner";
import ValidationRules from "./validation/ValidationRules";
import ConfigValidation from "./validation/ConfigValidation";
import { ValidationProvider, useValidation } from "./validation/ValidationContext";

interface SimulationValidationManagerProps {
  isLoading: boolean;
  onStartSimulation: (config: SimulationConfig) => void;
  children: (props: {
    selectedMission: any;
    setSelectedMission: (m: any) => void;
    config: SimulationConfig;
    setConfig: React.Dispatch<React.SetStateAction<SimulationConfig>>;
    selectedCharacters: string[];
    setSelectedCharacters: React.Dispatch<React.SetStateAction<string[]>>;
    validationErrors: string[];
    handleInputChange: (field: keyof SimulationConfig, value: any) => void;
    handlePlayerCountChange: (value: number) => void;
    handleCharacterSelect: (characterId: string) => void;
    handleCharacterDeselect: (characterId: string) => void;
    handleStartSimulation: () => void;
  }) => React.ReactNode;
}

/**
 * Inner component that uses the validation context
 */
const ValidationManagerInner: React.FC<SimulationValidationManagerProps> = ({
  isLoading,
  onStartSimulation,
  children
}) => {
  const [selectedMission, setSelectedMission] = useState(MISSION_CARDS[0]);
  
  const {
    config,
    setConfig,
    selectedCharacters,
    setSelectedCharacters,
    validationErrors,
    setValidationErrors,
    handleInputChange,
    handlePlayerCountChange,
    handleCharacterSelect,
    handleCharacterDeselect
  } = useValidation();

  const handleStartSimulation = useCallback(() => {
    const simulationConfig: SimulationConfig = {
      ...config,
      missionId: selectedMission.id,
      characters: selectedCharacters,
      missionType: config.players === 1 ? "solo" : config.missionType,
      extractionRegion: selectedMission.extractionRegion
    };

    if (!selectedMission) {
      toast.error("Please select a mission");
      return;
    }
    if (selectedCharacters.length === 0) {
      toast.error("Please select at least one character");
      return;
    }
    if (selectedCharacters.length !== config.players) {
      if (selectedCharacters.length < config.players) {
        toast.error(`Please select ${config.players} characters`);
        return;
      }
      simulationConfig.players = selectedCharacters.length;
    }
    if (validationErrors.length > 0) {
      toast.warning("There are configuration warnings. Check your setup before proceeding.");
    }

    onStartSimulation(simulationConfig);
  }, [config, selectedCharacters, selectedMission, validationErrors, onStartSimulation]);

  // Render validation components
  return (
    <>
      <ValidationRules
        config={config}
        selectedMission={selectedMission}
        selectedCharacters={selectedCharacters}
        onValidationComplete={setValidationErrors}
      />
      
      <ConfigValidation
        config={config}
        setConfig={setConfig}
        selectedMission={selectedMission}
      />
      
      {children({
        selectedMission,
        setSelectedMission,
        config,
        setConfig,
        selectedCharacters,
        setSelectedCharacters,
        validationErrors,
        handleInputChange,
        handlePlayerCountChange,
        handleCharacterSelect,
        handleCharacterDeselect,
        handleStartSimulation,
      })}
    </>
  );
};

/**
 * Main validation manager component with provider
 */
const SimulationValidationManager: React.FC<SimulationValidationManagerProps> = (props) => {
  const initialConfig: SimulationConfig = {
    scenarioPrompt: "",
    rounds: 5,
    players: 2,
    enableCritic: true,
    outputMode: "full",
    startingHeat: 2,
    missionType: "exploration"
  };

  return (
    <ValidationProvider initialConfig={initialConfig}>
      <ValidationManagerInner {...props} />
    </ValidationProvider>
  );
};

export default SimulationValidationManager;
