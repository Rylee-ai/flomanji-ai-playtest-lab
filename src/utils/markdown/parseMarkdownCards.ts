
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
  
  // Split the markdown content by major card sections
  // We're looking for sections that begin with a number followed by a period and space
  let cardSections: string[] = [];
  
  // Try different patterns for splitting cards
  if (markdownContent.includes("**1.")) {
    // Format: **1. Card Name**
    cardSections = markdownContent.split(/\n\s*\*\*\d+\.\s*(.+?)\*\*/);
    console.log("Using numbered card format with ** markers, found sections:", cardSections.length);
  } else if (markdownContent.includes("# ")) {
    // Format: # Card Name
    cardSections = markdownContent.split(/\n\s*#\s+(.+?)(?:\n|$)/);
    console.log("Using # header format, found sections:", cardSections.length);
  } else {
    // Format: Card Name
    // Last resort - try to split on double newlines
    cardSections = markdownContent.split(/\n\n+/);
    console.log("Using paragraph breaks, found sections:", cardSections.length);
  }
  
  // Filter out empty sections and process each card section
  for (let i = 1; i < cardSections.length; i += 2) {
    if (!cardSections[i]) continue;
    
    const cardTitle = cardSections[i].trim();
    const cardContent = cardSections[i+1] || '';
    
    console.log("Processing card:", cardTitle);
    
    // Parse the card content into an object
    const card = parseCardSection(cardTitle, cardContent);
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
