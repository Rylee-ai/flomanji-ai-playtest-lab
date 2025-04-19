
import { NPCCard } from '@/types/cards/npc';
import { VENDOR_NPC_CARDS } from './vendor-npcs';
import { INFORMATION_NPC_CARDS } from './information-npcs';
import { HAZARD_NPC_CARDS } from './hazard-npcs';
import { SPECIALIST_NPC_CARDS } from './specialist-npcs';
import { MYSTICAL_NPC_CARDS } from './mystical-npcs';
import { HELPER_NPC_CARDS } from './helper-npcs';

export const NPC_CARDS: NPCCard[] = [
  ...VENDOR_NPC_CARDS,
  ...INFORMATION_NPC_CARDS,
  ...HAZARD_NPC_CARDS,
  ...SPECIALIST_NPC_CARDS,
  ...MYSTICAL_NPC_CARDS,
  ...HELPER_NPC_CARDS
];
