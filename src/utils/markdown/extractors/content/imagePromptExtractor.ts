
import { CardFormValues } from "@/types/forms/card-form";

/**
 * Extracts and processes the card image prompt from content
 * @param content The card section content
 * @param card The card object being built
 * @returns Updated card object with image prompt
 */
export const extractImagePromptInfo = (content: string, card: Partial<CardFormValues>): Partial<CardFormValues> => {
  const imagePromptMatch = content.match(/\*\s*\*\*Image\s*Prompt:\*\*\s*([\s\S]*?)(?=\*\s*\*\*(?!Image)|$)/i) || 
                          content.match(/Image\s*Prompt:\s*([\s\S]*?)(?=\*\s*\*\*|$)/i) ||
                          content.match(/\*\s*Image\s*Prompt:\s*([\s\S]*?)(?=\*\s*\*\*|$)/i);
  
  if (imagePromptMatch) {
    const imagePrompt = imagePromptMatch[1].trim()
                      .replace(/^\s*\*\s*/gm, '') // Remove bullet points
                      .replace(/\n+/g, ' ')       // Join multiple lines
                      .replace(/\*\*/g, '');      // Remove any remaining markdown
    
    console.log(`Found image prompt: "${imagePrompt.substring(0, Math.min(50, imagePrompt.length))}..."`);
    card.imagePrompt = imagePrompt;
  }
  
  return card;
};
