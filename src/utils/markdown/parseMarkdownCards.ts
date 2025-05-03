
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
  
  // Try different patterns for splitting cards
  
  // First try: Look for section headers with ## or # patterns
  let cardSections = markdownContent.split(/(?=#{1,3}\s+[^#\n]+)/g);
  console.log("Using header format, found sections:", cardSections.length);
  
  // If we didn't find multiple sections with headers, try numbered format
  if (cardSections.length <= 1) {
    // Format: 1. Card Name
    cardSections = markdownContent.split(/(?=\d+\.\s+[^\n]+)/g);
    console.log("Using numbered format, found sections:", cardSections.length);
  }
  
  // If we still didn't find multiple sections, try bullet format 
  if (cardSections.length <= 1) {
    // Format: * Card Name or - Card Name
    cardSections = markdownContent.split(/(?=[\*\-]\s+[^\n]+)/g);
    console.log("Using bullet format, found sections:", cardSections.length);
  }
  
  // If we still don't have sections, try double newlines
  if (cardSections.length <= 1) {
    cardSections = markdownContent.split(/\n\n+/);
    console.log("Using paragraph breaks, found sections:", cardSections.length);
  }
  
  // Process each card section
  for (let i = 0; i < cardSections.length; i++) {
    const section = cardSections[i].trim();
    if (!section) continue;
    
    // Extract card title - look for a header pattern
    const titleMatch = section.match(/^(?:#{1,3}|\d+\.|\*|\-)\s+([^\n]+)/);
    const cardTitle = titleMatch ? titleMatch[1].trim() : "Unnamed Card";
    
    console.log("Processing card:", cardTitle);
    
    // Parse the card content into an object
    const card = parseCardSection(cardTitle, section);
    if (card) {
      cards.push(card);
    }
  }
  
  console.log("Total cards parsed:", cards.length);
  
  // If we failed to parse cards with the standard method, try a fallback approach
  if (cards.length === 0) {
    console.log("Falling back to alternate parsing method");
    return parseMarkdownCardsAlternate(markdownContent);
  }
  
  return cards;
};
