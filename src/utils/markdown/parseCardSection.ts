
import {
  extractTypeInfo,
  extractIconInfo,
  extractKeywordInfo,
  extractRulesInfo,
  extractFlavorInfo,
  extractImagePromptInfo
} from './extractors/fieldExtractors';

/**
 * Parse a card section from markdown content
 * @param title Card title
 * @param content Card content markdown
 * @returns Parsed card object or null if parsing failed
 */
export function parseCardSection(title: string, content: string): any | null {
  try {
    // Initialize card with title
    const card: any = {
      id: `card-${title.toLowerCase().replace(/\s+/g, '-')}`,
      name: title.replace(/^\d+\.\s+/, '').replace(/\*\*$/, ''), // Remove number prefix and trailing asterisks
    };
    
    // If content is empty, return minimal card
    if (!content || content.trim() === '') {
      return {
        ...card,
        type: 'gear', // Default type
        icons: [],
        keywords: [],
        rules: [],
      };
    }
    
    // Extract type information
    const typeInfo = extractTypeInfo(content);
    card.type = typeInfo.type;
    
    // Extract icon information
    const iconInfo = extractIconInfo(content);
    card.icons = iconInfo.icons;
    
    // Extract keyword information
    const keywordInfo = extractKeywordInfo(content);
    card.keywords = keywordInfo.keywords;
    
    // Extract rules information
    const rulesInfo = extractRulesInfo(content);
    card.rules = rulesInfo.rules;
    
    // Extract flavor information
    const flavorInfo = extractFlavorInfo(content);
    card.flavor = flavorInfo.flavor;
    
    // Extract image prompt information
    const imagePromptInfo = extractImagePromptInfo(content);
    card.imagePrompt = imagePromptInfo.imagePrompt;
    
    return card;
  } catch (error) {
    console.error('Error parsing card section:', error);
    return null;
  }
}
