
import { CardFormValues } from "@/types/forms/card-form";
import { transformBaseCardData, BaseCardInput } from './base-transformer';

interface AutomaCardInput extends BaseCardInput {
  movement?: string;
  combatBonus?: number;
  specialEffect?: string;
}

/**
 * Transforms Automa card data from external JSON format to our internal format
 * @param cardData The raw Automa card data from external JSON
 * @returns Transformed Automa card data ready for import
 */
export const transformAutomaCardData = (cardData: AutomaCardInput[]): CardFormValues[] => {
  return cardData.map(card => {
    // Get base transformed data
    const baseCard = transformBaseCardData(card);
    
    return {
      ...baseCard,
      type: 'automa' as const,
      movement: card.movement || "No movement pattern specified.",
      combatBonus: card.combatBonus || 0,
      specialEffect: card.specialEffect || "",
      name: baseCard.name || "Unnamed Automa", // Ensure name is always defined
    };
  });
};
