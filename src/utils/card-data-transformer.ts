
import { CardFormValues } from "@/types/forms/card-form";

interface GearCardInput {
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
 * Transforms gear card data from external JSON format to our internal format
 * @param cardData The raw gear card data from external JSON
 * @returns Transformed card data ready for import
 */
export const transformGearCardData = (cardData: GearCardInput[]): CardFormValues[] => {
  return cardData.map(card => {
    // Extract gear category from type field (e.g., "GEAR – Consumable" -> "consumable")
    const typeMatch = card.type.match(/GEAR – (\w+)/i);
    const category = typeMatch ? typeMatch[1].toLowerCase() as 'consumable' | 'tool' | 'weapon' | 'vehicle' | 'supply' : 'tool';
    
    // Process rules text - split into array if it isn't already
    const rules = typeof card.rules === 'string' ? [card.rules] : card.rules;
    
    // Process icons - convert from string array to object array
    const icons = card.icons.map(icon => ({
      symbol: icon.includes('Icon') ? icon.split(' Icon')[0] : icon,
      meaning: icon.replace(' Icon', '')
    }));

    return {
      id: `gear-${card.id}`,
      name: card.title,
      type: 'gear' as const,
      icons,
      keywords: card.keywords,
      rules,
      flavor: card.flavor,
      imagePrompt: card.image_prompt,
      category
    };
  });
};

/**
 * Main function to transform card data from external format to our internal format
 * @param jsonData Raw JSON data
 * @param cardType The type of cards in the JSON
 * @returns Transformed card data ready for import
 */
export const transformCardData = (jsonData: any[], cardType: string): CardFormValues[] => {
  switch (cardType) {
    case 'gear':
      return transformGearCardData(jsonData);
    // Add more cases for other card types as needed
    default:
      throw new Error(`Unsupported card type: ${cardType}`);
  }
};
