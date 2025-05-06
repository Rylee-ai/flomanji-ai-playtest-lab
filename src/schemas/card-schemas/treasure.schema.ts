
import { z } from "zod";
import { baseCardSchema } from "./base-card.schema";

export const treasureCardSchema = baseCardSchema.extend({
  type: z.union([z.literal('treasure'), z.literal('artifact')]),
  value: z.number().optional(),
  consumable: z.boolean().optional(),
  passiveEffect: z.string().optional(),
  useEffect: z.string().optional(),
});
