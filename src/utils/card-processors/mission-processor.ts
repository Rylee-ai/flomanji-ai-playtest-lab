
import { MissionSheet } from "@/types/cards/mission";
import { createBaseCard } from "./base-processor";

export const processMissionCard = (validatedCard: any): Partial<MissionSheet> => ({
  ...createBaseCard(validatedCard),
  hook: validatedCard.hook,
  mapLayout: validatedCard.mapLayout,
  startingHeat: validatedCard.startingHeat,
  objectives: validatedCard.objectives,
  extractionRegion: validatedCard.extractionRegion,
  scaling: validatedCard.scaling,
});
