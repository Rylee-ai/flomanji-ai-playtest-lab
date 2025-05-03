
import { CardFormValues } from "@/types/forms/card-form";

/**
 * Alternative parsing method for different markdown formats
 * @param markdownContent Raw markdown content to parse
 * @returns An array of card objects
 */
export const parseMarkdownCardsAlternate = (markdownContent: string): CardFormValues[] => {
  const cards: CardFormValues[] = [];
  
  // Split content by what looks like card boundaries (headings or numbered items)
  const sections = markdownContent.split(/\n(?=\d+\.\s+|#\s+|##\s+)/);
  
  console.log("Alternative parsing found sections:", sections.length);
  
  for (const section of sections) {
    if (!section.trim()) continue;
    
    // Try to extract a name from the section
    const nameMatch = section.match(/^(?:\d+\.\s+|#\s+|##\s+)?(.*?)(?:\n|$)/);
    const name = nameMatch ? nameMatch[1].trim() : "Unnamed Card";
    
    // Check for common fields
    const typeMatch = section.match(/Type:?\s*(.*?)(?:\n|$)/i);
    const keywordsMatch = section.match(/Keywords?:?\s*(.*?)(?:\n|$)/i);
    const rulesMatch = section.match(/Rules?:?\s*([\s\S]*?)(?:\n\n|$)/i);
    const flavorMatch = section.match(/Flavor:?\s*(.*?)(?:\n|$)/i);
    
    const card: Partial<CardFormValues> = {
      name,
      icons: [],
      keywords: [],
      rules: [],
    };
    
    // Extract card type
    if (typeMatch) {
      const typeText = typeMatch[1].trim();
      if (typeText.toLowerCase().includes('gear')) {
        card.type = 'gear';
      } else if (typeText.toLowerCase().includes('treasure')) {
        card.type = 'treasure';
      } else if (typeText.toLowerCase().includes('hazard')) {
        card.type = 'hazard';
      }
    }
    
    // Extract keywords
    if (keywordsMatch) {
      card.keywords = keywordsMatch[1].split(/,\s*/).map(k => k.trim());
    }
    
    // Extract rules
    if (rulesMatch) {
      card.rules = [rulesMatch[1].trim()];
    }
    
    // Extract flavor text
    if (flavorMatch) {
      card.flavor = flavorMatch[1].trim();
    }
    
    // Only add cards with a name
    if (card.name) {
      cards.push(card as CardFormValues);
    }
  }
  
  console.log("Alternative parsing found cards:", cards.length);
  return cards;
};
