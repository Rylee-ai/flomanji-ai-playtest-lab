
import { z } from "zod";
import { baseCardSchema } from "./base-card.schema";

export const treasureCardSchema = baseCardSchema.extend({
  type: z.literal('treasure'),
  value: z.number().optional(),
  consumable: z.boolean().optional(),
});
