
import { z } from "zod";
import { baseCardSchema } from "./base-card.schema";

export const npcCardSchema = baseCardSchema.extend({
  type: z.literal('npc'),
  checkDC: z.number().optional(),
  actions: z.array(z.object({
    description: z.string(),
    cost: z.number(),
    effect: z.string(),
  })).optional(),
});
