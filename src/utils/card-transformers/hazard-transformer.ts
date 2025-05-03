
import { CardFormValues } from "@/types/forms/card-form";
import { transformBaseCardData, BaseCardInput } from './base-transformer';

interface HazardCardInput extends BaseCardInput {
  subType?: string;
  difficultyClasses?: Record<string, number>;
  onFailure?: string;
  onSuccess?: string;
  bossHazard?: boolean;
}

/**
 * Extract hazard subtype from type field or description
 * @param typeText The type field from external data
 * @returns The hazard subtype
 */
export const extractHazardSubType = (typeText: string): 'environmental' | 'creature' | 'social' | 'weird' => {
  const lowerText = typeText.toLowerCase();
  
  if (lowerText.includes('creature') || lowerText.includes('monster') || lowerText.includes('beast')) {
    return 'creature';
  }
  if (lowerText.includes('social') || lowerText.includes('interaction') || lowerText.includes('npc')) {
    return 'social';
  }
  if (lowerText.includes('weird') || lowerText.includes('strange') || lowerText.includes('supernatural')) {
    return 'weird';
  }
  
  // Default to environmental for other types
  return 'environmental';
};

/**
 * Transforms hazard card data from external JSON format to our internal format
 * @param cardData The raw hazard card data from external JSON
 * @returns Transformed hazard card data ready for import
 */
export const transformHazardCardData = (cardData: HazardCardInput[]): CardFormValues[] => {
  return cardData.map(card => {
    // Get base transformed data
    const baseCard = transformBaseCardData(card);
    
    // Extract hazard subtype from type field
    const subType = extractHazardSubType(card.type);
    
    // Process difficulty classes if available
    const difficultyClasses = card.difficultyClasses || {};
    
    return {
      ...baseCard,
      type: 'hazard' as const,
      subType,
      difficultyClasses,
      onFailure: card.onFailure || "Encounter fails with negative consequences.",
      onSuccess: card.onSuccess || "",
      bossHazard: card.bossHazard || false,
      name: baseCard.name || "Unnamed Hazard", // Ensure name is always defined
    };
  });
};
