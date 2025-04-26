
import { RegionCard } from "@/types/cards/region";
import { createBaseCard } from "./base-processor";

export const processRegionCard = (validatedCard: any): Partial<RegionCard> => ({
  ...createBaseCard(validatedCard),
  type: 'region',
  biomeTags: validatedCard.biomeTags,
  onEnter: validatedCard.onEnter,
  action: validatedCard.action,
  rest: validatedCard.rest,
  bonusZone: validatedCard.bonusZone,
});
