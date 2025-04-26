
import { CardIcon, GameCard } from "@/types/cards";

export const processCardIcons = (icons: (string | { symbol: string; meaning: string })[]) => {
  return icons.map(icon => {
    if (typeof icon === 'string') {
      return {
        symbol: icon,
        meaning: icon.replace('Icon', '').trim()
      };
    }
    return icon;
  }) as CardIcon[];
};

export const createBaseCard = (validatedCard: any): Partial<GameCard> => ({
  id: String(validatedCard.id),
  name: validatedCard.title,
  type: validatedCard.type,
  icons: processCardIcons(validatedCard.icons),
  keywords: validatedCard.keywords,
  rules: Array.isArray(validatedCard.rules) ? validatedCard.rules : [validatedCard.rules],
  flavor: validatedCard.flavor,
  imagePrompt: validatedCard.image_prompt,
});
