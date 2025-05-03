
import { CardFormValues } from "@/types/forms/card-form";
import { transformBaseCardData, BaseCardInput } from './base-transformer';

interface FlomanjifiedCardInput extends BaseCardInput {
  originalRole?: string;
  chaosAction?: string;
  specialAbility?: string;
}

/**
 * Transforms Flomanjified card data from external JSON format to our internal format
 * @param cardData The raw Flomanjified card data from external JSON
 * @returns Transformed Flomanjified card data ready for import
 */
export const transformFlomanjifiedCardData = (cardData: FlomanjifiedCardInput[]): CardFormValues[] => {
  return cardData.map(card => {
    // Get base transformed data
    const baseCard = transformBaseCardData(card);
    
    return {
      ...baseCard,
      type: 'flomanjified' as const,
      originalRole: card.originalRole || "",
      chaosAction: card.chaosAction || "No chaos action specified.",
      specialAbility: card.specialAbility || "",
      name: baseCard.name || "Unnamed Flomanjified Character", // Ensure name is always defined
    };
  });
};
