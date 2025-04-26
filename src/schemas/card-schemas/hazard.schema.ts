
import { z } from "zod";
import { baseCardSchema } from "./base-card.schema";

export const hazardCardSchema = baseCardSchema.extend({
  type: z.literal('hazard'),
  subType: z.enum(['environmental', 'creature', 'social', 'weird']),
  difficultyClasses: z.object({
    fight: z.number().optional(),
    flee: z.number().optional(),
    negotiate: z.number().optional(),
    outsmart: z.number().optional(),
    grit: z.number().optional(),
    moxie: z.number().optional(),
    charm: z.number().optional(),
    weirdSense: z.number().optional(),
  }).optional(),
  onFailure: z.string().optional(),
  onSuccess: z.string().optional(),
  bossHazard: z.boolean().optional(),
  gearBonuses: z.array(z.object({
    itemName: z.string(),
    effect: z.enum(['autoSuccess', 'bonus']),
    bonusValue: z.number().optional(),
  })).optional(),
});
