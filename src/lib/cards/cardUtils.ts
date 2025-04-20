
import { CardType, GameCard } from '@/types/cards';

// This is a browser-safe fallback that will be used when the server-side
// loadMarkdownCards functions aren't available
export function getBrowserSafeCards<T extends GameCard>(type: CardType, cards: T[]): T[] {
  return cards.filter(card => 
    card.type === type || 
    (type === 'artifact' && card.type === 'treasure' && 'consumable' in card && !card.consumable)
  );
}

export function generateId(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
