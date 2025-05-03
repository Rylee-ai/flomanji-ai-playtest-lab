
import { CardFormValues } from "@/types/forms/card-form";

/**
 * Extracts and processes the card keywords information from content
 * @param content The card section content
 * @param card The card object being built
 * @returns Updated card object with keyword information
 */
export const extractKeywordInfo = (content: string, card: Partial<CardFormValues>): Partial<CardFormValues> => {
  const keywordMatch = content.match(/\*\s*\*\*Keywords:\*\*\s*([^\n]+)/i) || 
                      content.match(/Keywords:\s*([^\n]+)/i) || 
                      content.match(/\*\s*Keywords:\s*([^\n]+)/i);
  
  if (keywordMatch) {
    const keywordsText = keywordMatch[1].trim();
    console.log(`Found keywords: "${keywordsText}"`);
    // Split by commas and clean up each keyword
    card.keywords = keywordsText.split(/,\s*/).map(k => k.trim()).filter(k => k);
    console.log(`Extracted ${card.keywords.length} keywords`);
  }
  
  return card;
};
