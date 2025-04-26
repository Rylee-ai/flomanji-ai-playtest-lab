
import { HazardCard } from "@/types/cards/hazard";
import { createBaseCard } from "./base-processor";

export const processHazardCard = (validatedCard: any): Partial<HazardCard> => ({
  ...createBaseCard(validatedCard),
  type: 'hazard', // Explicitly set the type to 'hazard'
  subType: validatedCard.subType,
  difficultyClasses: validatedCard.difficultyClasses,
  onFailure: validatedCard.onFailure,
  onSuccess: validatedCard.onSuccess,
  bossHazard: validatedCard.bossHazard,
  gearBonuses: validatedCard.gearBonuses,
});
