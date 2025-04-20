import { GameCard } from '@/types/cards';
import { TREASURE_CARDS } from './treasures';
import { HAZARD_CARDS } from './hazards';
import { NPC_CARDS } from './npcs';
import { AUTOMA_CARDS } from './automa-cards';
import { MISSION_CARDS } from './mission-cards';
import { REGION_CARDS } from './region-cards';
import { SECRET_OBJECTIVES } from './secret-objectives';
import { GEAR_CARDS } from './gear-cards';
import { CHAOS_CARDS } from './chaos';
import { FLOMANJIFIED_CARDS } from './flomanjified-cards';
import { PLAYER_CHARACTER_CARDS } from './player-character-cards';

export const ALL_CARDS: GameCard[] = [
  ...TREASURE_CARDS,
  ...HAZARD_CARDS,
  ...NPC_CARDS,
  ...AUTOMA_CARDS,
  ...MISSION_CARDS,
  ...REGION_CARDS,
  ...SECRET_OBJECTIVES,
  ...GEAR_CARDS,
  ...CHAOS_CARDS,
  ...FLOMANJIFIED_CARDS,
  ...PLAYER_CHARACTER_CARDS
];

export * from './treasures';
export * from './hazards';
export * from './npcs';
export * from './automa-cards';
export * from './mission-cards';
export * from './region-cards';
export * from './secret-objectives';
export * from './gear-cards';
export * from './chaos';
export * from './flomanjified-cards';
export * from './player-character-cards';
