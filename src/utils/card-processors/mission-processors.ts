
import { createBaseCard } from "./base-processor";

/**
 * Process mission card data into the required format
 * For mission cards, we preserve the specific mission type
 */
export const processMissionCard = (validatedCard: any): Partial<any> => {
  const missionType = validatedCard.type as 'exploration' | 'escape' | 'escort' | 'collection' | 'boss' | 'solo';
  
  return {
    ...createBaseCard(validatedCard),
    type: missionType,
    hook: validatedCard.hook,
    mapLayout: validatedCard.mapLayout,
    startingHeat: validatedCard.startingHeat,
    objectives: validatedCard.objectives,
    extractionRegion: validatedCard.extractionRegion,
    scaling: validatedCard.scaling,
  };
};

/**
 * Process region card data into the required format
 */
export const processRegionCard = (validatedCard: any): Partial<any> => ({
  ...createBaseCard(validatedCard),
  type: 'region',
  biomeTags: validatedCard.biomeTags,
  onEnter: validatedCard.onEnter,
  action: validatedCard.action,
  rest: validatedCard.rest,
  bonusZone: validatedCard.bonusZone,
});
