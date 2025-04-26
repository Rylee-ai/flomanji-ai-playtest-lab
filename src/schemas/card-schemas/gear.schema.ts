
import { z } from "zod";
import { baseCardSchema } from "./base-card.schema";

export const gearCardSchema = baseCardSchema.extend({
  type: z.literal('gear'),
  category: z.enum(['consumable', 'tool', 'weapon', 'vehicle', 'supply']).optional(),
});
