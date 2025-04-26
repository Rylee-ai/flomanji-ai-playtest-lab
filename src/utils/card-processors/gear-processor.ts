
import { GearCard } from "@/types/cards/gear";
import { createBaseCard } from "./base-processor";

export const processGearCard = (validatedCard: any): Partial<GearCard> => ({
  ...createBaseCard(validatedCard),
  category: validatedCard.category || 'tool',
});
