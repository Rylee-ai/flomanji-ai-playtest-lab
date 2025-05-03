
import { CardFormValues } from "@/types/forms/card-form";
import { CardIcon } from "@/types/cards";

/**
 * Base interface for card input data from external sources
 */
export interface BaseCardInput {
  id: number | string;
  title: string;
  type: string;
  icons: string[];
  keywords: string[];
  rules: string | string[];
  flavor: string;
  image_prompt: string;
}

/**
 * Process card icons from various formats into our internal format
 * @param icons Array of icons in string or object format
 * @returns Processed array of card icons
 */
export const processIcons = (icons: (string | { symbol: string; meaning: string })[]): CardIcon[] => {
  return icons.map(icon => {
    if (typeof icon === 'string') {
      return {
        symbol: icon.includes('Icon') ? icon.split(' Icon')[0] : icon,
        meaning: icon.replace(' Icon', '').trim()
      };
    }
    return icon;
  }) as CardIcon[];
};

/**
 * Base transformer function that handles common fields for all card types
 * @param cardData The raw card data
 * @returns Partially transformed card data with common fields set
 */
export const transformBaseCardData = (cardData: BaseCardInput): Partial<CardFormValues> => {
  // Process rules text - split into array if it isn't already
  const rules = Array.isArray(cardData.rules)
    ? cardData.rules 
    : [cardData.rules];
  
  // Process icons
  const icons = processIcons(cardData.icons || []);
  
  return {
    id: `card-${cardData.id}`,
    name: cardData.title,
    icons,
    keywords: cardData.keywords || [],
    rules,
    flavor: cardData.flavor || "",
    imagePrompt: cardData.image_prompt || ""
  };
};

/**
 * Generate a valid ID from a card name
 * @param name The card name
 * @param prefix Optional prefix for the ID (default: 'card')
 * @returns A valid ID string
 */
export const generateCardId = (name: string, prefix: string = 'card'): string => {
  if (!name) return `${prefix}-unknown-${Date.now()}`;
  
  // Convert to lowercase, replace spaces and special chars with hyphens
  const baseId = name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, ''); // Trim hyphens from start/end
    
  return `${prefix}-${baseId}`;
};

/**
 * Ensure all cards have valid IDs
 * @param cards Array of cards
 * @param typePrefix Prefix for auto-generated IDs
 * @returns Cards with valid IDs
 */
export const ensureCardIds = (
  cards: Partial<CardFormValues>[], 
  typePrefix: string = 'card'
): Partial<CardFormValues>[] => {
  return cards.map(card => {
    if (!card.id && card.name) {
      return {
        ...card,
        id: generateCardId(card.name, typePrefix)
      };
    }
    return card;
  });
};
