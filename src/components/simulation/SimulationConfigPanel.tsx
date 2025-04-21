
import React from "react";
import MissionSelectionGrid from "./MissionSelectionGrid";
import MissionRulesDisplay from "./MissionRulesDisplay";
import ConfigWarningsAlert from "./ConfigWarningsAlert";
import SimulationConfigTabPane from "./SimulationConfigTabPane";
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
            maxCharacters={maxCharacters}
            handleStartSimulation={handleStartSimulation}
          />
        </>
      )}
    </>
  );
};

export default SimulationConfigPanel;
