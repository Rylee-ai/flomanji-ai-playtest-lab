
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { startSimulation, getExampleRules } from "@/lib/api";
import { SimulationConfig } from "@/types";
import { toast } from "@/components/ui/sonner";
import { PLAYER_CHARACTER_CARDS } from "@/lib/cards/player-character-cards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CharacterSelector from "@/components/simulation/CharacterSelector";
import MissionTemplates from "@/components/simulation/MissionTemplates";
import BasicSettings from "@/components/simulation/BasicSettings";
import AdvancedSettings from "@/components/simulation/AdvancedSettings";

const NewSimulation = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);
  const [config, setConfig] = useState<SimulationConfig>({
    scenarioPrompt: "The players have arrived at an abandoned gas station during a heavy rainstorm. Their objective is to find a map leading to the video game arcade, which requires exploring several regions while surviving rising Heat levels and various hazards.",
    rounds: 5,
    players: 2,
    enableCritic: true,
    outputMode: "full",
    startingHeat: 2,
    missionType: "exploration"
  });

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

  const handleTemplateSelect = (template: any) => {
    setConfig(prev => ({
      ...prev,
      scenarioPrompt: template.description,
      startingHeat: template.startingHeat,
      missionType: template.missionType
    }));
  };

  const runSimulation = async () => {
    try {
      setIsLoading(true);
      
      const savedRules = localStorage.getItem("flomanji-rules");
      const rulesContent = savedRules || getExampleRules();

      if (!localStorage.getItem("openrouter-api-key")) {
        toast.error("Please set your OpenRouter API key in Settings first");
        setIsLoading(false);
        return;
      }

      const simulationConfig = {
        ...config,
        characters: selectedCharacters.length > 0 
          ? selectedCharacters.map(id => PLAYER_CHARACTER_CARDS.find(char => char.id === id))
          : undefined
      };

      if (selectedCharacters.length > 0 && selectedCharacters.length !== config.players) {
        simulationConfig.players = selectedCharacters.length;
        toast.info(`Adjusted number of players to match selected characters (${selectedCharacters.length})`);
      }
      
      const result = await startSimulation(simulationConfig, rulesContent);
      setIsLoading(false);
      
      toast.success("Simulation completed successfully");
      navigate(`/simulations/${result.id}`);
    } catch (error) {
      console.error("Simulation failed:", error);
      toast.error(`Simulation failed: ${error}`);
      setIsLoading(false);
    }
  };

  const maxCharactersAllowed = config.players || 4;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">New Simulation</h1>
      </div>
      
      <MissionTemplates onTemplateSelect={handleTemplateSelect} />
      
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
              <TabsTrigger value="basic">Basic Settings</TabsTrigger>
              <TabsTrigger value="characters">Character Assignment</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic">
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
                maxCharacters={maxCharactersAllowed}
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
          <Button onClick={runSimulation} disabled={isLoading || !config.scenarioPrompt}>
            {isLoading ? "Running Simulation..." : "Start Simulation"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NewSimulation;
