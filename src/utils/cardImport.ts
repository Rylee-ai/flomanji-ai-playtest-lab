import { z } from "zod";
import { CardType, CardIcon, GameCard } from "@/types/cards";
import { GearCard } from "@/types/cards/gear";
import { TreasureCard } from "@/types/cards/treasure";
import { HazardCard } from "@/types/cards/hazard";
import { NPCCard } from "@/types/cards/npc";
import { MissionSheet } from "@/types/cards/mission";

// Generic schema for validating card icons
const cardIconSchema = z.object({
  symbol: z.string(),
  meaning: z.string(),
});

// Card type-specific schemas
const gearCardSchema = z.object({
  id: z.union([z.string(), z.number()]),
  title: z.string(),
  type: z.string(),
  icons: z.array(z.union([z.string(), cardIconSchema])),
  keywords: z.array(z.string()),
  rules: z.string(),
  flavor: z.string(),
  image_prompt: z.string(),
  category: z.enum(['consumable', 'tool', 'weapon', 'vehicle', 'supply']).optional(),
});

const treasureCardSchema = z.object({
  id: z.union([z.string(), z.number()]),
  title: z.string(),
  type: z.literal('treasure'),
  icons: z.array(z.union([z.string(), cardIconSchema])),
  keywords: z.array(z.string()),
  rules: z.string(),
  flavor: z.string(),
  image_prompt: z.string(),
  value: z.number().optional(),
  consumable: z.boolean().optional(),
});

const hazardCardSchema = z.object({
  id: z.union([z.string(), z.number()]),
  title: z.string(),
  type: z.literal('hazard'),
  subType: z.enum(['environmental', 'creature', 'social', 'weird']),
  icons: z.array(z.union([z.string(), cardIconSchema])),
  keywords: z.array(z.string()),
  rules: z.string(),
  flavor: z.string(),
  image_prompt: z.string(),
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

const npcCardSchema = z.object({
  id: z.union([z.string(), z.number()]),
  title: z.string(),
  type: z.literal('npc'),
  icons: z.array(z.union([z.string(), cardIconSchema])),
  keywords: z.array(z.string()),
  rules: z.string(),
  flavor: z.string(),
  image_prompt: z.string(),
  checkDC: z.number().optional(),
  actions: z.array(z.object({
    description: z.string(),
    cost: z.number(),
    effect: z.string(),
  })).optional(),
});

const missionCardSchema = z.object({
  id: z.union([z.string(), z.number()]),
  title: z.string(),
  type: z.enum(['exploration', 'escape', 'escort', 'collection', 'boss', 'solo']),
  icons: z.array(z.union([z.string(), cardIconSchema])),
  keywords: z.array(z.string()),
  rules: z.string(),
  flavor: z.string(),
  image_prompt: z.string(),
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

export const processImportedCards = (jsonData: any, cardType: CardType): Partial<GameCard>[] => {
  try {
    const cards = Array.isArray(jsonData) ? jsonData : [jsonData];

    // Select appropriate schema based on card type
    const cardSchema = {
      'gear': gearCardSchema,
      'treasure': treasureCardSchema,
      'hazard': hazardCardSchema,
      'npc': npcCardSchema,
      'exploration': missionCardSchema,
      'escape': missionCardSchema,
      'escort': missionCardSchema,
      'collection': missionCardSchema,
      'boss': missionCardSchema,
      'solo': missionCardSchema,
    }[cardType];

    if (!cardSchema) {
      throw new Error(`Unsupported card type: ${cardType}`);
    }

    return cards.map(card => {
      const validatedCard = cardSchema.parse(card);
      
      // Process icons to ensure they match the CardIcon format
      const processedIcons = validatedCard.icons.map(icon => {
        if (typeof icon === 'string') {
          return {
            symbol: icon,
            meaning: icon.replace('Icon', '').trim()
          };
        }
        return icon;
      });

      // Common card processing with type-specific details
      const baseCard = {
        id: String(validatedCard.id),
        name: validatedCard.title,
        type: cardType,
        icons: processedIcons as CardIcon[],
        keywords: validatedCard.keywords,
        rules: Array.isArray(validatedCard.rules) ? validatedCard.rules : [validatedCard.rules],
        flavor: validatedCard.flavor,
        imagePrompt: validatedCard.image_prompt,
      };

      // Add type-specific fields
      switch (cardType) {
        case 'gear':
          return {
            ...baseCard,
            category: (validatedCard as any).category || 'tool',
          };
        case 'treasure':
          return {
            ...baseCard,
            value: (validatedCard as any).value,
            consumable: (validatedCard as any).consumable,
          };
        case 'hazard':
          return {
            ...baseCard,
            subType: (validatedCard as any).subType,
            difficultyClasses: (validatedCard as any).difficultyClasses,
            onFailure: (validatedCard as any).onFailure,
            onSuccess: (validatedCard as any).onSuccess,
            bossHazard: (validatedCard as any).bossHazard,
            gearBonuses: (validatedCard as any).gearBonuses,
          };
        case 'npc':
          return {
            ...baseCard,
            checkDC: (validatedCard as any).checkDC,
            actions: (validatedCard as any).actions,
          };
        default:
          if (['exploration', 'escape', 'escort', 'collection', 'boss', 'solo'].includes(cardType)) {
            return {
              ...baseCard,
              hook: (validatedCard as any).hook,
              mapLayout: (validatedCard as any).mapLayout,
              startingHeat: (validatedCard as any).startingHeat,
              objectives: (validatedCard as any).objectives,
              extractionRegion: (validatedCard as any).extractionRegion,
              scaling: (validatedCard as any).scaling,
            };
          }
          return baseCard;
      }
    });
  } catch (error) {
    console.error('Error processing imported cards:', error);
    throw new Error('Invalid card data format');
  }
};
