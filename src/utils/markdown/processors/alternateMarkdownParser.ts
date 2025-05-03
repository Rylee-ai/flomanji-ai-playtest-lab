import { CardFormValues } from "@/types/forms/card-form";
import { v4 as uuidv4 } from 'uuid';
import { 
  extractCardTitleFromChunk,
  isCardFieldChunk,
  detectCardTypeFromText,
  extractKeywordsFromText,
  extractRulesFromText,
  extractFlavorFromText,
  extractImagePromptFromText,
  extractIconsFromText
} from "../utils/alternateParserUtils";
import { normalizeText } from "../utils/textProcessing";

/**
 * Processes the collected content of a card into a structured card object
 * @param currentCard Partial card object with at least name and id
 * @param cardContentBuffer Array of content chunks for this card
 * @returns Complete card object or null if invalid
 */
export const finalizeCardFromBuffer = (
  currentCard: Partial<CardFormValues>, 
  cardContentBuffer: string[]
): CardFormValues | null => {
  if (!currentCard || !currentCard.name) return null;
  
  const cardText = cardContentBuffer.join("\n");
  console.log(`Finalizing card from buffer: ${currentCard.name}`);
  
  // Extract Type and Category
  const { type, category } = detectCardTypeFromText(cardText);
  currentCard.type = type as any;
  if (category) {
    currentCard.category = category as any;
  }
  
  // Extract Keywords
  currentCard.keywords = extractKeywordsFromText(cardText);
  
  // Extract Rules
  currentCard.rules = extractRulesFromText(cardText);
  
  // Extract Flavor
  currentCard.flavor = extractFlavorFromText(cardText);
  
  // Extract Image Prompt
  currentCard.imagePrompt = extractImagePromptFromText(cardText);
  
  // Extract Icons
  currentCard.icons = extractIconsFromText(cardText);
  
  // Ensure ID exists
  if (!currentCard.id) {
    const safeName = currentCard.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    currentCard.id = `card-${safeName}-${uuidv4().slice(0, 8)}`;
  }
  
  return currentCard as CardFormValues;
};

/**
 * Parses a markdown chunk to determine if it starts a new card
 * @param chunk Text chunk to analyze
 * @returns Boolean indicating if this starts a new card
 */
export const isNewCardStart = (chunk: string): boolean => {
  const titleMatch = chunk.match(/^\*\s*\*\*Title:\*\*\s*([^\n]+)/i) || 
                    chunk.match(/^\*\*(\d+\.\s+[^\n]+)/i) ||
                    chunk.match(/^(\d+\.\s+[^\n]+)/);
  
  return !!titleMatch;
};

/**
 * Process chunks of markdown text into cards using the alternate approach
 * @param chunks Array of text chunks from the markdown
 * @returns Array of parsed card objects
 */
export const processMarkdownChunks = (chunks: string[]): CardFormValues[] => {
  const cards: CardFormValues[] = [];
  let currentCard: Partial<CardFormValues> | null = null;
  let cardContentBuffer: string[] = [];
  
  // Process each chunk as a potential card section
  for (const chunk of chunks) {
    const trimmedChunk = chunk.trim();
    if (!trimmedChunk) continue;
    
    // Check if this chunk starts a new card
    if (isNewCardStart(trimmedChunk)) {
      // Finalize previous card if any
      if (currentCard) {
        const finalizedCard = finalizeCardFromBuffer(currentCard, cardContentBuffer);
        if (finalizedCard) {
          cards.push(finalizedCard);
        }
      }
      
      // Start new card
      const cardTitle = extractCardTitleFromChunk(trimmedChunk);
      console.log(`Found card title in alternate parser: "${cardTitle}"`);
      
      currentCard = {
        name: cardTitle,
        id: `card-${cardTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${uuidv4().slice(0, 8)}`
      };
      
      // Add the chunk to the buffer
      cardContentBuffer = [trimmedChunk];
    }
    // If we have a current card and this chunk has card-like content
    else if (currentCard && isCardFieldChunk(trimmedChunk)) {
      cardContentBuffer.push(trimmedChunk);
    }
    // If this might be a standalone card with just a name
    else if (!currentCard && trimmedChunk) {
      // Start a new card with just the chunk as name
      currentCard = {
        name: trimmedChunk.replace(/\*\*/g, '').trim(),
        id: `card-${trimmedChunk.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${uuidv4().slice(0, 8)}`
      };
      cardContentBuffer = [trimmedChunk];
    }
    // Otherwise add to current card buffer if we have one
    else if (currentCard) {
      cardContentBuffer.push(trimmedChunk);
    }
  }
  
  // Finalize the last card if any
  if (currentCard) {
    const finalizedCard = finalizeCardFromBuffer(currentCard, cardContentBuffer);
    if (finalizedCard) {
      cards.push(finalizedCard);
    }
  }
  
  return cards;
};
