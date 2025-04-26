
import { CardType, GameCard } from "@/types/cards";
import {
  gearCardSchema,
  treasureCardSchema,
  hazardCardSchema,
  npcCardSchema,
  missionCardSchema
} from "@/schemas/card-schemas";
import { processGearCard } from "./card-processors/gear-processor";
import { processTreasureCard } from "./card-processors/treasure-processor";
import { processHazardCard } from "./card-processors/hazard-processor";
import { processNPCCard } from "./card-processors/npc-processor";
import { processMissionCard } from "./card-processors/mission-processor";

export const processImportedCards = (jsonData: any, cardType: CardType): Partial<GameCard>[] => {
  try {
    const cards = Array.isArray(jsonData) ? jsonData : [jsonData];

    // Select appropriate schema based on card type
    const cardSchema = {
      'gear': gearCardSchema,
      'treasure': treasureCardSchema,
      'hazard': hazardCardSchema,
      'npc': npcCardSchema,
      'exploration': missionCardSchema,
      'escape': missionCardSchema,
      'escort': missionCardSchema,
      'collection': missionCardSchema,
      'boss': missionCardSchema,
      'solo': missionCardSchema,
    }[cardType];

    if (!cardSchema) {
      throw new Error(`Unsupported card type: ${cardType}`);
    }

    return cards.map(card => {
      const validatedCard = cardSchema.parse(card);

      // Process card based on type
      switch (cardType) {
        case 'gear':
          return processGearCard(validatedCard);
        case 'treasure':
          return processTreasureCard(validatedCard);
        case 'hazard':
          return processHazardCard(validatedCard);
        case 'npc':
          return processNPCCard(validatedCard);
        default:
          if (['exploration', 'escape', 'escort', 'collection', 'boss', 'solo'].includes(cardType)) {
            return processMissionCard(validatedCard);
          }
          throw new Error(`Unsupported card type: ${cardType}`);
      }
    });
  } catch (error) {
    console.error('Error processing imported cards:', error);
    throw new Error('Invalid card data format');
  }
};
