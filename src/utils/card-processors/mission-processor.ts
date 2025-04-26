
import { MissionSheet } from "@/types/cards/mission";
import { createBaseCard } from "./base-processor";

// For mission cards, we need to preserve the specific mission type
export const processMissionCard = (validatedCard: any): Partial<MissionSheet> => {
  const missionType = validatedCard.type as 'exploration' | 'escape' | 'escort' | 'collection' | 'boss' | 'solo';
  
  return {
    ...createBaseCard(validatedCard),
    type: missionType, // Preserve the specific mission type
    hook: validatedCard.hook,
    mapLayout: validatedCard.mapLayout,
    startingHeat: validatedCard.startingHeat,
    objectives: validatedCard.objectives,
    extractionRegion: validatedCard.extractionRegion,
    scaling: validatedCard.scaling,
  };
};
