
import { CardType } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { mapGearCategory } from "./cardTypeMappers";

/**
 * Parse an individual card section of markdown content
 * @param title The card title extracted from the markdown
 * @param content The content for this card section
 * @returns A parsed card object
 */
export const parseCardSection = (title: string, content: string): CardFormValues | null => {
  if (!content) return null;
  
  console.log("Parsing card section:", title);
  
  // Initialize default card values
  const card: Partial<CardFormValues> = {
    name: title,
    icons: [],
    keywords: [],
    rules: [],
  };
  
  // Extract properties from bullet points using regex
  const typeMatch = content.match(/\*\s*\*\*Type:\*\*\s*(.*?)(?:\n|$)/);
  const iconsMatch = content.match(/\*\s*\*\*Icon\(s\):\*\*\s*(.*?)(?:\n|$)/);
  const keywordsMatch = content.match(/\*\s*\*\*Keywords:\*\*\s*(.*?)(?:\n|$)/);
  const rulesMatch = content.match(/\*\s*\*\*Rules:\*\*\s*(.*?)(?:\n|$)/);
  const flavorMatch = content.match(/\*\s*\*\*Flavor:\*\*\s*(.*?)(?:\n|$)/);
  const imagePromptMatch = content.match(/\*\s*\*\*Image Prompt:\*\*\s*(.*?)(?:\n|$)/);
  
  // Fallback patterns without asterisks
  const typeMatchAlt = !typeMatch ? content.match(/Type:\s*(.*?)(?:\n|$)/i) : null;
  const keywordsMatchAlt = !keywordsMatch ? content.match(/Keywords:\s*(.*?)(?:\n|$)/i) : null;
  const rulesMatchAlt = !rulesMatch ? content.match(/Rules:\s*(.*?)(?:\n|$)/i) : null;
  const flavorMatchAlt = !flavorMatch ? content.match(/Flavor:\s*(.*?)(?:\n|$)/i) : null;
  
  // Process card type (e.g., "GEAR – Consumable" -> "gear")
  if (typeMatch || typeMatchAlt) {
    const typeText = (typeMatch || typeMatchAlt)[1].trim();
    const baseType = typeText.split('–')[0].trim().toLowerCase();
    
    // Map to our internal card type
    const cardType = baseType.includes('gear') ? 'gear' as CardType :
                     baseType.includes('treasure') ? 'treasure' as CardType :
                     baseType.includes('hazard') ? 'hazard' as CardType :
                     'gear' as CardType; // Default to gear if unknown
                     
    card.type = cardType;
    
    // For gear cards, extract the category
    if (cardType === 'gear' && typeText.includes('–')) {
      const categoryText = typeText.split('–')[1].trim().toLowerCase();
      card.category = mapGearCategory(categoryText);
    }
  }
  
  // Process icons
  if (iconsMatch) {
    const iconsText = iconsMatch[1].trim();
    const iconMatches = iconsText.match(/\[(.+?)\]/g);
    
    if (iconMatches) {
      card.icons = iconMatches.map(match => {
        const iconName = match.replace(/\[|\]/g, '').replace(' Icon', '');
        return {
          symbol: iconName,
          meaning: iconName
        };
      });
    }
  }
  
  // Process keywords
  if (keywordsMatch || keywordsMatchAlt) {
    const keywordsText = (keywordsMatch || keywordsMatchAlt)[1].trim();
    card.keywords = keywordsText.split(/,\s*/).map(k => k.trim());
  }
  
  // Process rules text
  if (rulesMatch || rulesMatchAlt) {
    const rulesText = (rulesMatch || rulesMatchAlt)[1].trim();
    card.rules = [rulesText];
  }
  
  // Process flavor text
  if (flavorMatch || flavorMatchAlt) {
    card.flavor = (flavorMatch || flavorMatchAlt)[1].trim().replace(/^\*|\'|\"|\*$/g, '');
  }
  
  // Process image prompt
  if (imagePromptMatch) {
    card.imagePrompt = imagePromptMatch[1].trim();
  }
  
  // Log any missing required fields
  if (!card.type) {
    console.warn(`Card ${title} is missing type`);
  }
  
  return card as CardFormValues;
};
