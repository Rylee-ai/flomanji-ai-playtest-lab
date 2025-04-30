
import React from 'react';
import { SimulationConfig } from '@/types';
import { applyMissionScaling } from '@/lib/simulation/mission-validator';

interface ConfigValidationProps {
  config: SimulationConfig;
  setConfig: React.Dispatch<React.SetStateAction<SimulationConfig>>;
  selectedMission: any;
}

/**
 * Component for validating and updating simulation configuration
 */
const ConfigValidation: React.FC<ConfigValidationProps> = ({
  config,
  setConfig,
  selectedMission
}) => {
  // Apply mission scaling when mission changes
  React.useEffect(() => {
    if (selectedMission) {
      const scaledConfig = applyMissionScaling(
        { ...config, scenarioPrompt: selectedMission.hook },
        selectedMission
      );
      setConfig(scaledConfig);
    }
  }, [selectedMission, config, setConfig]);

  // This component doesn't render anything
  return null;
};

export default ConfigValidation;
