
import { CardFormValues } from "@/types/forms/card-form";
import { transformGearCardData } from './gear-transformer';
import { transformTreasureCardData } from './treasure-transformer';

/**
 * Main function to transform card data from external format to our internal format
 * @param jsonData Raw JSON data
 * @param cardType The type of cards in the JSON
 * @returns Transformed card data ready for import
 */
export const transformCardData = (jsonData: any[], cardType: string): CardFormValues[] => {
  switch (cardType) {
    case 'gear':
      return transformGearCardData(jsonData);
    case 'treasure':
      return transformTreasureCardData(jsonData);
    // Add more cases for other card types as needed
    default:
      throw new Error(`Unsupported card type: ${cardType}`);
  }
};
