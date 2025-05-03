
import { CardFormValues } from "@/types/forms/card-form";
import { transformBaseCardData, BaseCardInput } from './base-transformer';

interface NPCCardInput extends BaseCardInput {
  checkDC?: number;
  actions?: Array<{
    description: string;
    cost: number;
    effect: string;
  }>;
}

/**
 * Transforms NPC card data from external JSON format to our internal format
 * @param cardData The raw NPC card data from external JSON
 * @returns Transformed NPC card data ready for import
 */
export const transformNPCCardData = (cardData: NPCCardInput[]): CardFormValues[] => {
  return cardData.map(card => {
    // Get base transformed data
    const baseCard = transformBaseCardData(card);
    
    // Process actions
    const actions = card.actions || [];
    
    return {
      ...baseCard,
      type: 'npc' as const,
      checkDC: card.checkDC || 7, // Default difficulty check
      actions,
      name: baseCard.name || "Unnamed NPC", // Ensure name is always defined
    };
  });
};
