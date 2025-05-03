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
  
  console.log(`Parsing card section: "${title}"`);
  
  // Clean up the title (remove markdown markers)
  const cleanTitle = title.replace(/^[#\d\.\*\-\s]+/, '').trim();
  
  // Initialize default card values
  const card: Partial<CardFormValues> = {
    name: cleanTitle,
    icons: [],
    keywords: [],
    rules: [],
    type: 'gear', // Default type for current context
    category: 'tool', // Default category
  };
  
  // Generate an ID based on the name
  card.id = `gear-${cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  
  // Extract properties using various patterns
  // Try multiple patterns for each property to increase matching chances
  
  // Type patterns
  const typePatterns = [
    /\*\s*\*\*Type:\*\*\s*(.*?)(?:\n|$)/i,
    /Type:\s*(.*?)(?:\n|$)/i,
    /\*\s*Type:\s*(.*?)(?:\n|$)/i,
    /^Type:\s*(.*?)(?:\n|$)/im,
  ];
  
  // Icon patterns
  const iconPatterns = [
    /\*\s*\*\*Icon(?:s|\(s\)):\*\*\s*(.*?)(?:\n|$)/i,
    /Icon(?:s|\(s\)):\s*(.*?)(?:\n|$)/i,
    /\*\s*Icon(?:s|\(s\)):\s*(.*?)(?:\n|$)/i,
  ];
  
  // Keyword patterns
  const keywordPatterns = [
    /\*\s*\*\*Keywords:\*\*\s*(.*?)(?:\n|$)/i,
    /Keywords:\s*(.*?)(?:\n|$)/i,
    /\*\s*Keywords:\s*(.*?)(?:\n|$)/i,
  ];
  
  // Rules patterns - these need to capture multi-line content
  const rulesPatterns = [
    /\*\s*\*\*Rules:\*\*\s*([\s\S]*?)(?:\n\n|\n\*|\n#|$)/i,
    /Rules:\s*([\s\S]*?)(?:\n\n|\n\*|\n#|$)/i,
    /\*\s*Rules:\s*([\s\S]*?)(?:\n\n|\n\*|\n#|$)/i,
  ];
  
  // Flavor patterns - these may also be multi-line
  const flavorPatterns = [
    /\*\s*\*\*Flavor(?:\s*Text)?:\*\*\s*([\s\S]*?)(?:\n\n|\n\*|\n#|$)/i,
    /Flavor(?:\s*Text)?:\s*([\s\S]*?)(?:\n\n|\n\*|\n#|$)/i,
    /\*\s*Flavor(?:\s*Text)?:\s*([\s\S]*?)(?:\n\n|\n\*|\n#|$)/i,
  ];
  
  // Image prompt patterns
  const imagePromptPatterns = [
    /\*\s*\*\*Image(?:\s*Prompt)?:\*\*\s*([\s\S]*?)(?:\n\n|\n\*|\n#|$)/i,
    /Image(?:\s*Prompt)?:\s*([\s\S]*?)(?:\n\n|\n\*|\n#|$)/i,
    /\*\s*Image(?:\s*Prompt)?:\s*([\s\S]*?)(?:\n\n|\n\*|\n#|$)/i,
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
    const typeText = typeMatch.trim();
    
    // Basic card type determination
    if (typeText.toLowerCase().includes('gear')) {
      card.type = 'gear';
      
      // For gear cards, extract the category
      if (typeText.toLowerCase().includes('consumable')) {
        card.category = 'consumable';
      } else if (typeText.toLowerCase().includes('weapon')) {
        card.category = 'weapon';
      } else if (typeText.toLowerCase().includes('vehicle')) {
        card.category = 'vehicle';
      } else if (typeText.toLowerCase().includes('supply')) {
        card.category = 'supply';
      } else if (typeText.toLowerCase().includes('tool')) {
        card.category = 'tool';
      }
    } else if (typeText.toLowerCase().includes('treasure')) {
      card.type = 'treasure';
    } else if (typeText.toLowerCase().includes('hazard')) {
      card.type = 'hazard';
    }
  }
  
  // Process icons
  if (iconsMatch) {
    const iconsText = iconsMatch.trim();
    const iconSymbols = extractIcons(iconsText);
    
    if (iconSymbols.length > 0) {
      card.icons = iconSymbols.map(symbol => ({
        symbol,
        meaning: symbol
      }));
    }
  }
  
  // Process keywords
  if (keywordsMatch) {
    const keywordsText = keywordsMatch.trim();
    card.keywords = keywordsText.split(/[,;|]/).map(k => k.trim());
  }
  
  // Process rules text
  if (rulesMatch) {
    const rulesText = rulesMatch.trim();
    
    // Try to split rules into bullet points if they exist
    const ruleBullets = rulesText.split(/\n\s*[\*\-]\s*|\n\s*\d+\.\s*/);
    
    if (ruleBullets.length > 1) {
      card.rules = ruleBullets
        .map(rule => rule.trim())
        .filter(rule => rule.length > 0);
    } else {
      card.rules = [rulesText];
    }
  }
  
  // Process flavor text
  if (flavorMatch) {
    card.flavor = flavorMatch.trim().replace(/^["']|["']$/g, '');
  }
  
  // Process image prompt
  if (imagePromptMatch) {
    card.imagePrompt = imagePromptMatch.trim();
  }
  
  return card as CardFormValues;
};

/**
 * Helper function to find the first match from multiple regex patterns
 */
function findFirstMatch(content: string, patterns: RegExp[]): string | null {
  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
}

/**
 * Helper function to extract icon symbols from text
 */
function extractIcons(iconsText: string): string[] {
  // Try to find emoji or icon descriptions
  const emojiRegex = /[\p{Emoji}]/gu;
  const emojiMatches = iconsText.match(emojiRegex);
  
  if (emojiMatches && emojiMatches.length > 0) {
    return emojiMatches;
  }
  
  // Try to find bracketed icons like [Fire]
  const bracketedIcons = iconsText.match(/\[([^\]]+)\]/g);
  if (bracketedIcons) {
    return bracketedIcons.map(match => match.replace(/[\[\]]/g, ''));
  }
  
  // Otherwise split by commas or other separators
  return iconsText.split(/[,;|]/).map(i => i.trim());
}
