
import { GearCard, TreasureCard } from "@/types/cards";
import { createBaseCard } from "./base-processor";

/**
 * Process gear card data into the required format
 */
export const processGearCard = (validatedCard: any): Partial<GearCard> => ({
  ...createBaseCard(validatedCard),
  type: 'gear',
  category: validatedCard.category || 'tool',
});

/**
 * Process treasure card data into the required format
 */
export const processTreasureCard = (validatedCard: any): Partial<TreasureCard> => ({
  ...createBaseCard(validatedCard),
  type: 'treasure',
  value: validatedCard.value,
  consumable: validatedCard.consumable,
});
