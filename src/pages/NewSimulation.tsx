import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { startSimulation, getExampleRules } from "@/lib/api";
import { SimulationConfig } from "@/types";
import { toast } from "@/components/ui/sonner";
import { PLAYER_CHARACTER_CARDS } from "@/lib/cards/player-character-cards";
import CharacterSelector from "@/components/simulation/CharacterSelector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  const runSimulation = async () => {
    try {
      setIsLoading(true);
      
      // Load rules content (try localStorage first, fall back to example rules)
      const savedRules = localStorage.getItem("flomanji-rules");
      const rulesContent = savedRules || getExampleRules();

      // Check if OpenRouter API key is set
      if (!localStorage.getItem("openrouter-api-key")) {
        toast.error("Please set your OpenRouter API key in Settings first");
        setIsLoading(false);
        return;
      }

      // Add selected characters to the config
      const simulationConfig = {
        ...config,
        characters: selectedCharacters.length > 0 
          ? selectedCharacters.map(id => PLAYER_CHARACTER_CARDS.find(char => char.id === id))
          : undefined
      };

      // Validate the number of characters matches the number of players
      if (selectedCharacters.length > 0 && selectedCharacters.length !== config.players) {
        // Adjust players count to match selected characters
        simulationConfig.players = selectedCharacters.length;
        toast.info(`Adjusted number of players to match selected characters (${selectedCharacters.length})`);
      }
      
      // Start the simulation
      const result = await startSimulation(simulationConfig, rulesContent);
      setIsLoading(false);
      
      // Navigate to the simulation details page
      toast.success("Simulation completed successfully");
      navigate(`/simulations/${result.id}`);
    } catch (error) {
      console.error("Simulation failed:", error);
      toast.error(`Simulation failed: ${error}`);
      setIsLoading(false);
    }
  };

  const missionTemplates = [
    {
      name: "Everglades Escape",
      description: "Escape the Everglades before a hurricane hits. Navigate through swamp regions while avoiding dangerous wildlife and rising Heat.",
      startingHeat: 3,
      missionType: "escape"
    },
    {
      name: "Arcade Quest",
      description: "Find the legendary Video Game Arcade hidden somewhere in the city. Navigate urban regions while managing Weirdness and avoiding Night Stalkers.",
      startingHeat: 2,
      missionType: "exploration"
    },
    {
      name: "Gator-Aid on I-95",
      description: "A tanker has spilled on I-95, creating mutant gators. Collect antidote samples from Highway regions while escorting survivors to safety.",
      startingHeat: 4,
      missionType: "escort"
    }
  ];

  const applyTemplate = (index: number) => {
    const template = missionTemplates[index];
    setConfig(prev => ({
      ...prev,
      scenarioPrompt: template.description,
      startingHeat: template.startingHeat,
      missionType: template.missionType as any
    }));
  };

  const maxCharactersAllowed = config.players || 4;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">New Simulation</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Mission Templates</CardTitle>
          <CardDescription>
            Quick-start with a pre-configured mission template
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {missionTemplates.map((template, index) => (
            <Card key={index} className="cursor-pointer hover:bg-accent/50 transition-colors" onClick={() => applyTemplate(index)}>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">{template.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground">{template.description}</p>
                <div className="mt-2">
                  <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                    Starting Heat: {template.startingHeat}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
      
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
            
            <TabsContent value="basic" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="scenario">Scenario Prompt</Label>
                <Textarea 
                  id="scenario"
                  value={config.scenarioPrompt}
                  onChange={(e) => handleInputChange("scenarioPrompt", e.target.value)}
                  placeholder="Describe the scenario or starting situation..."
                  className="min-h-[100px]"
                />
                <p className="text-sm text-muted-foreground">
                  Describe the initial scenario, setting, or specific test case you want to simulate.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="rounds">Number of Rounds: {config.rounds}</Label>
                  <Slider
                    id="rounds"
                    defaultValue={[config.rounds]}
                    min={1}
                    max={10}
                    step={1}
                    onValueChange={(value) => handleInputChange("rounds", value[0])}
                  />
                  <p className="text-sm text-muted-foreground">
                    How many interaction rounds to simulate (1-10).
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="players">Number of Players: {config.players}</Label>
                  <Slider
                    id="players"
                    defaultValue={[config.players]}
                    min={1}
                    max={4}
                    step={1}
                    onValueChange={(value) => {
                      handleInputChange("players", value[0]);
                      // Trim excess characters if player count decreases
                      if (selectedCharacters.length > value[0]) {
                        setSelectedCharacters(prev => prev.slice(0, value[0]));
                      }
                    }}
                  />
                  <p className="text-sm text-muted-foreground">
                    How many AI player characters to simulate (1-4).
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="startingHeat">Starting Heat: {config.startingHeat || 0}</Label>
                  <Slider
                    id="startingHeat"
                    defaultValue={[config.startingHeat || 0]}
                    min={0}
                    max={8}
                    step={1}
                    onValueChange={(value) => handleInputChange("startingHeat", value[0])}
                  />
                  <p className="text-sm text-muted-foreground">
                    Set the initial Heat level (0-8). Higher values create more urgency.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="missionType">Mission Type</Label>
                  <Select 
                    value={config.missionType as string} 
                    onValueChange={(value) => handleInputChange("missionType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select mission type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="exploration">Exploration</SelectItem>
                      <SelectItem value="escape">Escape</SelectItem>
                      <SelectItem value="escort">Escort</SelectItem>
                      <SelectItem value="collection">Collection</SelectItem>
                      <SelectItem value="boss">Boss Fight</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    The primary mission objective type.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="characters" className="space-y-6">
              <CharacterSelector
                selectedCharacters={selectedCharacters}
                onCharacterSelect={handleCharacterSelect}
                onCharacterDeselect={handleCharacterDeselect}
                maxCharacters={maxCharactersAllowed}
              />
            </TabsContent>
            
            <TabsContent value="advanced" className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="critic">Enable Critic</Label>
                  <p className="text-sm text-muted-foreground">
                    Include AI critic feedback at the end of the simulation.
                  </p>
                </div>
                <Switch
                  id="critic"
                  checked={config.enableCritic}
                  onCheckedChange={(checked) => handleInputChange("enableCritic", checked)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="outputMode">Output Mode</Label>
                <Select 
                  value={config.outputMode as string} 
                  onValueChange={(value) => handleInputChange("outputMode", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select output mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">Full (Complete dialogue)</SelectItem>
                    <SelectItem value="narrative-only">Narrative Only (GM summarizes)</SelectItem>
                    <SelectItem value="minimal">Minimal (Core outcomes only)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  How detailed you want the simulation output to be.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="optionalModules">Optional Modules</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="secretTraitor"
                      checked={config.secretTraitor}
                      onCheckedChange={(checked) => handleInputChange("secretTraitor", checked)}
                    />
                    <Label htmlFor="secretTraitor" className="cursor-pointer">Secret Traitor</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="arcadeModule"
                      checked={config.arcadeModule}
                      onCheckedChange={(checked) => handleInputChange("arcadeModule", checked)}
                    />
                    <Label htmlFor="arcadeModule" className="cursor-pointer">Video Game Arcade</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="nightmareDifficulty"
                      checked={config.nightmareDifficulty}
                      onCheckedChange={(checked) => handleInputChange("nightmareDifficulty", checked)}
                    />
                    <Label htmlFor="nightmareDifficulty" className="cursor-pointer">Nightmare Difficulty</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="competitiveMode"
                      checked={config.competitiveMode}
                      onCheckedChange={(checked) => handleInputChange("competitiveMode", checked)}
                    />
                    <Label htmlFor="competitiveMode" className="cursor-pointer">Competitive Mode</Label>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Optional game modules that modify gameplay mechanics.
                </p>
              </div>
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
