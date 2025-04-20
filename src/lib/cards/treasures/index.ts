
import { TreasureCard } from "@/types/cards";
import { loadCardsByType } from '../loadMarkdownCards';

// Load treasure cards from markdown files
export const STANDARD_TREASURES: TreasureCard[] = loadCardsByType<TreasureCard>('treasure');
export const ARTIFACTS: TreasureCard[] = loadCardsByType<TreasureCard>('artifact');

export const TREASURE_CARDS: TreasureCard[] = [
  ...STANDARD_TREASURES,
  ...ARTIFACTS
];
