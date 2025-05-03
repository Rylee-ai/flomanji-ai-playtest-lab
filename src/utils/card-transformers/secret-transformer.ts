
import { CardFormValues } from "@/types/forms/card-form";
import { transformBaseCardData, BaseCardInput } from './base-transformer';

interface SecretCardInput extends BaseCardInput {
  alignment?: string;
  winCondition?: string;
}

/**
 * Extract alignment from description
 * @param alignment The alignment field from external data
 * @returns The formatted alignment
 */
export const extractAlignment = (alignment?: string): 'saboteur' | 'innocent' => {
  if (!alignment) return 'saboteur';
  
  const lowerAlignment = alignment.toLowerCase();
  
  if (lowerAlignment.includes('saboteur') || 
      lowerAlignment.includes('traitor') || 
      lowerAlignment.includes('evil')) {
    return 'saboteur';
  }
  
  // Default to innocent for other types
  return 'innocent';
};

/**
 * Transforms Secret card data from external JSON format to our internal format
 * @param cardData The raw Secret card data from external JSON
 * @returns Transformed Secret card data ready for import
 */
export const transformSecretCardData = (cardData: SecretCardInput[]): CardFormValues[] => {
  return cardData.map(card => {
    // Get base transformed data
    const baseCard = transformBaseCardData(card);
    
    // Process alignment
    const alignment = extractAlignment(card.alignment);
    
    return {
      ...baseCard,
      type: 'secret' as const,
      alignment,
      winCondition: card.winCondition || "Win condition not specified.",
      name: baseCard.name || "Unnamed Secret", // Ensure name is always defined
    };
  });
};
