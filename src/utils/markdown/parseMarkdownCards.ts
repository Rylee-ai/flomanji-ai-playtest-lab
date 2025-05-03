
import { CardFormValues } from "@/types/forms/card-form";
import { parseCardSection } from "./parseCardSection";
import { parseMarkdownCardsAlternate } from "./parseMarkdownCardsAlternate";
import { cleanupTitle } from "./cardTypeMappers";
import { v4 as uuidv4 } from 'uuid';

/**
 * Parses a Markdown file containing card data and converts it to our internal card format
 * @param markdownContent Raw markdown content from a file
 * @returns An array of parsed card objects
 */
export const parseMarkdownCards = (markdownContent: string): CardFormValues[] => {
  const cards: CardFormValues[] = [];
  console.log("Parsing markdown content, length:", markdownContent.length);
  
  // Clean up the content - standardize line endings and fix potential issues
  const cleanedContent = markdownContent
    .replace(/\r\n/g, '\n')  // Normalize line endings
    .replace(/\n{3,}/g, '\n\n');  // Standardize multiple blank lines
  
  // Try different splitting patterns to identify card sections
  
  // First, try the most specific format: "* **Title:** CARD NAME**" (with trailing asterisks)
  // This pattern specifically targets the format with asterisks at the end of title
  let cardSections = cleanedContent.split(/(?=\*\s*\*\*Title:\*\*\s*[^\n]+\*\*)/i);
  console.log(`Title format with trailing asterisks found ${cardSections.length} card sections`);
  
  // If that didn't work well, try the format: "* **Title:** CARD NAME" (without trailing asterisks)
  if (cardSections.length <= 1) {
    cardSections = cleanedContent.split(/(?=\*\s*\*\*Title:\*\*\s+[^\n]+)/i);
    console.log(`Standard Title format found ${cardSections.length} card sections`);
  }
  
  // Try with empty lines followed by *
  if (cardSections.length <= 1) {
    cardSections = cleanedContent.split(/\n\n\*\s*\*\*Title:/i);
    console.log(`Title format with empty lines found ${cardSections.length} card sections`);
    
    // Need to add the prefix back to all but first section
    if (cardSections.length > 1) {
      for (let i = 1; i < cardSections.length; i++) {
        cardSections[i] = `* **Title:${cardSections[i]}`;
      }
    }
  }
  
  // Try with the format "* **Title:** CARD NAME**" - with more flexible whitespace
  if (cardSections.length <= 1) {
    cardSections = cleanedContent.split(/(?=\*\s*\*\*Title:\*\*\s*[^\n]*)/i);
    console.log(`More flexible Title format found ${cardSections.length} card sections`);
  }
  
  // Try with two consecutive newlines and an asterisk
  if (cardSections.length <= 1) {
    cardSections = cleanedContent.split(/\n\n\*/);
    console.log(`Double newline with asterisk format found ${cardSections.length} card sections`);
    
    // Need to add the asterisk back to all but first section
    if (cardSections.length > 1) {
      for (let i = 1; i < cardSections.length; i++) {
        cardSections[i] = `*${cardSections[i]}`;
      }
    }
  }
  
  // If numbered format without bold - "1. CARD NAME" or "XX. CARD NAME"
  if (cardSections.length <= 1) {
    cardSections = cleanedContent.split(/(?=\d+\.\s+[A-Z0-9\s\(\)\-\'\"]+)/g);
    console.log(`Numbered format found ${cardSections.length} card sections`);
  }
  
  // Try with the Flomanji gear cards format: "**X\. CARD NAME**" 
  if (cardSections.length <= 1) {
    cardSections = cleanedContent.split(/(?=\*\*\d+\\?\.\s+[A-Z0-9\s\(\)\-\'\"]+\*\*)/g);
    console.log(`Flomanji format found ${cardSections.length} card sections`);
  }
  
  // Try with header formats - "## CARD NAME" or "# CARD NAME"
  if (cardSections.length <= 1) {
    cardSections = cleanedContent.split(/(?=#{1,3}\s+[^#\n]+)/g);
    console.log(`Header format found ${cardSections.length} card sections`);
  }
  
  // Try with bold card names without numbers - "**CARD NAME**"
  if (cardSections.length <= 1) {
    cardSections = cleanedContent.split(/(?=\*\*[A-Z0-9\s\(\)\-\'\"]+\*\*)/g);
    console.log(`Bold name format found ${cardSections.length} card sections`);
  }
  
  // If we found multiple sections with any method, process them
  if (cardSections.length > 1) {
    console.log(`Processing ${cardSections.length} card sections`);
    
    for (let i = 0; i < cardSections.length; i++) {
      const section = cardSections[i].trim();
      if (!section) {
        console.log(`Section ${i+1} is empty, skipping`);
        continue;
      }
      
      console.log(`Processing section ${i+1}/${cardSections.length}, length: ${section.length}`);
      console.log(`Section preview: "${section.substring(0, Math.min(50, section.length))}..."`);
      
      // Try all possible title formats
      // First try the format: "* **Title:** CARD NAME" or "* **Title:** CARD NAME**"
      let titleMatch = section.match(/\*\s*\*\*Title:\*\*\s*([^\n]+)/i);
      let cardTitle = "";
      
      if (titleMatch) {
        // Extract the title but remove any trailing asterisks if present
        cardTitle = titleMatch[1].replace(/\*+$/g, '').trim();
        console.log(`Found card title from Title field: "${cardTitle}"`);
      } else {
        // Try Flomanji format: "**X\. CARD NAME**"
        titleMatch = section.match(/^\*\*(\d+\\?\.\s+[A-Z0-9\s\(\)\-\'\"]+)\*\*/);
        
        // If no match, try bold numbered pattern: "**X. CARD NAME**"
        if (!titleMatch) {
          titleMatch = section.match(/^\*\*(\d+\.\s+[A-Z0-9\s\(\)\-\'\"]+)\*\*/);
        }
        
        // If no match, try numbered pattern: "X. CARD NAME"
        if (!titleMatch) {
          titleMatch = section.match(/^(\d+\.\s+[A-Z0-9\s\(\)\-\'\"]+)/);
        }
        
        // If still no match, try header pattern: "## CARD NAME"
        if (!titleMatch) {
          titleMatch = section.match(/^(?:#{1,3})\s+([^\n]+)/);
        }
        
        // If still no match, try bold pattern: "**CARD NAME**" 
        if (!titleMatch) {
          titleMatch = section.match(/^\*\*([A-Z0-9\s\(\)\-\'\"]+)\*\*/);
        }
        
        // Fall back to first line if no specific pattern matches
        if (!titleMatch) {
          titleMatch = section.match(/^([^\n]+)/);
        }
        
        cardTitle = titleMatch ? titleMatch[1].trim() : "Unnamed Card";
        // Clean up the title
        cardTitle = cleanupTitle(cardTitle);
      }
      
      // Remove any trailing asterisks from title (common in the user's format)
      cardTitle = cardTitle.replace(/\*+$/, '').trim();
      
      console.log(`Final card title: "${cardTitle}"`);
      
      // Parse the card content into an object
      const card = parseCardSection(cardTitle, section);
      if (card) {
        cards.push(card);
        console.log(`Successfully added card: ${card.name}, ID: ${card.id}`);
      } else {
        console.log(`Failed to parse card for section with title: ${cardTitle}`);
        console.log(`Section content: ${section.substring(0, 200)}...`);
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
