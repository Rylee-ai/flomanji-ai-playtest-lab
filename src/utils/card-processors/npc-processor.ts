
import { NPCCard } from "@/types/cards/npc";
import { createBaseCard } from "./base-processor";

export const processNPCCard = (validatedCard: any): Partial<NPCCard> => ({
  ...createBaseCard(validatedCard),
  type: 'npc', // Explicitly set the type to 'npc'
  checkDC: validatedCard.checkDC,
  actions: validatedCard.actions,
});
