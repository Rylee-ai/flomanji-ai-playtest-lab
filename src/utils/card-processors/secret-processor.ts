
import { SecretObjectiveCard } from "@/types/cards";
import { createBaseCard } from "./base-processor";

export const processSecretCard = (validatedCard: any): Partial<SecretObjectiveCard> => ({
  ...createBaseCard(validatedCard),
  type: 'secret',
  alignment: validatedCard.alignment,
  winCondition: validatedCard.winCondition,
});
