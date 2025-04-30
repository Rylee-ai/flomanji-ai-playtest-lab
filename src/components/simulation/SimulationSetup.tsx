
import React, { useState } from "react";
import SimulationValidationManager from "./SimulationValidationManager";
import SimulationConfigPanel from "./SimulationConfigPanel";

interface SimulationSetupProps {
  onStartSimulation: (config: any) => void;
  isLoading: boolean;
}

/**
 * Component for setting up simulation parameters
 */
const SimulationSetup: React.FC<SimulationSetupProps> = ({ onStartSimulation, isLoading }) => {
  const [activeTab, setActiveTab] = useState("mission");
  
  return (
    <SimulationValidationManager
      isLoading={isLoading}
      onStartSimulation={onStartSimulation}
    >
      {({
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
        handleStartSimulation
      }) => (
        <div className={`space-y-6 ${isLoading ? "pointer-events-none opacity-60" : ""}`}>
          <SimulationConfigPanel
            selectedMission={selectedMission}
            setSelectedMission={setSelectedMission}
            config={config}
            selectedCharacters={selectedCharacters}
            handleInputChange={handleInputChange}
            handlePlayerCountChange={handlePlayerCountChange}
            handleCharacterSelect={handleCharacterSelect}
            handleCharacterDeselect={handleCharacterDeselect}
            validationErrors={validationErrors}
            isLoading={isLoading}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            maxCharacters={config.players || 6}
            handleStartSimulation={handleStartSimulation}
          />
        </div>
      )}
    </SimulationValidationManager>
  );
};

export default SimulationSetup;
