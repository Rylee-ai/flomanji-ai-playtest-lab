
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
  
  console.log(`Parsing card section for: "${title}"`);
  
  // Clean up the title (remove markdown markers, numbers, asterisks, backslashes)
  const cleanTitle = title.replace(/^[#\d\.\*\-\s\\]+/, '').trim().replace(/\*\*$/, '').replace(/^\*\*/, '');
  
  // Generate a unique ID for this card based on name and timestamp
  const uniqueId = `gear-${cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString(36).substring(4)}`;
  
  // Initialize default card values
  const card: Partial<CardFormValues> = {
    id: uniqueId,
    name: cleanTitle,
    icons: [],
    keywords: [],
    rules: [],
    type: 'gear', // Default type for current context
    category: 'tool', // Default category
  };
  
  // Extract properties using various patterns
  // Try multiple patterns for each property to increase matching chances
  
  // Type patterns - handle various formats in the Flomanji cards
  const typePatterns = [
    /\*\s*\*\*Type:\*\*\s*([\s\S]*?)(?=\*\s*\*\*|$)/i,
    /Type:\s*([\s\S]*?)(?=\*\s*|$)/i,
    /\*\s*Type:\s*([\s\S]*?)(?=\*\s*|$)/i,
  ];
  
  // Icon patterns
  const iconPatterns = [
    /\*\s*\*\*Icon(?:s|\(s\)):\*\*\s*([\s\S]*?)(?=\*\s*\*\*|$)/i,
    /Icon(?:s|\(s\)):\s*([\s\S]*?)(?=\*\s*|$)/i,
    /\*\s*Icon(?:s|\(s\)):\s*([\s\S]*?)(?=\*\s*|$)/i,
  ];
  
  // Keyword patterns
  const keywordPatterns = [
    /\*\s*\*\*Keywords:\*\*\s*([\s\S]*?)(?=\*\s*\*\*|$)/i,
    /Keywords:\s*([\s\S]*?)(?=\*\s*|$)/i,
    /\*\s*Keywords:\s*([\s\S]*?)(?=\*\s*|$)/i,
  ];
  
  // Rules patterns - these need to capture multi-line content
  const rulesPatterns = [
    /\*\s*\*\*Rules:\*\*\s*([\s\S]*?)(?=\*\s*\*\*|$)/i,
    /Rules:\s*([\s\S]*?)(?=\*\s*|$)/i,
    /\*\s*Rules:\s*([\s\S]*?)(?=\*\s*|$)/i,
  ];
  
  // Flavor patterns - these may also be multi-line
  const flavorPatterns = [
    /\*\s*\*\*Flavor(?:\s*Text)?:\*\*\s*([\s\S]*?)(?=\*\s*\*\*|$)/i,
    /Flavor(?:\s*Text)?:\s*([\s\S]*?)(?=\*\s*|$)/i,
    /\*\s*Flavor(?:\s*Text)?:\s*([\s\S]*?)(?=\*\s*|$)/i,
  ];
  
  // Image prompt patterns
  const imagePromptPatterns = [
    /\*\s*\*\*Image(?:\s*Prompt)?:\*\*\s*([\s\S]*?)(?=\*\s*\*\*|$)/i,
    /Image(?:\s*Prompt)?:\s*([\s\S]*?)(?=\*\s*|$)/i,
    /\*\s*Image(?:\s*Prompt)?:\s*([\s\S]*?)(?=\*\s*|$)/i,
  ];
  
  // Try each pattern until we find a match
  const typeMatch = findFirstMatch(content, typePatterns);
  const iconsMatch = findFirstMatch(content, iconPatterns);
  const keywordsMatch = findFirstMatch(content, keywordPatterns);
  const rulesMatch = findFirstMatch(content, rulesPatterns);
  const flavorMatch = findFirstMatch(content, flavorPatterns);
  const imagePromptMatch = findFirstMatch(content, imagePromptPatterns);
  
  // Process card type (e.g., "GEAR – Consumable" -> "gear")
  if (typeMatch) {
    const typeText = typeMatch.toLowerCase();
    console.log(`Found type: ${typeText}`);
    
    // For gear cards, extract the category
    if (typeText.includes('gear')) {
      card.type = 'gear';
      
      // Extract category for gear cards
      if (typeText.includes('consumable')) {
        card.category = 'consumable';
      } else if (typeText.includes('weapon')) {
        card.category = 'weapon';
      } else if (typeText.includes('vehicle')) {
        card.category = 'vehicle';
      } else if (typeText.includes('supply')) {
        card.category = 'supply';
      } else if (typeText.includes('tool')) {
        card.category = 'tool';
      } else if (typeText.includes('passive')) {
        card.category = 'tool'; // Default passive items to tool category
      } else if (typeText.includes('one-time')) {
        card.category = 'consumable'; // Default one-time use to consumable
      } else if (typeText.includes('combo')) {
        card.category = 'tool'; // Default combo items to tool category
      }
    } else if (typeText.includes('treasure')) {
      card.type = 'treasure';
    } else if (typeText.includes('hazard')) {
      card.type = 'hazard';
    }
    
    console.log(`Determined card category: ${card.category}`);
  }
  
  // Process icons - handle [IconName] format from Flomanji cards
  if (iconsMatch) {
    const iconsText = iconsMatch.trim();
    console.log(`Found icons: ${iconsText}`);
    
    // Extract icons in [Icon Name] format 
    const bracketedIcons = iconsText.match(/\[([^\]]+)\]/g);
    
    if (bracketedIcons && bracketedIcons.length > 0) {
      card.icons = bracketedIcons.map(match => {
        const icon = match.replace(/[\[\]]/g, '').trim();
        return {
          symbol: icon,
          meaning: icon
        };
      });
    } else {
      // If no bracketed icons, split by commas or other separators
      card.icons = iconsText.split(/[,;|]/).map(i => ({
        symbol: i.trim(),
        meaning: i.trim()
      }));
    }
    
    console.log(`Added ${card.icons.length} icons to card`);
  }
  
  // Process keywords
  if (keywordsMatch) {
    const keywordsText = keywordsMatch.trim();
    console.log(`Found keywords: ${keywordsText}`);
    card.keywords = keywordsText.split(/[,;|]/).map(k => k.trim());
    console.log(`Added ${card.keywords.length} keywords to card`);
  }
  
  // Process rules text - clean up bullet points and formatting
  if (rulesMatch) {
    const rulesText = rulesMatch.trim()
                     .replace(/^\s*\*\s*/gm, '') // Remove bullet points
                     .replace(/\n+/g, ' ')       // Join multiple lines
                     .trim();
    card.rules = [rulesText];
    console.log(`Added rules text to card`);
  }
  
  // Process flavor text - remove quotes and asterisks
  if (flavorMatch) {
    card.flavor = flavorMatch.trim()
                 .replace(/^\s*\*\s*/gm, '') // Remove bullet points
                 .replace(/^\*|^\"|\"$|\*$/g, '') // Remove leading/trailing asterisks and quotes
                 .trim();
    console.log(`Added flavor text to card`);
  }
  
  // Process image prompt
  if (imagePromptMatch) {
    card.imagePrompt = imagePromptMatch.trim()
                      .replace(/^\s*\*\s*/gm, '') // Remove bullet points
                      .trim();
    console.log(`Added image prompt to card`);
  }
  
  return card as CardFormValues;
};

/**
 * Helper function to find the first match from multiple regex patterns
 * and handle multi-line content properly
 */
function findFirstMatch(content: string, patterns: RegExp[]): string | null {
  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match && match[1]) {
      // Clean up the matched text by removing bullet points and extra whitespace
      return match[1].replace(/^\s*\*\s*/gm, '').trim();
    }
  }
  return null;
}
