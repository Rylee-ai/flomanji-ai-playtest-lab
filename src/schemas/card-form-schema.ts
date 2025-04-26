
import { z } from "zod";

export const missionSubtypes = [
  "exploration", "escape", "escort", "collection", "boss", "solo"
] as const;

export const cardFormSchema = z.object({
  // Base fields for all cards
  name: z.string().min(2, { message: "Card name must be at least 2 characters." }),
  type: z.enum([
    "treasure", "artifact", "hazard", "automa", "region", "npc", 
    "mission", "gear", "chaos", "flomanjified", "secret", "player-character",
    ...missionSubtypes
  ]),
  keywords: z.array(z.string()).optional(),
  icons: z.array(z.object({ 
    symbol: z.string(),
    meaning: z.string() 
  })).optional(),
  rules: z.array(z.string()).optional(),
  flavor: z.string().optional(),
  imagePrompt: z.string().optional(),

  // Type-specific fields
  value: z.number().optional(),
  consumable: z.boolean().optional(),
  passiveEffect: z.string().optional(),
  useEffect: z.string().optional(),
  subType: z.enum(["environmental", "creature", "social", "weird"]).optional(),
  difficultyClasses: z.object({
    fight: z.number().optional(),
    flee: z.number().optional(),
    negotiate: z.number().optional(),
    outsmart: z.number().optional(),
    grit: z.number().optional(),
    moxie: z.number().optional(),
    charm: z.number().optional(),
    weirdSense: z.number().optional()
  }).optional(),
  onFailure: z.string().optional(),
  onSuccess: z.string().optional(),
  bossHazard: z.boolean().optional(),
  gearBonuses: z.array(z.object({
    itemName: z.string(),
    effect: z.enum(["autoSuccess", "bonus"]),
    bonusValue: z.number().optional()
  })).optional(),
  biomeTags: z.array(z.string()).optional(),
  onEnter: z.string().optional(),
  action: z.string().optional(),
  rest: z.string().optional(),
  bonusZone: z.string().optional(),
  checkDC: z.number().optional(),
  actions: z.array(z.object({
    description: z.string(),
    cost: z.number(),
    effect: z.string()
  })).optional(),
  category: z.enum(["consumable", "tool", "weapon", "vehicle", "supply"]).optional(),
  uses: z.number().optional(),
  actionCost: z.number().optional(),
  passive: z.string().optional(),
  statBonus: z.object({
    stat: z.enum(["brawn", "moxie", "charm", "grit", "weirdSense"]).optional(),
    value: z.number().optional()
  }).optional(),
  ability: z.object({
    name: z.string().optional(),
    description: z.string().optional()
  }).optional(),
  health: z.number().optional(),
  weirdness: z.number().optional(),
  luck: z.number().optional(),
  starterGear: z.array(z.object({
    name: z.string(),
    type: z.string(),
    effect: z.string()
  })).optional(),
  role: z.string().optional(),
  stats: z.object({
    brawn: z.number().optional(),
    moxie: z.number().optional(),
    charm: z.number().optional(),
    grit: z.number().optional(),
    weirdSense: z.number().optional()
  }).optional(),
});
