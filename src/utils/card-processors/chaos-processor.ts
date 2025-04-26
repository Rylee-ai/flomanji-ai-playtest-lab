
import { ChaosCard } from "@/types/cards/chaos";
import { createBaseCard } from "./base-processor";

export const processChaosCard = (validatedCard: any): Partial<ChaosCard> => ({
  ...createBaseCard(validatedCard),
  type: 'chaos',
  heatEffect: validatedCard.heatEffect,
  globalEffect: validatedCard.globalEffect,
  duration: validatedCard.duration,
});
