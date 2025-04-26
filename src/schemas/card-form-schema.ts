
import { z } from "zod";
import { CardType } from "@/types/cards";

export const missionSubtypes = ['exploration', 'escape', 'escort', 'collection', 'boss', 'solo'] as const;

// Define a schema for each form, which will ensure runtime validation
export const cardFormSchema = z.object({
  // Base card fields
  name: z.string().min(1, { message: "Name is required" }),
  type: z.string().min(1, { message: "Type is required" }) as z.ZodType<CardType>,
  keywords: z.array(z.string()).optional(),
  icons: z.array(z.object({
    symbol: z.string(),
    meaning: z.string(),
  })).optional(),
  rules: z.array(z.string()).optional(),
  flavor: z.string().optional(),
  imagePrompt: z.string().optional(),

  // Treasure card fields
  value: z.number().optional(),
  consumable: z.boolean().optional(),
  passiveEffect: z.string().optional(),
  useEffect: z.string().optional(),

  // Hazard card fields
  subType: z.enum(['environmental', 'creature', 'social', 'weird']).optional(),
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

  // Region card fields
  biomeTags: z.array(z.string()).optional(),
  onEnter: z.string().optional(),
  action: z.string().optional(),
  rest: z.string().optional(),
  bonusZone: z.string().optional(),

  // NPC card fields
  checkDC: z.number().optional(),
  actions: z.array(z.object({
    description: z.string(),
    cost: z.number(),
    effect: z.string(),
  })).optional(),

  // Gear card fields
  category: z.enum(['consumable', 'tool', 'weapon', 'vehicle', 'supply']).optional(),
  uses: z.number().optional(),
  actionCost: z.number().optional(),
  passive: z.string().optional(),
  statBonus: z.object({
    stat: z.enum(['brawn', 'moxie', 'charm', 'grit', 'weirdSense']).optional(),
    value: z.number().optional(),
  }).optional(),

  // Chaos card fields
  heatEffect: z.number().optional(),
  globalEffect: z.string().optional(),
  duration: z.enum(['immediate', 'ongoing', 'end-of-round']).optional(),

  // Flomanjified card fields
  originalRole: z.string().optional(),
  chaosAction: z.string().optional(),
  specialAbility: z.string().optional(),

  // Secret card fields
  alignment: z.enum(['saboteur', 'innocent']).optional(),
  winCondition: z.string().optional(),

  // Automa card fields
  movement: z.string().optional(),
  combatBonus: z.number().optional(),
  specialEffect: z.string().optional(),

  // Player Character fields
  role: z.string().optional(),
  stats: z.object({
    brawn: z.number().optional(),
    moxie: z.number().optional(),
    charm: z.number().optional(),
    grit: z.number().optional(),
    weirdSense: z.number().optional(),
  }).optional(),
  ability: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
  }).optional(),
  health: z.number().optional(),
  weirdness: z.number().optional(),
  luck: z.number().optional(),
  starterGear: z.array(z.object({
    name: z.string(),
    type: z.string(),
    effect: z.string(),
  })).optional(),

  // Mission card fields
  hook: z.string().optional(),
  mapLayout: z.string().optional(),
  startingHeat: z.number().optional(),
  extractionRegion: z.string().optional(),
  objectives: z.array(z.object({
    description: z.string(),
    required: z.boolean(),
    reward: z.string().optional(),
    completionCheck: z.string().optional(),
    difficultyLevel: z.number().optional(),
  })).optional(),
  scaling: z.object({
    small: z.string().optional(),
    large: z.string().optional(),
  }).optional(),
  recommendedPlayerCount: z.string().optional(),
  estimatedDuration: z.number().optional(),
  difficultyRating: z.number().optional(),
}).superRefine((data, ctx) => {
  // Additional custom validation can go here
  return true;
});
