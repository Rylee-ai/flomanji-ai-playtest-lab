
import { ChaosCard } from '@/types/cards/chaos';
import { loadCardsByType } from './loadMarkdownCards';

// Load chaos cards from markdown files
export const CHAOS_CARDS: ChaosCard[] = loadCardsByType<ChaosCard>('chaos');
