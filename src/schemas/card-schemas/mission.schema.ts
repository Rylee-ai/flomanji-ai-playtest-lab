
import { z } from "zod";
import { baseCardSchema } from "./base-card.schema";

export const missionCardSchema = baseCardSchema.extend({
  type: z.enum(['exploration', 'escape', 'escort', 'collection', 'boss', 'solo']),
  hook: z.string().optional(),
  mapLayout: z.string().optional(),
  startingHeat: z.number().optional(),
  objectives: z.array(z.object({
    description: z.string(),
    required: z.boolean(),
    reward: z.string().optional(),
    completionCheck: z.string().optional(),
    difficultyLevel: z.number().optional(),
  })).optional(),
  extractionRegion: z.string().optional(),
  scaling: z.object({
    small: z.string(),
    large: z.string(),
  }).optional(),
});
