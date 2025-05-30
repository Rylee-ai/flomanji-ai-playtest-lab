
import { FlomanjiCharacter, CharacterStats, CharacterAbility } from "@/types";
import { PLAYER_CHARACTER_CARDS } from "@/lib/cards/player-character-cards";

// Convert PlayerCharacterCards to FlomanjiCharacters
export const PREDEFINED_CHARACTERS: FlomanjiCharacter[] = PLAYER_CHARACTER_CARDS.map(card => ({
  id: card.id,
  name: card.name,
  role: card.role,
  stats: card.stats,
  ability: card.ability as CharacterAbility,
  health: card.health,
  weirdness: card.weirdness,
  luck: card.luck,
  starterGear: card.starterGear?.map(gear => typeof gear === 'string' ? gear : gear.name) || [],
}));

export const getCharacterById = (id: string): FlomanjiCharacter | undefined => {
  return PREDEFINED_CHARACTERS.find(char => char.id === id);
};

export const validateCharacterStats = (stats: CharacterStats): boolean => {
  const totalPoints = Object.values(stats).reduce((sum, stat) => sum + Number(stat), 0);
  // Ensure total is <= 10 and all values are between 0-5
  return totalPoints <= 10 && Object.values(stats).every(stat => Number(stat) >= 0 && Number(stat) <= 5);
};
