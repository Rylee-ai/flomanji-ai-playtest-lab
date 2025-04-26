
import { z } from "zod";
import { CardType, CardIcon, GameCard } from "@/types/cards";
import { GearCard } from "@/types/cards/gear";
import { TreasureCard } from "@/types/cards/treasure";
import { HazardCard } from "@/types/cards/hazard";
import { NPCCard } from "@/types/cards/npc";

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

// Add more schemas for other card types as needed

export const processImportedCards = (jsonData: any, cardType: CardType): Partial<GameCard>[] => {
  try {
    const cards = Array.isArray(jsonData) ? jsonData : [jsonData];

    // Select appropriate schema based on card type
    const cardSchema = {
      'gear': gearCardSchema,
      'treasure': treasureCardSchema,
      // Add more mappings for other card types
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
        rules: [validatedCard.rules],
        flavor: validatedCard.flavor,
        imagePrompt: validatedCard.image_prompt,
      };

      // Add type-specific fields
      switch (cardType) {
        case 'gear':
          return {
            ...baseCard,
            category: validatedCard.category || 'tool',
          };
        case 'treasure':
          return {
            ...baseCard,
            value: (validatedCard as any).value,
            consumable: (validatedCard as any).consumable,
          };
        default:
          return baseCard;
      }
    });
  } catch (error) {
    console.error('Error processing imported cards:', error);
    throw new Error('Invalid card data format');
  }
};
