
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
  
  // Validation state
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Apply mission settings when a mission is selected
  useEffect(() => {
    if (selectedMission) {
      // Apply mission scaling and configuration
      const scaledConfig = applyMissionScaling({
        ...config,
        scenarioPrompt: selectedMission.hook,
      }, selectedMission);
      
      setConfig(scaledConfig);
      
      // Validate the scaled configuration
      validateConfiguration(scaledConfig);
    }
  }, [selectedMission]);
  
  // Validate configuration whenever it changes
  useEffect(() => {
    validateConfiguration(config);
  }, [config.players, config.missionType]);
  
  // Validate that the current configuration is valid
  const validateConfiguration = (configToValidate: SimulationConfig) => {
    const errors: string[] = [];
    
    // Validate player count for mission
    if (selectedMission) {
      const playerValidation = validatePlayerCountForMission(
        configToValidate.players || 2, 
        selectedMission
      );
      
      if (!playerValidation.valid && playerValidation.message) {
        errors.push(playerValidation.message);
      }
    }
    
    // Check character count matches player count
    if (selectedCharacters.length > (configToValidate.players || 2)) {
      errors.push(`Too many characters selected. Please select at most ${configToValidate.players} characters.`);
    }
    
    // Update validation errors
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
      // Don't exceed the player count
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

    // Validation before starting
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
    
    // Check for validation errors
    if (validationErrors.length > 0) {
      // Show a warning but allow to proceed
      toast.warning("There are configuration warnings. Check your setup before proceeding.");
    }

    onStartSimulation(simulationConfig);
  };

  const missionAnalytics = getAllMissionAnalytics();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {MISSION_CARDS.map((mission) => {
          const analytics = missionAnalytics.find(a => a.missionId === mission.id);
          
          return (
            <Card 
              key={mission.id}
              className={`cursor-pointer hover:bg-accent/50 transition-colors ${
                selectedMission?.id === mission.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedMission(mission)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{mission.name}</CardTitle>
                    <CardDescription>{mission.keywords.join(", ")}</CardDescription>
                  </div>
                  <div className="flex gap-1">
                    {mission.icons?.slice(0, 2).map((icon, i) => (
                      <span key={i} title={icon.meaning}>{icon.symbol}</span>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm line-clamp-2">{mission.hook}</p>
              </CardContent>
              <CardFooter className="pt-0 flex justify-between">
                <div className="text-xs">Heat: {mission.startingHeat}</div>
                <div className="text-xs">
                  Difficulty: {mission.difficultyRating ? `${mission.difficultyRating}/10` : 'N/A'}
                </div>
                {analytics && (
                  <div className="text-xs">
                    Success: {(analytics.aggregateStats.successRate * 100).toFixed(0)}%
                  </div>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
      
      {selectedMission && (
        <>
          <MissionRulesDisplay mission={selectedMission} />
          
          {validationErrors.length > 0 && (
            <Alert variant="warning">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Configuration Warnings</AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-5 mt-2">
                  {validationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
          
          <Card>
            <CardHeader>
              <CardTitle>Simulation Configuration</CardTitle>
              <CardDescription>
                Set up the parameters for your AI-powered playtest session
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="mission">Mission Settings</TabsTrigger>
                  <TabsTrigger value="characters">Character Assignment</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="mission">
                  <BasicSettings 
                    config={config}
                    onConfigChange={handleInputChange}
                    onPlayerCountChange={handlePlayerCountChange}
                    selectedMission={selectedMission}
                  />
                </TabsContent>
                
                <TabsContent value="characters">
                  <CharacterSelector
                    selectedCharacters={selectedCharacters}
                    onCharacterSelect={handleCharacterSelect}
                    onCharacterDeselect={handleCharacterDeselect}
                    maxCharacters={config.players || 6}
                  />
                </TabsContent>
                
                <TabsContent value="advanced">
                  <AdvancedSettings 
                    config={config}
                    onConfigChange={handleInputChange}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button onClick={handleStartSimulation} disabled={isLoading}>
                {isLoading ? "Running Simulation..." : "Start Simulation"}
              </Button>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
};

export default SimulationSetup;
