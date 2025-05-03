
import { CardType } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { parseMarkdownCards } from "./parseMarkdownCards";

/**
 * Main function to transform markdown data to card data
 * @param markdownContent Raw markdown content
 * @param defaultCardType Default card type if not specified in the markdown
 * @returns Transformed card data
 */
export const transformMarkdownToCards = (markdownContent: string, defaultCardType: CardType): CardFormValues[] => {
  console.log("Starting markdown to card transformation with type:", defaultCardType);
  const cards = parseMarkdownCards(markdownContent);
  
  // Ensure all cards have the correct type if not properly extracted
  const processedCards = cards.map(card => {
    if (!card.type) {
      console.log(`Setting default type ${defaultCardType} for card: ${card.name}`);
      card.type = defaultCardType;
    }
    
    // For gear cards, ensure they have a category
    if (card.type === 'gear' && !card.category) {
      card.category = 'tool';
    }
    
    return card;
  });
  
  console.log(`Transformed ${processedCards.length} cards from markdown`);
  return processedCards;
};
