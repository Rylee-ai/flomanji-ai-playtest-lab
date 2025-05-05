
import { CardFormValues } from '@/types/forms/card-form';
import { CardIcon, CardType, GameCard } from '@/types/cards';

export type BaseCardInput = {
  id?: string;
  title?: string;
  name?: string;
  type?: string;
  icons?: (string | CardIcon)[];
  keywords?: string[];
  rules?: string | string[];
  flavor?: string;
  image_prompt?: string;
  imagePrompt?: string;
};

/**
 * Process icons from various formats to a standardized format
 */
export const processIcons = (icons: (string | CardIcon)[]): CardIcon[] => {
  return icons.map(icon => {
    if (typeof icon === 'string') {
      const symbol = icon.replace(/\s+Icon$/, ''); // Remove 'Icon' suffix if present
      return { symbol, meaning: symbol };
    }
    return icon;
  });
};

/**
 * Transform base card data that's common across all card types
 */
export const transformBaseCardData = (rawCard: BaseCardInput): Partial<GameCard> => {
  // Handle different naming conventions in source data
  const name = rawCard.name || rawCard.title || '';
  const id = rawCard.id ? `card-${rawCard.id}` : `card-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  
  // Process icons
  const icons = Array.isArray(rawCard.icons)
    ? processIcons(rawCard.icons)
    : [];
  
  // Process keywords
  const keywords = Array.isArray(rawCard.keywords)
    ? rawCard.keywords
    : [];
  
  // Process rules
  const rules = Array.isArray(rawCard.rules)
    ? rawCard.rules
    : typeof rawCard.rules === 'string' 
      ? [rawCard.rules] 
      : [];
  
  // Return the base card
  return {
    id,
    name,
    icons,
    keywords,
    rules,
    flavor: rawCard.flavor || '',
    imagePrompt: rawCard.imagePrompt || rawCard.image_prompt || '',
  };
};

/**
 * Ensures all cards have valid IDs
 * @param cards Array of cards to process
 * @param cardType Type of cards for prefix
 * @returns Cards with ensured IDs
 */
export const ensureCardIds = <T extends Partial<GameCard>>(cards: T[], cardType: CardType): T[] => {
  return cards.map(card => {
    if (!card.id || card.id.trim() === '') {
      return {
        ...card,
        id: `${cardType}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
      };
    }
    
    if (!card.id.startsWith('card-') && !card.id.includes('-')) {
      return {
        ...card,
        id: `card-${card.id}`
      };
    }
    
    return card;
  });
};

/**
 * Base transformer function that handles common card properties
 * @deprecated Use transformBaseCardData instead
 */
export const createBaseCard = transformBaseCardData;

