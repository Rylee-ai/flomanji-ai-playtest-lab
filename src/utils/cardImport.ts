
import { CardType, GameCard } from "@/types/cards";
import {
  gearCardSchema,
  treasureCardSchema,
  hazardCardSchema,
  npcCardSchema,
  missionCardSchema
} from "@/schemas/card-schemas";
import { createBaseCard } from "./card-processors/base-processor";

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
      const baseCard = createBaseCard(validatedCard);

      // Add type-specific fields
      switch (cardType) {
        case 'gear':
          return {
            ...baseCard,
            category: validatedCard.category || 'tool',
          };
        case 'treasure':
          return {
            ...baseCard,
            value: validatedCard.value,
            consumable: validatedCard.consumable,
          };
        case 'hazard':
          return {
            ...baseCard,
            subType: validatedCard.subType,
            difficultyClasses: validatedCard.difficultyClasses,
            onFailure: validatedCard.onFailure,
            onSuccess: validatedCard.onSuccess,
            bossHazard: validatedCard.bossHazard,
            gearBonuses: validatedCard.gearBonuses,
          };
        case 'npc':
          return {
            ...baseCard,
            checkDC: validatedCard.checkDC,
            actions: validatedCard.actions,
          };
        default:
          if (['exploration', 'escape', 'escort', 'collection', 'boss', 'solo'].includes(cardType)) {
            return {
              ...baseCard,
              hook: validatedCard.hook,
              mapLayout: validatedCard.mapLayout,
              startingHeat: validatedCard.startingHeat,
              objectives: validatedCard.objectives,
              extractionRegion: validatedCard.extractionRegion,
              scaling: validatedCard.scaling,
            };
          }
          return baseCard;
      }
    });
  } catch (error) {
    console.error('Error processing imported cards:', error);
    throw new Error('Invalid card data format');
  }
};
