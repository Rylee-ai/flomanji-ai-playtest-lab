
import { z } from "zod";
import { baseCardSchema } from "./base-card.schema";

export const characterStatsSchema = z.object({
  brawn: z.number(),
  moxie: z.number(),
  charm: z.number(),
  grit: z.number(),
  weirdSense: z.number(),
});

export const characterGearSchema = z.object({
  name: z.string(),
  type: z.string(),
  effect: z.string(),
});

export const characterAbilitySchema = z.object({
  name: z.string(),
  description: z.string(),
});

export const playerCharacterCardSchema = baseCardSchema.extend({
  type: z.literal("player-character"),
  role: z.string(),
  stats: characterStatsSchema,
  ability: characterAbilitySchema,
  health: z.number(),
  weirdness: z.number(),
  luck: z.number(),
  starterGear: z.array(characterGearSchema),
});

export type PlayerCharacterCardSchema = z.infer<typeof playerCharacterCardSchema>;
