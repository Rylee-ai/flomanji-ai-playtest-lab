
import { GearCard } from "@/types/cards/gear";
import { createBaseCard } from "./base-processor";

export const processGearCard = (validatedCard: any): Partial<GearCard> => ({
  ...createBaseCard(validatedCard),
  type: 'gear', // Explicitly set the type to 'gear'
  category: validatedCard.category || 'tool',
});
