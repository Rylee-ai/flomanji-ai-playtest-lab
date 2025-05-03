
import { CardType } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { transformGearCardData } from './gear-transformer';
import { transformTreasureCardData } from './treasure-transformer';
import { transformHazardCardData } from './hazard-transformer';
import { transformRegionCardData } from './region-transformer';
import { transformNPCCardData } from './npc-transformer';
import { transformChaosCardData } from './chaos-transformer';
import { transformFlomanjifiedCardData } from './flomanjified-transformer';
import { transformSecretCardData } from './secret-transformer';
import { transformAutomaCardData } from './automa-transformer';
import { transformPlayerCharacterCardData } from './player-character-transformer';
import { transformMissionCardData } from './mission-transformer';

/**
 * Main function to transform card data from external format to our internal format
 * @param jsonData Raw JSON data
 * @param cardType The type of cards in the JSON
 * @returns Transformed card data ready for import
 */
export const transformCardData = (jsonData: any[], cardType: string): CardFormValues[] => {
  // Validate input data
  if (!Array.isArray(jsonData) || jsonData.length === 0) {
    throw new Error('Invalid or empty JSON data provided for transformation');
  }
  
  try {
    // Transform based on card type
    switch (cardType) {
      case 'gear':
        return transformGearCardData(jsonData);
      case 'treasure':
      case 'artifact':
        return transformTreasureCardData(jsonData);
      case 'hazard':
        return transformHazardCardData(jsonData);
      case 'region':
        return transformRegionCardData(jsonData);
      case 'npc':
        return transformNPCCardData(jsonData);
      case 'chaos':
        return transformChaosCardData(jsonData);
      case 'flomanjified':
        return transformFlomanjifiedCardData(jsonData);
      case 'secret':
        return transformSecretCardData(jsonData);
      case 'automa':
        return transformAutomaCardData(jsonData);
      case 'player-character':
        return transformPlayerCharacterCardData(jsonData);
      case 'mission':
      case 'exploration':
      case 'escape':
      case 'escort':
      case 'collection':
      case 'boss': 
      case 'solo':
        return transformMissionCardData(jsonData);
      default:
        throw new Error(`Unsupported card type: ${cardType}`);
    }
  } catch (error) {
    console.error(`Error transforming card data for type ${cardType}:`, error);
    throw new Error(`Failed to transform card data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
