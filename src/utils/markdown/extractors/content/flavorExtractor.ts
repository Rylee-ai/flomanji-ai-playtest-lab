
import { CardFormValues } from "@/types/forms/card-form";

/**
 * Extracts and processes the card flavor text from content
 * @param content The card section content
 * @param card The card object being built
 * @returns Updated card object with flavor text
 */
export const extractFlavorInfo = (content: string, card: Partial<CardFormValues>): Partial<CardFormValues> => {
  const flavorMatch = content.match(/\*\s*\*\*Flavor:\*\*\s*([\s\S]*?)(?=\*\s*\*\*(?!Flavor)|$)/i) || 
                     content.match(/Flavor:\s*([\s\S]*?)(?=\*\s*\*\*|$)/i) ||
                     content.match(/\*\s*Flavor:\s*([\s\S]*?)(?=\*\s*\*\*|$)/i);
  
  if (flavorMatch) {
    let flavorText = flavorMatch[1].trim()
                   .replace(/^\s*\*\s*/gm, '')  // Remove bullet points
                   .replace(/\n+/g, ' ');       // Join multiple lines
    
    // Clean up quotes and asterisks if present
    flavorText = flavorText.replace(/^\*|^\"|\"$|\*$/g, '').trim();
    flavorText = flavorText.replace(/\*\*/g, '').trim();
    
    console.log(`Found flavor text: "${flavorText.substring(0, Math.min(50, flavorText.length))}..."`);
    card.flavor = flavorText;
  }
  
  return card;
};
