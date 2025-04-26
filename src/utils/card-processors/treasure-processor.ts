
import { TreasureCard } from "@/types/cards/treasure";
import { createBaseCard } from "./base-processor";

export const processTreasureCard = (validatedCard: any): Partial<TreasureCard> => ({
  ...createBaseCard(validatedCard),
  type: 'treasure', // Explicitly set the type to 'treasure'
  value: validatedCard.value,
  consumable: validatedCard.consumable,
});
