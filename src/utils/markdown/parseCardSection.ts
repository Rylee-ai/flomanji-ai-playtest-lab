
import { CardFormValues } from "@/types/forms/card-form";
import { cleanupTitle } from "./cardTypeMappers";
import { generateCardId } from "./utils/textProcessing";
import {
  extractTypeInfo,
  extractIconInfo,
  extractKeywordInfo,
  extractRulesInfo,
  extractFlavorInfo,
  extractImagePromptInfo
} from "./extractors/fieldExtractors";

/**
 * Parse a specific section of markdown text into a card object
 * Specialized for Flomanji card format with trailing asterisks and specific formatting
 * @param title The card title extracted from the section
 * @param content The full section content
 * @returns A card object with extracted data
 */
export const parseCardSection = (title: string, content: string): CardFormValues | null => {
  console.log(`Parsing card section for "${title}"`);
  
  if (!content) {
    console.log("Empty content provided");
    return null;
  }
  
  // Clean up all possible formats of title including trailing asterisks
  const cleanTitle = cleanupTitle(title);
  
  // Generate a unique ID
  const cardId = generateCardId(cleanTitle);
  
  // Initialize card with basic data
  let card: Partial<CardFormValues> = {
    id: cardId,
    name: cleanTitle,
    keywords: [],
    rules: [],
    icons: []
  };
  
  // Extract all card fields using specialized extractors
  card = extractTypeInfo(content, card);
  card = extractIconInfo(content, card);
  card = extractKeywordInfo(content, card);
  card = extractRulesInfo(content, card);
  card = extractFlavorInfo(content, card);
  card = extractImagePromptInfo(content, card);

  // For gear cards, ensure they have a category
  if (card.type === 'gear' && !card.category) {
    // Map "passive" to "tool" as per the user's format
    if (content.toLowerCase().includes('passive')) {
      card.category = 'tool';
      console.log(`Setting 'tool' category for Passive gear card: ${card.name}`);
    } else if (content.toLowerCase().includes('combo')) {
      card.category = 'tool';
      console.log(`Setting 'tool' category for Combo gear card: ${card.name}`);
    } else if (content.toLowerCase().includes('one-time use') || content.toLowerCase().includes('one time use')) {
      card.category = 'consumable';
      console.log(`Setting 'consumable' category for One-Time Use gear card: ${card.name}`);
    } else {
      console.log(`Setting default category 'tool' for gear card: ${card.name}`);
      card.category = 'tool';
    }
  }
  
  console.log(`Successfully parsed card: ${card.name}, type: ${card.type}, category: ${(card as any).category || 'N/A'}`);
  return card as CardFormValues;
};
