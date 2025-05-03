
import { CardFormValues } from "@/types/forms/card-form";
import { transformBaseCardData, BaseCardInput } from './base-transformer';

interface ChaosCardInput extends BaseCardInput {
  heatEffect?: number;
  globalEffect?: string;
  duration?: string;
}

/**
 * Extract duration type from description
 * @param duration The duration field from external data
 * @returns The formatted duration
 */
export const extractDurationType = (duration?: string): 'immediate' | 'ongoing' | 'end-of-round' => {
  if (!duration) return 'immediate';
  
  const lowerDuration = duration.toLowerCase();
  
  if (lowerDuration.includes('ongoing') || lowerDuration.includes('persistent')) {
    return 'ongoing';
  }
  if (lowerDuration.includes('end') || lowerDuration.includes('round end')) {
    return 'end-of-round';
  }
  
  // Default to immediate for other types
  return 'immediate';
};

/**
 * Transforms chaos card data from external JSON format to our internal format
 * @param cardData The raw chaos card data from external JSON
 * @returns Transformed chaos card data ready for import
 */
export const transformChaosCardData = (cardData: ChaosCardInput[]): CardFormValues[] => {
  return cardData.map(card => {
    // Get base transformed data
    const baseCard = transformBaseCardData(card);
    
    // Process duration
    const duration = extractDurationType(card.duration);
    
    return {
      ...baseCard,
      type: 'chaos' as const,
      heatEffect: card.heatEffect || 1, // Default heat effect
      globalEffect: card.globalEffect || "No global effect specified.",
      duration,
      name: baseCard.name || "Unnamed Chaos Card", // Ensure name is always defined
    };
  });
};
