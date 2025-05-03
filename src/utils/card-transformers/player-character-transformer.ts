
import { CardFormValues } from "@/types/forms/card-form";
import { transformBaseCardData, BaseCardInput } from './base-transformer';

interface PlayerCharacterInput extends BaseCardInput {
  role?: string;
  stats?: {
    brawn?: number;
    moxie?: number;
    charm?: number;
    grit?: number;
    weirdSense?: number;
  };
  ability?: {
    name?: string;
    description?: string;
  };
  health?: number;
  weirdness?: number;
  luck?: number;
  starterGear?: Array<{
    name: string;
    type: string;
    effect: string;
  }>;
}

/**
 * Transforms Player Character card data from external JSON format to our internal format
 * @param cardData The raw Player Character data from external JSON
 * @returns Transformed Player Character data ready for import
 */
export const transformPlayerCharacterCardData = (cardData: PlayerCharacterInput[]): CardFormValues[] => {
  return cardData.map(card => {
    // Get base transformed data
    const baseCard = transformBaseCardData(card);
    
    // Default stats
    const defaultStats = {
      brawn: 2,
      moxie: 2,
      charm: 2,
      grit: 2,
      weirdSense: 2
    };
    
    return {
      ...baseCard,
      type: 'player-character' as const,
      role: card.role || "Generic Character",
      stats: { ...defaultStats, ...card.stats },
      ability: {
        name: card.ability?.name || "No Ability",
        description: card.ability?.description || "No ability description provided."
      },
      health: card.health || 10,
      weirdness: card.weirdness || 0,
      luck: card.luck || 3,
      starterGear: card.starterGear || [],
      name: baseCard.name || "Unnamed Character", // Ensure name is always defined
    };
  });
};
