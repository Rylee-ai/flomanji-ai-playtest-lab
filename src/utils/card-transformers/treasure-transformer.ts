
import { CardFormValues } from "@/types/forms/card-form";
import { transformBaseCardData, BaseCardInput } from './base-transformer';

interface TreasureCardInput extends BaseCardInput {
  value?: number;
  consumable?: boolean;
}

/**
 * Transforms treasure card data from external JSON format to our internal format
 * @param cardData The raw treasure card data from external JSON
 * @returns Transformed treasure card data ready for import
 */
export const transformTreasureCardData = (cardData: TreasureCardInput[]): CardFormValues[] => {
  return cardData.map(card => {
    // Get base transformed data
    const baseCard = transformBaseCardData(card);
    
    return {
      ...baseCard,
      type: 'treasure' as const,
      value: card.value || 0, // Default value if not provided
      consumable: card.consumable || false, // Default to non-consumable if not specified
      name: baseCard.name || "Unnamed Treasure", // Ensure name is always defined
    };
  });
};
