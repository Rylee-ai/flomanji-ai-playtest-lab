
import { CardFormValues } from "@/types/forms/card-form";
import { extractTypeInfo, extractIconInfo, extractKeywordInfo, extractRulesInfo, extractFlavorInfo, extractImagePromptInfo } from "./extractors";

/**
 * Parse markdown content into an array of card objects
 * @param markdownContent Raw markdown content containing card definitions
 * @returns Array of card objects parsed from the markdown
 */
export const parseMarkdownCards = (markdownContent: string): CardFormValues[] => {
  console.log("Beginning markdown parsing...");
  
  // Split the content into individual card sections
  const cardSections = markdownContent
    .split(/^#\s+/m)
    .filter(section => section.trim().length > 0);
  
  if (cardSections.length === 0) {
    console.warn("No card sections found in markdown");
    return [];
  }
  
  console.log(`Found ${cardSections.length} potential card sections`);
  
  // Parse each card section
  const cards: CardFormValues[] = [];
  
  for (const section of cardSections) {
    try {
      // Extract card name from first line
      const lines = section.split('\n');
      const name = lines[0].trim();
      
      // Generate a safe ID from the name
      const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      // Create the basic card
      const card: Partial<CardFormValues> = {
        id,
        name,
      };
      
      // Extract key information using specialized extractors
      const typeInfo = extractTypeInfo(section);
      const iconInfo = extractIconInfo(section);
      const keywordInfo = extractKeywordInfo(section);
      const rulesInfo = extractRulesInfo(section);
      const flavorInfo = extractFlavorInfo(section);
      const imagePromptInfo = extractImagePromptInfo(section);
      
      // Apply all extracted information
      Object.assign(card, typeInfo, iconInfo, keywordInfo, rulesInfo, flavorInfo, imagePromptInfo);
      
      // Only add cards that have at least a name and type
      if (card.name && card.type) {
        cards.push(card as CardFormValues);
      } else {
        console.warn(`Skipping card with incomplete data: ${card.name || 'unnamed'}`);
      }
    } catch (error) {
      console.error("Error parsing card section:", error);
      // Continue to the next card section
    }
  }
  
  console.log(`Successfully parsed ${cards.length} cards from markdown`);
  return cards;
};
