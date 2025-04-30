
import React from 'react';
import { toast } from 'sonner';

interface CharacterValidationManagerProps {
  selectedCharacters: string[];
  setSelectedCharacters: React.Dispatch<React.SetStateAction<string[]>>;
  maxCharacters: number;
}

/**
 * Hook that manages character selection validation and logic
 */
export const useCharacterValidation = ({
  selectedCharacters,
  setSelectedCharacters,
  maxCharacters
}: CharacterValidationManagerProps) => {
  const handleCharacterSelect = React.useCallback((characterId: string) => {
    if (maxCharacters === 1) {
      setSelectedCharacters([characterId]);
    } else {
      if (selectedCharacters.length < maxCharacters) {
        setSelectedCharacters(prev => [...prev, characterId]);
      } else {
        toast.error(`Maximum ${maxCharacters} characters allowed`);
      }
    }
  }, [maxCharacters, selectedCharacters.length, setSelectedCharacters]);

  const handleCharacterDeselect = React.useCallback((characterId: string) => {
    setSelectedCharacters(prev => prev.filter(id => id !== characterId));
  }, [setSelectedCharacters]);

  const handlePlayerCountChange = React.useCallback((value: number) => {
    if (selectedCharacters.length > value) {
      setSelectedCharacters(prev => prev.slice(0, value));
    }
    return value;
  }, [selectedCharacters.length, setSelectedCharacters]);

  return {
    handleCharacterSelect,
    handleCharacterDeselect,
    handlePlayerCountChange
  };
};

/**
 * Component wrapper for character validation
 */
const CharacterValidationManager: React.FC<CharacterValidationManagerProps & {
  onCharacterSelect: (id: string) => void;
  onCharacterDeselect: (id: string) => void;
}> = ({
  selectedCharacters,
  setSelectedCharacters,
  maxCharacters,
  onCharacterSelect,
  onCharacterDeselect
}) => {
  const validation = useCharacterValidation({
    selectedCharacters,
    setSelectedCharacters,
    maxCharacters
  });
  
  // Connect external handlers to validation logic
  React.useEffect(() => {
    onCharacterSelect = validation.handleCharacterSelect;
    onCharacterDeselect = validation.handleCharacterDeselect;
  }, [onCharacterSelect, onCharacterDeselect, validation]);
  
  // This component doesn't render anything
  return null;
};

export default CharacterValidationManager;
