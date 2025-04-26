
import { z } from "zod";
import { CardType, CardIcon, GameCard } from "@/types/cards";
import { GearCard } from "@/types/cards/gear";

// Schema for validating imported card icons
const cardIconSchema = z.object({
  symbol: z.string(),
  meaning: z.string(),
});

// Schema for validating imported gear cards
const importedGearCardSchema = z.object({
  id: z.union([z.string(), z.number()]),
  title: z.string(),
  type: z.string(),
  icons: z.array(z.union([z.string(), cardIconSchema])),
  keywords: z.array(z.string()),
  rules: z.string(),
  flavor: z.string(),
  image_prompt: z.string(),
});

export const processImportedCards = (jsonData: any): Partial<GearCard>[] => {
  try {
    const cards = Array.isArray(jsonData) ? jsonData : [jsonData];
    return cards.map(card => {
      const validatedCard = importedGearCardSchema.parse(card);
      
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

      // Extract gear category from type field
      const typeMatch = validatedCard.type.match(/GEAR\s*[–-]\s*(\w+)/i);
      const category = typeMatch ? typeMatch[1].toLowerCase() : 'tool';

      return {
        id: String(validatedCard.id),
        name: validatedCard.title,
        type: 'gear' as CardType,
        icons: processedIcons as CardIcon[],
        keywords: validatedCard.keywords,
        rules: [validatedCard.rules],
        flavor: validatedCard.flavor,
        imagePrompt: validatedCard.image_prompt,
        category: category as GearCard['category'],
      };
    });
  } catch (error) {
    console.error('Error processing imported cards:', error);
    throw new Error('Invalid card data format');
  }
};

