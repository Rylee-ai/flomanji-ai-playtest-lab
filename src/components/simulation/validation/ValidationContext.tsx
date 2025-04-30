
import React, { createContext, useContext, useState, useCallback } from 'react';
import { SimulationConfig } from '@/types';
import { useCharacterValidation } from './CharacterValidationManager';

interface ValidationContextType {
  validationErrors: string[];
  setValidationErrors: React.Dispatch<React.SetStateAction<string[]>>;
  handleInputChange: (field: keyof SimulationConfig, value: any) => void;
  config: SimulationConfig;
  setConfig: React.Dispatch<React.SetStateAction<SimulationConfig>>;
  selectedCharacters: string[];
  setSelectedCharacters: React.Dispatch<React.SetStateAction<string[]>>;
  handleCharacterSelect: (characterId: string) => void;
  handleCharacterDeselect: (characterId: string) => void;
  handlePlayerCountChange: (value: number) => void;
}

const ValidationContext = createContext<ValidationContextType | undefined>(undefined);

/**
 * Provider for simulation validation context
 */
export const ValidationProvider: React.FC<{
  children: React.ReactNode;
  initialConfig: SimulationConfig;
}> = ({ children, initialConfig }) => {
  const [config, setConfig] = useState<SimulationConfig>(initialConfig);
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  
  const {
    handleCharacterSelect,
    handleCharacterDeselect,
    handlePlayerCountChange: baseHandlePlayerCountChange
  } = useCharacterValidation({
    selectedCharacters,
    setSelectedCharacters,
    maxCharacters: config.players || 2
  });

  const handleInputChange = useCallback((field: keyof SimulationConfig, value: any) => {
    if (field === "players") {
      if (value === 1 && config.missionType !== "solo") {
        setConfig(prev => ({
          ...prev,
          players: 1,
          missionType: "solo"
        }));
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
  }, [config.missionType, config.players]);

  const handlePlayerCountChange = useCallback((value: number) => {
    const newValue = baseHandlePlayerCountChange(value);
    handleInputChange("players", newValue);
  }, [baseHandlePlayerCountChange, handleInputChange]);

  const value = {
    validationErrors,
    setValidationErrors,
    handleInputChange,
    config,
    setConfig,
    selectedCharacters,
    setSelectedCharacters,
    handleCharacterSelect,
    handleCharacterDeselect,
    handlePlayerCountChange
  };

  return (
    <ValidationContext.Provider value={value}>
      {children}
    </ValidationContext.Provider>
  );
};

/**
 * Hook for using the validation context
 */
export const useValidation = (): ValidationContextType => {
  const context = useContext(ValidationContext);
  if (context === undefined) {
    throw new Error("useValidation must be used within a ValidationProvider");
  }
  return context;
};
