import { CardFormValues } from "@/types/forms/card-form";
import { v4 as uuidv4 } from 'uuid';
import { mapGearCategory } from "./cardTypeMappers";

/**
 * Alternative parsing approach for when the main parser fails
 * This uses a more lenient, line-by-line approach to identify card data
 * @param markdownContent Raw markdown content from a file
 * @returns An array of parsed card objects
 */
export const parseMarkdownCardsAlternate = (markdownContent: string): CardFormValues[] => {
  console.log("Using alternate markdown parsing approach");
  const cards: CardFormValues[] = [];
  
  // Normalize line endings and clean up content
  const cleanedContent = markdownContent
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n');
  
  // Split into logical chunks
  const chunks = cleanedContent.split(/\n\n+/);
  console.log(`Alternate parser found ${chunks.length} chunks`);

  // Process each chunk as a potential card
  let currentCard: Partial<CardFormValues> | null = null;
  let cardContentBuffer: string[] = [];

  // Function to create a card from collected buffer
  const finalizeCurrentCard = () => {
    if (!currentCard || !currentCard.name) return;
    
    const cardText = cardContentBuffer.join("\n");
    console.log(`Finalizing card from buffer: ${currentCard.name}`);
    
    // Extract Type
    const typeMatch = cardText.match(/type:\s*([^\n]+)/i);
    if (typeMatch) {
      const typeText = typeMatch[1].toLowerCase().trim();
      
      if (typeText.includes('gear')) {
        currentCard.type = 'gear';
        // Detect category
        if (typeText.includes('consumable')) {
          currentCard.category = 'consumable';
        } else if (typeText.includes('weapon')) {
          currentCard.category = 'weapon';
        } else if (typeText.includes('passive') || typeText.includes('combo')) {
          currentCard.category = 'tool';
        } else {
          currentCard.category = 'tool'; // Default
        }
      } else if (typeText.includes('hazard')) {
        currentCard.type = 'hazard';
      } else if (typeText.includes('treasure')) {
        currentCard.type = 'treasure';
      } else {
        currentCard.type = 'gear'; // Default
        currentCard.category = 'tool'; // Default 
      }
    } else {
      currentCard.type = 'gear'; // Default if no type found
      currentCard.category = 'tool';
    }
    
    // Extract Keywords
    const keywordsMatch = cardText.match(/keywords:\s*([^\n]+)/i);
    if (keywordsMatch) {
      currentCard.keywords = keywordsMatch[1].split(',').map(k => k.trim());
    } else {
      currentCard.keywords = [];
    }
    
    // Extract Rules
    const rulesMatch = cardText.match(/rules:\s*([^\n]+)/i);
    if (rulesMatch) {
      currentCard.rules = [rulesMatch[1].trim()];
    } else {
      currentCard.rules = [];
    }
    
    // Extract Flavor
    const flavorMatch = cardText.match(/flavor:\s*([^\n]+)/i);
    if (flavorMatch) {
      currentCard.flavor = flavorMatch[1].trim();
    }
    
    // Extract Image Prompt
    const imagePromptMatch = cardText.match(/image\s*prompt:\s*([^\n]+)/i);
    if (imagePromptMatch) {
      currentCard.imagePrompt = imagePromptMatch[1].trim();
    }
    
    // Extract Icons
    const iconMatch = cardText.match(/icon\(s\):\s*([^\n]+)/i);
    if (iconMatch) {
      const iconText = iconMatch[1];
      const icons = [];
      
      // Match any text in brackets
      const bracketMatches = iconText.match(/\[([^\]]+)\]/g);
      if (bracketMatches) {
        bracketMatches.forEach(match => {
          const iconName = match.replace(/[\[\]]/g, '').trim();
          icons.push({ symbol: iconName, meaning: iconName });
        });
      }
      
      if (icons.length > 0) {
        currentCard.icons = icons;
      } else {
        currentCard.icons = [];
      }
    } else {
      currentCard.icons = [];
    }
    
    // Ensure ID exists
    if (!currentCard.id) {
      const safeName = currentCard.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      currentCard.id = `card-${safeName}-${uuidv4().slice(0, 8)}`;
    }
    
    // Add the card to the collection
    cards.push(currentCard as CardFormValues);
    console.log(`Added card: ${currentCard.name}`);
    
    // Reset for next card
    currentCard = null;
    cardContentBuffer = [];
  };

  for (const chunk of chunks) {
    const trimmedChunk = chunk.trim();
    if (!trimmedChunk) continue;
    
    // Check if this chunk starts a new card
    const titleMatch = trimmedChunk.match(/^\*\s*\*\*Title:\*\*\s*([^\n]+)/i) || 
                        trimmedChunk.match(/^\*\*(\d+\.\s+[^\n]+)/i) ||
                        trimmedChunk.match(/^(\d+\.\s+[^\n]+)/);
    
    if (titleMatch) {
      // Finalize previous card if any
      if (currentCard) {
        finalizeCurrentCard();
      }
      
      // Start new card
      const cardTitle = titleMatch[1].replace(/\*+$/, '').trim();
      console.log(`Found card title in alternate parser: "${cardTitle}"`);
      
      currentCard = {
        name: cardTitle.replace(/\*\*/g, ''),
        id: `card-${cardTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${uuidv4().slice(0, 8)}`
      };
      
      // Add the chunk to the buffer
      cardContentBuffer.push(trimmedChunk);
    }
    // If we have a current card and this chunk has card-like content
    else if (currentCard && (
      /type:/i.test(trimmedChunk) || 
      /icon/i.test(trimmedChunk) || 
      /keywords:/i.test(trimmedChunk) || 
      /rules:/i.test(trimmedChunk) || 
      /flavor:/i.test(trimmedChunk) ||
      /image prompt:/i.test(trimmedChunk)
    )) {
      cardContentBuffer.push(trimmedChunk);
    }
    // If this might be a standalone card with just a name
    else if (!currentCard && trimmedChunk) {
      // Start a new card with just the chunk as name
      currentCard = {
        name: trimmedChunk.replace(/\*\*/g, '').trim(),
        id: `card-${trimmedChunk.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${uuidv4().slice(0, 8)}`
      };
      cardContentBuffer.push(trimmedChunk);
    }
    // Otherwise add to current card buffer if we have one
    else if (currentCard) {
      cardContentBuffer.push(trimmedChunk);
    }
  }
  
  // Finalize the last card if any
  if (currentCard) {
    finalizeCurrentCard();
  }
  
  console.log(`Alternate parser found ${cards.length} cards`);
  return cards;
};
