
import { CardFormValues } from "@/types/forms/card-form";
import { transformBaseCardData, BaseCardInput } from './base-transformer';

interface MissionCardInput extends BaseCardInput {
  missionType?: 'exploration' | 'escape' | 'escort' | 'collection' | 'boss' | 'solo';
  hook?: string;
  mapLayout?: string;
  startingHeat?: number;
  objectives?: Array<{
    description: string;
    required: boolean;
    reward?: string;
    completionCheck?: string;
    difficultyLevel?: number;
  }>;
  extractionRegion?: string;
  scaling?: {
    small?: string;
    large?: string;
  };
}

/**
 * Determine mission type from description
 * @param typeText The type field from external data
 * @returns The mission type
 */
export const determineMissionType = (typeText: string): 'exploration' | 'escape' | 'escort' | 'collection' | 'boss' | 'solo' => {
  const lowerText = typeText.toLowerCase();
  
  if (lowerText.includes('escape')) return 'escape';
  if (lowerText.includes('escort')) return 'escort';
  if (lowerText.includes('collection') || lowerText.includes('gather')) return 'collection';
  if (lowerText.includes('boss')) return 'boss';
  if (lowerText.includes('solo')) return 'solo';
  
  // Default to exploration
  return 'exploration';
};

/**
 * Transforms Mission card data from external JSON format to our internal format
 * @param cardData The raw Mission card data from external JSON
 * @returns Transformed Mission card data ready for import
 */
export const transformMissionCardData = (cardData: MissionCardInput[]): CardFormValues[] => {
  return cardData.map(card => {
    // Get base transformed data
    const baseCard = transformBaseCardData(card);
    
    // Determine mission type
    const missionType = card.missionType || determineMissionType(card.type);
    
    return {
      ...baseCard,
      type: missionType,
      hook: card.hook || "No mission hook provided.",
      mapLayout: card.mapLayout || "",
      startingHeat: card.startingHeat || 0,
      extractionRegion: card.extractionRegion || "",
      objectives: card.objectives || [{ description: "Complete the mission", required: true }],
      scaling: {
        small: card.scaling?.small || "Standard setup",
        large: card.scaling?.large || "Standard setup with additional challenges"
      },
      name: baseCard.name || "Unnamed Mission", // Ensure name is always defined
    };
  });
};
