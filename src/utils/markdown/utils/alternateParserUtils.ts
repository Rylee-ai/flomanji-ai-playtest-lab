
import { CardFormValues } from "@/types/forms/card-form";
import { v4 as uuidv4 } from 'uuid';
import { generateCardId, normalizeText } from "./textProcessing";

/**
 * Extracts a card title from a text chunk
 * @param chunk Text to extract title from
 * @returns Extracted title or empty string
 */
export const extractCardTitleFromChunk = (chunk: string): string => {
  const titleMatch = chunk.match(/^\*\s*\*\*Title:\*\*\s*([^\n]+)/i) || 
                    chunk.match(/^\*\*(\d+\.\s+[^\*]+)\*\*/) ||
                    chunk.match(/^(\d+\.\s+[^\n]+)/);
  
  if (titleMatch) {
    return titleMatch[1].replace(/\*+$/, '').trim().replace(/\*\*/g, '');
  }
  
  // If no pattern matches, use first line as title
  return chunk.split('\n')[0].trim().replace(/\*\*/g, '');
};

/**
 * Determines if a chunk likely contains card field data
 * @param chunk Text chunk to analyze
 * @returns Boolean indicating if this looks like card data
 */
export const isCardFieldChunk = (chunk: string): boolean => {
  return /type:/i.test(chunk) || 
         /icon/i.test(chunk) || 
         /keywords:/i.test(chunk) || 
         /rules:/i.test(chunk) || 
         /flavor:/i.test(chunk) ||
         /image prompt:/i.test(chunk);
};

/**
 * Detects the card type from text content
 * @param cardText Full card text content
 * @returns Detected card type and category
 */
export const detectCardTypeFromText = (cardText: string): { type: string, category?: string } => {
  const typeMatch = cardText.match(/type:\s*([^\n]+)/i);
  
  if (!typeMatch) {
    return { type: 'gear', category: 'tool' }; // Default
  }
  
  const typeText = typeMatch[1].toLowerCase().trim();
  
  if (typeText.includes('gear')) {
    let category = 'tool'; // Default category
    
    // Detect specific gear categories
    if (typeText.includes('consumable')) {
      category = 'consumable';
    } else if (typeText.includes('weapon')) {
      category = 'weapon';
    } else if (typeText.includes('passive') || typeText.includes('combo')) {
      category = 'tool';
    } else if (typeText.includes('one-time use') || typeText.includes('one time use')) {
      category = 'consumable';
    }
    
    return { type: 'gear', category };
  } else if (typeText.includes('hazard')) {
    return { type: 'hazard' };
  } else if (typeText.includes('treasure')) {
    return { type: 'treasure' };
  } else {
    return { type: 'gear', category: 'tool' }; // Default
  }
};

/**
 * Extracts keywords from card text
 * @param cardText Full card text
 * @returns Array of keywords
 */
export const extractKeywordsFromText = (cardText: string): string[] => {
  const keywordsMatch = cardText.match(/keywords:\s*([^\n]+)/i);
  return keywordsMatch 
    ? keywordsMatch[1].split(',').map(k => k.trim()) 
    : [];
};

/**
 * Extracts rules text from card content
 * @param cardText Full card text
 * @returns Array of rules strings
 */
export const extractRulesFromText = (cardText: string): string[] => {
  const rulesMatch = cardText.match(/rules:\s*([^\n]+)/i);
  return rulesMatch 
    ? [rulesMatch[1].trim()]
    : [];
};

/**
 * Extracts flavor text from card content
 * @param cardText Full card text
 * @returns Flavor text or undefined
 */
export const extractFlavorFromText = (cardText: string): string | undefined => {
  const flavorMatch = cardText.match(/flavor:\s*([^\n]+)/i);
  return flavorMatch ? flavorMatch[1].trim() : undefined;
};

/**
 * Extracts image prompt from card content
 * @param cardText Full card text
 * @returns Image prompt or undefined
 */
export const extractImagePromptFromText = (cardText: string): string | undefined => {
  const imagePromptMatch = cardText.match(/image\s*prompt:\s*([^\n]+)/i);
  return imagePromptMatch ? imagePromptMatch[1].trim() : undefined;
};

/**
 * Extracts icons from card content
 * @param cardText Full card text
 * @returns Array of icon objects
 */
export const extractIconsFromText = (cardText: string): Array<{symbol: string, meaning: string}> => {
  const iconMatch = cardText.match(/icon\(s\):\s*([^\n]+)/i);
  
  if (!iconMatch) return [];
  
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
  
  return icons;
};
