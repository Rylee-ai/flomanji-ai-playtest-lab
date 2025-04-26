
import { TreasureCard } from "@/types/cards/treasure";
import { createBaseCard } from "./base-processor";

export const processTreasureCard = (validatedCard: any): Partial<TreasureCard> => ({
  ...createBaseCard(validatedCard),
  value: validatedCard.value,
  consumable: validatedCard.consumable,
});
