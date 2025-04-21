
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import MissionRulesDisplay from "./MissionRulesDisplay";
import BasicSettings from "./BasicSettings";
import CharacterSelector from "./CharacterSelector";
import AdvancedSettings from "./AdvancedSettings";
import { SimulationConfig } from "@/types";

interface SimulationConfigTabPaneProps {
  config: SimulationConfig;
  onConfigChange: (field: keyof SimulationConfig, value: any) => void;
  onPlayerCountChange: (value: number) => void;
  selectedMission: any;
  selectedCharacters: string[];
  onCharacterSelect: (characterId: string) => void;
  onCharacterDeselect: (characterId: string) => void;
  isLoading: boolean;
  activeTab: string;
  setActiveTab: (v: string) => void;
  maxCharacters: number;
  handleStartSimulation: () => void;
}

const SimulationConfigTabPane: React.FC<SimulationConfigTabPaneProps> = ({
  config,
  onConfigChange,
  onPlayerCountChange,
  selectedMission,
  selectedCharacters,
  onCharacterSelect,
  onCharacterDeselect,
  isLoading,
  activeTab,
  setActiveTab,
  maxCharacters,
  handleStartSimulation,
}) => {
  return (
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
              onConfigChange={onConfigChange}
              onPlayerCountChange={onPlayerCountChange}
              selectedMission={selectedMission}
            />
          </TabsContent>

          <TabsContent value="characters">
            <CharacterSelector
              selectedCharacters={selectedCharacters}
              onCharacterSelect={onCharacterSelect}
              onCharacterDeselect={onCharacterDeselect}
              maxCharacters={maxCharacters}
            />
          </TabsContent>

          <TabsContent value="advanced">
            <AdvancedSettings
              config={config}
              onConfigChange={onConfigChange}
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
  );
};

export default SimulationConfigTabPane;
