
import React, { useState, useEffect, useCallback } from "react";
import { SimulationConfig } from "@/types";
import { MISSION_CARDS } from "@/lib/cards/mission-cards";
import { applyMissionScaling, validatePlayerCountForMission } from "@/lib/simulation/mission-validator";
import { toast } from "sonner";

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

const SimulationValidationManager: React.FC<SimulationValidationManagerProps> = ({
  isLoading,
  onStartSimulation,
  children,
}) => {
  const [selectedMission, setSelectedMission] = useState(MISSION_CARDS[0]);
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);
  const [config, setConfig] = useState<SimulationConfig>({
    scenarioPrompt: "",
    rounds: 5,
    players: 2,
    enableCritic: true,
    outputMode: "full",
    startingHeat: selectedMission?.startingHeat || 2,
    missionType: "exploration"
  });
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  useEffect(() => {
    if (selectedMission) {
      const scaledConfig = applyMissionScaling(
        { ...config, scenarioPrompt: selectedMission.hook },
        selectedMission
      );
      setConfig(scaledConfig);
      validateConfiguration(scaledConfig);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMission]);

  useEffect(() => {
    validateConfiguration(config);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.players, config.missionType]);
  
  const validateConfiguration = useCallback((configToValidate: SimulationConfig) => {
    const errors: string[] = [];
    if (selectedMission) {
      const playerValidation = validatePlayerCountForMission(
        configToValidate.players || 2, 
        selectedMission
      );
      if (!playerValidation.valid && playerValidation.message) {
        errors.push(playerValidation.message);
      }
    }
    if (selectedCharacters.length > (configToValidate.players || 2)) {
      errors.push(`Too many characters selected. Please select at most ${configToValidate.players} characters.`);
    }
    setValidationErrors(errors);
  }, [selectedCharacters.length, selectedMission]);

  const handleInputChange = useCallback((field: keyof SimulationConfig, value: any) => {
    if (field === "players") {
      if (value === 1 && config.missionType !== "solo") {
        setConfig(prev => ({
          ...prev,
          players: 1,
          missionType: "solo"
        }));
        if (selectedCharacters.length > 1)
          setSelectedCharacters(prev => prev.slice(0, 1));
      } else if (value > 1 && config.missionType === "solo") {
        setConfig(prev => ({
          ...prev,
          players: value,
          missionType: "exploration"
        }));
      } else {
        setConfig(prev => ({ ...prev, [field]: value }));
      }
    } else if (field === "missionType") {
      if (value === "solo") {
        setConfig(prev => ({
          ...prev,
          missionType: "solo",
          players: 1
        }));
        if (selectedCharacters.length > 1)
          setSelectedCharacters(prev => prev.slice(0, 1));
      } else if (config.players === 1 && config.missionType === "solo") {
        setConfig(prev => ({
          ...prev,
          missionType: value,
          players: 2
        }));
      } else {
        setConfig(prev => ({ ...prev, [field]: value }));
      }
    } else {
      setConfig(prev => ({ ...prev, [field]: value }));
    }
  }, [config.missionType, config.players, selectedCharacters.length]);

  const handleCharacterSelect = (characterId: string) => {
    if (config.players === 1) {
      setSelectedCharacters([characterId]);
    } else {
      if (selectedCharacters.length < (config.players || 2)) {
        setSelectedCharacters(prev => [...prev, characterId]);
      } else {
        toast.error(`Maximum ${config.players} characters allowed`);
      }
    }
  };

  const handleCharacterDeselect = (characterId: string) => {
    setSelectedCharacters(prev => prev.filter(id => id !== characterId));
  };

  const handlePlayerCountChange = (value: number) => {
    handleInputChange("players", value);
    if (selectedCharacters.length > value) {
      setSelectedCharacters(prev => prev.slice(0, value));
    }
  };

  const handleStartSimulation = () => {
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
  };

  return (
    <>
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

export default SimulationValidationManager;

