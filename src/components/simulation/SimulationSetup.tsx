
import React, { useState } from "react";
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

  // Update config when mission changes
  React.useEffect(() => {
    if (selectedMission) {
      setConfig(prev => ({
        ...prev,
        scenarioPrompt: selectedMission.hook,
        startingHeat: selectedMission.startingHeat,
        rounds: selectedMission.estimatedDuration || 5
      }));
    }
  }, [selectedMission]);

  const handleInputChange = (field: keyof SimulationConfig, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleCharacterSelect = (characterId: string) => {
    setSelectedCharacters(prev => [...prev, characterId]);
  };

  const handleCharacterDeselect = (characterId: string) => {
    setSelectedCharacters(prev => prev.filter(id => id !== characterId));
  };

  const handlePlayerCountChange = (value: number) => {
    handleInputChange("players", value);
    // Trim excess characters if player count decreases
    if (selectedCharacters.length > value) {
      setSelectedCharacters(prev => prev.slice(0, value));
    }
  };

  const handleStartSimulation = () => {
    // Set mission ID in config
    const simulationConfig = {
      ...config,
      missionId: selectedMission.id,
      characters: selectedCharacters
    };
    
    // Validate config
    if (!selectedMission) {
      toast.error("Please select a mission");
      return;
    }
    
    if (selectedCharacters.length === 0) {
      toast.error("Please select at least one character");
      return;
    }
    
    // Adjust player count to match character count
    if (selectedCharacters.length !== config.players) {
      simulationConfig.players = selectedCharacters.length;
    }
    
    onStartSimulation(simulationConfig);
  };

  // Get analytics data for missions
  const missionAnalytics = getAllMissionAnalytics();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {MISSION_CARDS.map((mission) => {
          // Find analytics for this mission
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
                  />
                </TabsContent>
                
                <TabsContent value="characters">
                  <CharacterSelector
                    selectedCharacters={selectedCharacters}
                    onCharacterSelect={handleCharacterSelect}
                    onCharacterDeselect={handleCharacterDeselect}
                    maxCharacters={config.players || 4}
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
