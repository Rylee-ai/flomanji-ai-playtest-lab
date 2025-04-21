import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MISSION_CARDS } from "@/lib/cards/mission-cards";
import MissionRulesDisplay from "./MissionRulesDisplay";
import BasicSettings from "./BasicSettings";
import CharacterSelector from "./CharacterSelector";
import AdvancedSettings from "./AdvancedSettings";
import { SimulationConfig } from "@/types";
import { toast } from "sonner";
import { getAllMissionAnalytics } from "@/lib/mission-analytics";
import { applyMissionScaling, validatePlayerCountForMission } from "@/lib/simulation/mission-validator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import MissionSelectionGrid from "./MissionSelectionGrid";
import ConfigWarningsAlert from "./ConfigWarningsAlert";
import SimulationConfigTabPane from "./SimulationConfigTabPane";

interface SimulationSetupProps {
  onStartSimulation: (config: SimulationConfig) => void;
  isLoading: boolean;
}

const SimulationSetup: React.FC<SimulationSetupProps> = ({ onStartSimulation, isLoading }) => {
  const [selectedMission, setSelectedMission] = useState(MISSION_CARDS[0]);
  const [activeTab, setActiveTab] = useState("mission");
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
      const scaledConfig = applyMissionScaling({
        ...config,
        scenarioPrompt: selectedMission.hook,
      }, selectedMission);
      
      setConfig(scaledConfig);
      
      validateConfiguration(scaledConfig);
    }
  }, [selectedMission]);
  
  useEffect(() => {
    validateConfiguration(config);
  }, [config.players, config.missionType]);
  
  const validateConfiguration = (configToValidate: SimulationConfig) => {
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
  };

  const handleInputChange = (field: keyof SimulationConfig, value: any) => {
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
  };

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
    const playersSelected = selectedCharacters.length;
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

  const missionAnalytics = getAllMissionAnalytics();

  const isDisabled = isLoading;

  return (
    <div className={`space-y-6 ${isDisabled ? "pointer-events-none opacity-60" : ""}`}>
      <MissionSelectionGrid
        missions={MISSION_CARDS}
        selectedMission={selectedMission}
        onMissionSelect={setSelectedMission}
        missionAnalytics={getAllMissionAnalytics()}
      />
      {selectedMission && (
        <>
          <MissionRulesDisplay mission={selectedMission} />
          <ConfigWarningsAlert validationErrors={validationErrors} />
          <SimulationConfigTabPane
            config={config}
            onConfigChange={handleInputChange}
            onPlayerCountChange={handlePlayerCountChange}
            selectedMission={selectedMission}
            selectedCharacters={selectedCharacters}
            onCharacterSelect={handleCharacterSelect}
            onCharacterDeselect={handleCharacterDeselect}
            isLoading={isLoading}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            maxCharacters={config.players || 6}
            handleStartSimulation={handleStartSimulation}
          />
        </>
      )}
    </div>
  );
};

export default SimulationSetup;
