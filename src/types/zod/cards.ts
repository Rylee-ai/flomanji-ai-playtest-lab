
import { z } from "zod";
import type { CardType } from "../cards";

// CardIcon schema
export const CardIconSchema = z.object({
  symbol: z.string().min(1),
  meaning: z.string().min(1),
});

// Base GameCard schema
export const GameCardSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  type: z.string(), // Use discriminated unions for specific card types
  icons: z.array(CardIconSchema),
  keywords: z.array(z.string()),
  rules: z.array(z.string()),
  flavor: z.string(),
  imagePrompt: z.string(),
});

// TreasureCard schema
export const TreasureCardSchema = GameCardSchema.extend({
  type: z.union([z.literal("treasure"), z.literal("artifact")]),
  value: z.number().optional(),
  consumable: z.boolean().optional(),
  passiveEffect: z.string().optional(),
  useEffect: z.string().optional(),
});

// AutomaCard schema
export const AutomaCardSchema = GameCardSchema.extend({
  type: z.literal("automa"),
  movement: z.string().optional(),
  combatBonus: z.number().optional(),
  specialEffect: z.string().optional(),
});

// SecretObjectiveCard schema
export const SecretObjectiveCardSchema = GameCardSchema.extend({
  type: z.literal("secret"),
  alignment: z.union([z.literal("saboteur"), z.literal("innocent")]),
  winCondition: z.string(),
});

export const AllCardSchemas = {
  treasure: TreasureCardSchema,
  artifact: TreasureCardSchema,
  automa: AutomaCardSchema,
  secret: SecretObjectiveCardSchema,
  // Add more schemas as you implement/expand card types!
};
