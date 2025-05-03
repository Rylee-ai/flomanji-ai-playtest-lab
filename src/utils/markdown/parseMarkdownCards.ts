
import { CardFormValues } from "@/types/forms/card-form";
import { parseCardSection } from "./parseCardSection";
import { parseMarkdownCardsAlternate } from "./parseMarkdownCardsAlternate";

/**
 * Parses a Markdown file containing card data and converts it to our internal card format
 * @param markdownContent Raw markdown content from a file
 * @returns An array of parsed card objects
 */
export const parseMarkdownCards = (markdownContent: string): CardFormValues[] => {
  const cards: CardFormValues[] = [];
  console.log("Parsing markdown content, length:", markdownContent.length);
  
  // First try with numbered formats - "1. CARD NAME"
  // This pattern is ideal for numbered lists like "1. SHRIMP SAUCE REPELLENT"
  let cardSections = markdownContent.split(/(?=\*?\*?\d+\.\s+[A-Z\"\'])/g);
  
  if (cardSections.length <= 1) {
    // Next try with header formats - "## CARD NAME" or "# CARD NAME"
    cardSections = markdownContent.split(/(?=#{1,3}\s+[^#\n]+)/g);
  }

  console.log(`Found ${cardSections.length} card sections`);
  
  // If either method found multiple sections, process them
  if (cardSections.length > 1) {
    for (let i = 0; i < cardSections.length; i++) {
      const section = cardSections[i].trim();
      if (!section) continue;
      
      // Extract card title - look for numbered pattern first
      let titleMatch = section.match(/^(?:\*?\*?)?(?:\d+\.\s+)([^\n]+)/);
      
      // If no numbered pattern, try header pattern
      if (!titleMatch) {
        titleMatch = section.match(/^(?:#{1,3})\s+([^\n]+)/);
      }
      
      // Fall back to first line if no specific pattern matches
      if (!titleMatch) {
        titleMatch = section.match(/^([^\n]+)/);
      }
      
      const cardTitle = titleMatch ? titleMatch[1].trim() : "Unnamed Card";
      
      console.log(`Processing card: "${cardTitle}"`);
      
      // Parse the card content into an object
      const card = parseCardSection(cardTitle, section);
      if (card) {
        cards.push(card);
      }
    }
  } else {
    // If we still don't have multiple sections, try alternate parsing approaches
    console.log("Falling back to alternate parsing method");
    return parseMarkdownCardsAlternate(markdownContent);
  }
  
  console.log(`Total cards parsed: ${cards.length}`);
  
  // If we failed to parse cards with the standard method, try a fallback approach
  if (cards.length === 0) {
    console.log("Standard parsing yielded no cards, using alternate parsing method");
    return parseMarkdownCardsAlternate(markdownContent);
  }
  
  return cards;
};
