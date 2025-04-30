
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import MissionRulesDisplay from "./MissionRulesDisplay";
import ConfigWarningsAlert from "./ConfigWarningsAlert";
import MissionSelectionGrid from "./MissionSelectionGrid";
import MissionConfigTab from "./tabs/MissionConfigTab";
import CharacterConfigTab from "./tabs/CharacterConfigTab";
import AdvancedConfigTab from "./tabs/AdvancedConfigTab";
import { getAllMissionAnalytics } from "@/lib/mission-analytics";
import { SimulationConfig } from "@/types";
import { MISSION_CARDS } from "@/lib/cards/mission-cards";

interface SimulationConfigPanelProps {
  selectedMission: any;
  setSelectedMission: (m: any) => void;
  config: SimulationConfig;
  selectedCharacters: string[];
  handleInputChange: (field: keyof SimulationConfig, value: any) => void;
  handlePlayerCountChange: (value: number) => void;
  handleCharacterSelect: (characterId: string) => void;
  handleCharacterDeselect: (characterId: string) => void;
  validationErrors: string[];
  isLoading: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  maxCharacters: number;
  handleStartSimulation: () => void;
}

/**
 * Component for configuring simulation parameters
 */
const SimulationConfigPanel: React.FC<SimulationConfigPanelProps> = ({
  selectedMission,
  setSelectedMission,
  config,
  selectedCharacters,
  handleInputChange,
  handlePlayerCountChange,
  handleCharacterSelect,
  handleCharacterDeselect,
  validationErrors,
  isLoading,
  activeTab,
  setActiveTab,
  maxCharacters,
  handleStartSimulation
}) => {
  return (
    <>
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
                  <MissionConfigTab
                    config={config}
                    onConfigChange={handleInputChange}
                    onPlayerCountChange={handlePlayerCountChange}
                    selectedMission={selectedMission}
                  />
                </TabsContent>

                <TabsContent value="characters">
                  <CharacterConfigTab
                    selectedCharacters={selectedCharacters}
                    onCharacterSelect={handleCharacterSelect}
                    onCharacterDeselect={handleCharacterDeselect}
                    maxCharacters={maxCharacters}
                  />
                </TabsContent>

                <TabsContent value="advanced">
                  <AdvancedConfigTab
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
    </>
  );
};

export default SimulationConfigPanel;
