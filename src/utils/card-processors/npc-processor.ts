
import { NPCCard } from "@/types/cards/npc";
import { createBaseCard } from "./base-processor";

export const processNPCCard = (validatedCard: any): Partial<NPCCard> => ({
  ...createBaseCard(validatedCard),
  checkDC: validatedCard.checkDC,
  actions: validatedCard.actions,
});
