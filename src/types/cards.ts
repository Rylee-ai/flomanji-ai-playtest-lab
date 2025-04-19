
export type CardType = 'treasure' | 'artifact' | 'automa' | 'secret' | 'hazard' | 'gear' | 'npc' | 'region' | 'chaos';

export interface CardIcon {
  symbol: string;
  meaning: string;
}

export interface GameCard {
  id: string;
  name: string;
  type: CardType;
  icons: CardIcon[];
  keywords: string[];
  rules: string[];
  flavor: string;
  imagePrompt: string;
}

export interface TreasureCard extends GameCard {
  type: 'treasure';
  value?: number;
  consumable?: boolean;
}

export interface AutomaCard extends GameCard {
  type: 'automa';
  movement?: string;
  combatBonus?: number;
  specialEffect?: string;
}

export interface SecretObjectiveCard extends GameCard {
  type: 'secret';
  alignment: 'saboteur' | 'innocent';
  winCondition: string;
}
