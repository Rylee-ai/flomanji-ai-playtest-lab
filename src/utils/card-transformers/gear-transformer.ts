
import { CardFormValues } from "@/types/forms/card-form";
import { transformBaseCardData, BaseCardInput } from './base-transformer';

interface GearCardInput extends BaseCardInput {
  type: string; // Should contain gear category information (e.g., "GEAR – Consumable")
}

/**
 * Extract gear category from type field
 * @param typeText The type field from external data
 * @returns The gear category
 */
export const extractGearCategory = (typeText: string): 'consumable' | 'tool' | 'weapon' | 'vehicle' | 'supply' => {
  const lowerText = typeText.toLowerCase();
  
  if (lowerText.includes('consumable')) return 'consumable';
  if (lowerText.includes('weapon')) return 'weapon';
  if (lowerText.includes('vehicle')) return 'vehicle';
  if (lowerText.includes('supply')) return 'supply';
  
  // Default to tool for other categories
  return 'tool';
};

/**
 * Transforms gear card data from external JSON format to our internal format
 * @param cardData The raw gear card data from external JSON
 * @returns Transformed gear card data ready for import
 */
export const transformGearCardData = (cardData: GearCardInput[]): CardFormValues[] => {
  return cardData.map(card => {
    // Get base transformed data
    const baseCard = transformBaseCardData(card);
    
    // Extract gear category from type field
    const category = extractGearCategory(card.type);
    
    // Return a fully formed CardFormValues with the required name property
    return {
      ...baseCard,
      type: 'gear' as const,
      category,
      name: baseCard.name || "Unnamed Gear", // Ensure name is always defined
    };
  });
};
