
import { FlomanjifiedRoleCard } from "@/types/cards/flomanjified";
import { createBaseCard } from "./base-processor";

export const processFlomanjifiedCard = (validatedCard: any): Partial<FlomanjifiedRoleCard> => ({
  ...createBaseCard(validatedCard),
  type: 'flomanjified',
  originalRole: validatedCard.originalRole,
  chaosAction: validatedCard.chaosAction,
  specialAbility: validatedCard.specialAbility,
});
