
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
  
  // Attempt to parse using different patterns
  // First try with the Flomanji gear cards format: "**X\. CARD NAME**"
  let cardSections = markdownContent.split(/(?=\*\*\d+\\?\.\s+[A-Z0-9\s\(\)\-\'\"]+\*\*)/g);
  console.log(`Flomanji format found ${cardSections.length} card sections`);
  
  // If that didn't work, try with regular numbered formats - "1. CARD NAME"
  if (cardSections.length <= 1) {
    cardSections = markdownContent.split(/(?=\*?\*?\d+\.\s+[A-Z\"\'])/g);
    console.log(`Numbered format found ${cardSections.length} card sections`);
  }
  
  // Next try with header formats - "## CARD NAME" or "# CARD NAME"
  if (cardSections.length <= 1) {
    cardSections = markdownContent.split(/(?=#{1,3}\s+[^#\n]+)/g);
    console.log(`Header format found ${cardSections.length} card sections`);
  }

  // If we found multiple sections with any method, process them
  if (cardSections.length > 1) {
    console.log(`Processing ${cardSections.length} card sections`);
    
    for (let i = 0; i < cardSections.length; i++) {
      const section = cardSections[i].trim();
      if (!section) continue;
      
      console.log(`Processing section ${i+1}/${cardSections.length}:`, section.substring(0, 50) + "...");
      
      // Extract card title - try different patterns based on format
      
      // Try Flomanji format: "**X\. CARD NAME**"
      let titleMatch = section.match(/^\*\*\d+\\?\.\s+([A-Z0-9\s\(\)\-\'\"]+)\*\*/);
      
      // If no match, try numbered pattern: "X. CARD NAME"
      if (!titleMatch) {
        titleMatch = section.match(/^(?:\*?\*?)?(?:\d+\.\s+)([^\n]+)/);
      }
      
      // If still no match, try header pattern: "## CARD NAME"
      if (!titleMatch) {
        titleMatch = section.match(/^(?:#{1,3})\s+([^\n]+)/);
      }
      
      // Fall back to first line if no specific pattern matches
      if (!titleMatch) {
        titleMatch = section.match(/^([^\n]+)/);
      }
      
      const cardTitle = titleMatch ? titleMatch[1].trim() : "Unnamed Card";
      
      console.log(`Found card title: "${cardTitle}"`);
      
      // Parse the card content into an object
      const card = parseCardSection(cardTitle, section);
      if (card) {
        cards.push(card);
        console.log(`Successfully added card: ${card.name}, ID: ${card.id}`);
      } else {
        console.log(`Failed to parse card for section with title: ${cardTitle}`);
      }
    }
  } else {
    // If we still don't have multiple sections, try alternate parsing approaches
    console.log("Standard parsing failed, falling back to alternate parsing method");
    return parseMarkdownCardsAlternate(markdownContent);
  }
  
  console.log(`Total cards parsed with standard method: ${cards.length}`);
  
  // If we failed to parse cards with the standard method, try a fallback approach
  if (cards.length === 0) {
    console.log("Standard parsing yielded no cards, using alternate parsing method");
    return parseMarkdownCardsAlternate(markdownContent);
  }
  
  return cards;
};
