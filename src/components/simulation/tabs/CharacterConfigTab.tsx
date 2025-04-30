
import React from 'react';
import CharacterSelector from '../CharacterSelector';

interface CharacterConfigTabProps {
  selectedCharacters: string[];
  onCharacterSelect: (characterId: string) => void;
  onCharacterDeselect: (characterId: string) => void;
  maxCharacters: number;
}

/**
 * Tab for character selection and configuration
 */
const CharacterConfigTab: React.FC<CharacterConfigTabProps> = ({
  selectedCharacters,
  onCharacterSelect,
  onCharacterDeselect,
  maxCharacters
}) => {
  return (
    <CharacterSelector
      selectedCharacters={selectedCharacters}
      onCharacterSelect={onCharacterSelect}
      onCharacterDeselect={onCharacterDeselect}
      maxCharacters={maxCharacters}
    />
  );
};

export default CharacterConfigTab;
