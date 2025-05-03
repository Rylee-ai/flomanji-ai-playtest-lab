
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
  rules: string;
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
  const rules = typeof cardData.rules === 'string' 
    ? [cardData.rules] 
    : cardData.rules;
  
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
