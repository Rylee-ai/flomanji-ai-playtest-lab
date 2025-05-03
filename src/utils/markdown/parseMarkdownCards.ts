
import { CardFormValues } from "@/types/forms/card-form";
import { parseCardSection } from "./parseCardSection";
import { parseMarkdownCardsAlternate } from "./parseMarkdownCardsAlternate";
import { cleanupTitle, extractCardNumber } from "./cardTypeMappers";
import { v4 as uuidv4 } from 'uuid';

/**
 * Parses a Markdown file containing card data and converts it to our internal card format
 * Specialized to handle both numbered formats (23. CARD NAME) and asterisked titles (* **Title:** CARD NAME**)
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
  
  // First attempt: Try the Flomanji specific format: "* **Title:** CARD NAME**" (with trailing asterisks)
  const flomanjiPattern = /\*\s*\*\*Title:\*\*\s*([^\n]+)(?:\*\*)?/gi;
  let matches = [...cleanedContent.matchAll(flomanjiPattern)];
  
  if (matches.length > 0) {
    console.log(`Found ${matches.length} cards with Flomanji title pattern`);
    
    // Split by the title pattern
    let cardSections = cleanedContent.split(/(?=\*\s*\*\*Title:\*\*)/i);
    
    // Filter out any empty sections
    cardSections = cardSections.filter(section => section.trim());
    
    console.log(`Processing ${cardSections.length} card sections from Flomanji format`);
    
    for (let i = 0; i < cardSections.length; i++) {
      const section = cardSections[i].trim();
      if (!section) continue;
      
      // Extract the title - handle the case with trailing asterisks
      const titleMatch = section.match(/\*\s*\*\*Title:\*\*\s*([^\n]+)/i);
      
      if (titleMatch) {
        // Clean the title by removing trailing asterisks
        let cardTitle = titleMatch[1].trim().replace(/\*+$/, '');
        console.log(`Found card ${i+1}: "${cardTitle}"`);
        
        // Parse the card content
        const card = parseCardSection(cardTitle, section);
        if (card) {
          cards.push(card);
        }
      }
    }
  }
  
  // Second attempt: Try the numbered format: "23. CARD NAME" or "**23. CARD NAME**"
  if (cards.length === 0) {
    console.log("Trying numbered format pattern");
    
    // Look for both bold numbered patterns and regular numbered patterns
    const numberedSections = cleanedContent.split(/(?=\*\*\d+\.\s+|\d+\.\s+)/g);
    
    // Filter out empty sections
    const filteredSections = numberedSections.filter(section => section.trim());
    
    console.log(`Found ${filteredSections.length} numbered sections`);
    
    if (filteredSections.length > 0) {
      for (let i = 0; i < filteredSections.length; i++) {
        const section = filteredSections[i].trim();
        if (!section) continue;
        
        // Extract the title from numbered format
        const boldTitleMatch = section.match(/^\*\*(\d+\.\s+[^\*]+)\*\*/);
        const plainTitleMatch = section.match(/^(\d+\.\s+[^\n]+)/);
        
        let cardTitle = "";
        if (boldTitleMatch) {
          cardTitle = boldTitleMatch[1].trim();
        } else if (plainTitleMatch) {
          cardTitle = plainTitleMatch[1].trim();
        } else {
          // If no pattern matches, use first line as title
          cardTitle = section.split('\n')[0].trim();
        }
        
        console.log(`Processing numbered section ${i+1}: "${cardTitle}"`);
        
        // Parse the card content
        const card = parseCardSection(cardTitle, section);
        if (card) {
          cards.push(card);
        }
      }
    }
  }
  
  // Final attempt: Try double-newline splits with sophisticated pattern recognition
  if (cards.length === 0) {
    console.log("Using advanced section splitting with pattern recognition");
    
    // Split by double newlines and try to detect card patterns in each chunk
    const chunks = cleanedContent.split(/\n\n+/);
    let currentCardContent = "";
    let currentTitle = "";
    let inCardSection = false;
    
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i].trim();
      if (!chunk) continue;
      
      // Check if this chunk looks like a new card start
      const titleMatch = chunk.match(/^\*\s*\*\*Title:\*\*\s*([^\n]+)/i) || 
                          chunk.match(/^\*\*(\d+\.\s+[^\*]+)\*\*/) || 
                          chunk.match(/^(\d+\.\s+[^\n]+)/);
      
      // If we found a new title and we were already in a card section
      if (titleMatch && inCardSection && currentCardContent) {
        // Process the previous card
        const card = parseCardSection(currentTitle, currentCardContent);
        if (card) {
          cards.push(card);
          console.log(`Added card from chunk processing: ${card.name}`);
        }
        
        // Start a new card
        currentTitle = titleMatch[1].replace(/\*+$/, '').trim();
        currentCardContent = chunk;
        inCardSection = true;
      } 
      // If we found a new title and weren't tracking a card yet
      else if (titleMatch && !inCardSection) {
        currentTitle = titleMatch[1].replace(/\*+$/, '').trim();
        currentCardContent = chunk;
        inCardSection = true;
      } 
      // If we're in a card section and this chunk contains card data
      else if (inCardSection) {
        // Check if this chunk belongs to the current card (contains card fields)
        const isCardField = /\*\s*\*\*(?:Type|Icon|Keywords|Rules|Flavor):/i.test(chunk);
        
        if (isCardField) {
          // Add to current card content
          currentCardContent += "\n\n" + chunk;
        } else {
          // This might be the start of a new card without a clear title pattern
          // Process the previous card first
          const card = parseCardSection(currentTitle, currentCardContent);
          if (card) {
            cards.push(card);
            console.log(`Added card from field detection: ${card.name}`);
          }
          
          // Start tracking a potential new card
          currentTitle = chunk.split('\n')[0].trim();
          currentCardContent = chunk;
        }
      }
    }
    
    // Process the final card if we were tracking one
    if (inCardSection && currentCardContent) {
      const card = parseCardSection(currentTitle, currentCardContent);
      if (card) {
        cards.push(card);
        console.log(`Added final card from chunk processing: ${card.name}`);
      }
    }
  }
  
  console.log(`Total cards parsed with standard method: ${cards.length}`);
  
  // If we failed to parse cards with any method, try a fallback approach
  if (cards.length === 0) {
    console.log("All standard parsing methods failed, using alternate parsing method");
    return parseMarkdownCardsAlternate(markdownContent);
  }
  
  return cards;
};
