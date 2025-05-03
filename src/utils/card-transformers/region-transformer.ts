
import { CardFormValues } from "@/types/forms/card-form";
import { transformBaseCardData, BaseCardInput } from './base-transformer';
import { BiomeTag } from "@/types/cards/region";

interface RegionCardInput extends BaseCardInput {
  biomeTags?: string[];
  onEnter?: string;
  action?: string;
  rest?: string;
  bonusZone?: string;
}

/**
 * Transforms region card data from external JSON format to our internal format
 * @param cardData The raw region card data from external JSON
 * @returns Transformed region card data ready for import
 */
export const transformRegionCardData = (cardData: RegionCardInput[]): CardFormValues[] => {
  return cardData.map(card => {
    // Get base transformed data
    const baseCard = transformBaseCardData(card);
    
    // Process biome tags
    const biomeTags = card.biomeTags || [];
    
    return {
      ...baseCard,
      type: 'region' as const,
      biomeTags,
      onEnter: card.onEnter || "No special effect when entering this region.",
      action: card.action || "",
      rest: card.rest || "",
      bonusZone: card.bonusZone || "",
      name: baseCard.name || "Unnamed Region", // Ensure name is always defined
    };
  });
};
