
import { CardType, GameCard } from "@/types/cards";
import {
  gearCardSchema,
  treasureCardSchema,
  hazardCardSchema,
  npcCardSchema,
  missionCardSchema
} from "@/schemas/card-schemas";

import {
  processGearCard,
  processTreasureCard,
  processHazardCard,
  processNPCCard,
  processMissionCard,
  processPlayerCharacterCard,
  processFlomanjifiedCard,
  processChaosCard,
  processRegionCard,
  processSecretCard,
  processAutomaCard
} from "./card-processors";

export const processImportedCards = (jsonData: any, cardType: CardType): Partial<GameCard>[] => {
  try {
    const cards = Array.isArray(jsonData) ? jsonData : [jsonData];

    // Select appropriate schema and processor based on card type
    const processCard = {
      'gear': { schema: gearCardSchema, processor: processGearCard },
      'treasure': { schema: treasureCardSchema, processor: processTreasureCard },
      'hazard': { schema: hazardCardSchema, processor: processHazardCard },
      'npc': { schema: npcCardSchema, processor: processNPCCard },
      'player-character': { schema: npcCardSchema, processor: processPlayerCharacterCard },
      'flomanjified': { schema: npcCardSchema, processor: processFlomanjifiedCard },
      'chaos': { schema: hazardCardSchema, processor: processChaosCard },
      'region': { schema: hazardCardSchema, processor: processRegionCard },
      'secret': { schema: hazardCardSchema, processor: processSecretCard },
      'automa': { schema: hazardCardSchema, processor: processAutomaCard },
      'exploration': { schema: missionCardSchema, processor: processMissionCard },
      'escape': { schema: missionCardSchema, processor: processMissionCard },
      'escort': { schema: missionCardSchema, processor: processMissionCard },
      'collection': { schema: missionCardSchema, processor: processMissionCard },
      'boss': { schema: missionCardSchema, processor: processMissionCard },
      'solo': { schema: missionCardSchema, processor: processMissionCard },
    }[cardType];

    if (!processCard) {
      throw new Error(`Unsupported card type: ${cardType}`);
    }

    return cards.map(card => {
      const validatedCard = processCard.schema.parse(card);
      return processCard.processor(validatedCard);
    });
  } catch (error) {
    console.error('Error processing imported cards:', error);
    throw new Error('Invalid card data format');
  }
};
