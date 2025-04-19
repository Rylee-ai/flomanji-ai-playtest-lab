
import { GameCard } from '../cards';
import { CharacterStats } from '@/types';

export interface CharacterGear {
  name: string;
  type: string;
  effect: string;
}

export interface PlayerCharacterCard extends GameCard {
  type: 'player-character';
  role: string;
  stats: CharacterStats;
  ability: {
    name: string;
    description: string;
  };
  health: number;
  weirdness: number;
  luck: number;
  starterGear: CharacterGear[];
}
