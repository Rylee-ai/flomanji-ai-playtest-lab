
import { NPCCard } from '@/types/cards/npc';
import { loadCardsByType } from '../loadMarkdownCards';

// Load NPC cards from markdown files
export const NPC_CARDS: NPCCard[] = loadCardsByType<NPCCard>('npc');
