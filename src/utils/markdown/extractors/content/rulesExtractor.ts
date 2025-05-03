
import { CardFormValues } from "@/types/forms/card-form";

/**
 * Extracts and processes the card rules information from content
 * @param content The card section content
 * @param card The card object being built
 * @returns Updated card object with rules information
 */
export const extractRulesInfo = (content: string, card: Partial<CardFormValues>): Partial<CardFormValues> => {
  const rulesMatch = content.match(/\*\s*\*\*Rules:\*\*\s*([\s\S]*?)(?=\*\s*\*\*(?!Rules)|$)/i) || 
                    content.match(/Rules:\s*([\s\S]*?)(?=\*\s*\*\*|$)/i) ||
                    content.match(/\*\s*Rules:\s*([\s\S]*?)(?=\*\s*\*\*|$)/i);
  
  if (rulesMatch) {
    let rulesText = rulesMatch[1].trim()
                    .replace(/^\s*\*\s*/gm, '') // Remove bullet points
                    .replace(/\n+/g, ' ');      // Join multiple lines
    
    // Clean up any markdown formatting artifacts
    rulesText = rulesText.replace(/\*\*/g, '').trim();
    
    console.log(`Found rules: "${rulesText.substring(0, Math.min(50, rulesText.length))}..."`);
    card.rules = [rulesText];
  }
  
  return card;
};
