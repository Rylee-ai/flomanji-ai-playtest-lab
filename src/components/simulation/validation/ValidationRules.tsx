
import React from 'react';
import { SimulationConfig } from '@/types';
import { validatePlayerCountForMission } from '@/lib/simulation/mission-validator';

interface ValidationRulesProps {
  config: SimulationConfig;
  selectedMission: any;
  selectedCharacters: string[];
  onValidationComplete: (errors: string[]) => void;
}

/**
 * Component responsible for validating simulation configuration
 * and reporting errors
 */
const ValidationRules: React.FC<ValidationRulesProps> = ({
  config,
  selectedMission,
  selectedCharacters,
  onValidationComplete
}) => {
  React.useEffect(() => {
    const errors: string[] = [];
    
    // Validate mission player count
    if (selectedMission) {
      const playerValidation = validatePlayerCountForMission(
        config.players || 2, 
        selectedMission
      );
      if (!playerValidation.valid && playerValidation.message) {
        errors.push(playerValidation.message);
      }
    }
    
    // Validate character selection
    if (selectedCharacters.length > (config.players || 2)) {
      errors.push(`Too many characters selected. Please select at most ${config.players} characters.`);
    }
    
    // Report validation results
    onValidationComplete(errors);
  }, [config, selectedMission, selectedCharacters, onValidationComplete]);
  
  // This component doesn't render anything
  return null;
};

export default ValidationRules;
