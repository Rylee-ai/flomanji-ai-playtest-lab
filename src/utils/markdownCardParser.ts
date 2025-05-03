
import { CardType } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { marked } from "marked";

/**
 * Parses a Markdown file containing card data and converts it to our internal card format
 * @param markdownContent Raw markdown content from a file
 * @returns An array of parsed card objects
 */
export const parseMarkdownCards = (markdownContent: string): CardFormValues[] => {
  const cards: CardFormValues[] = [];
  
  // Split the markdown content by major card sections
  // We're looking for sections that begin with a number followed by a period and space
  const cardSections = markdownContent.split(/\n\s*\*\*\d+\.\s*(.+?)\*\*/);
  
  // Filter out empty sections and process each card section
  for (let i = 1; i < cardSections.length; i += 2) {
    if (!cardSections[i]) continue;
    
    const cardTitle = cardSections[i].trim();
    const cardContent = cardSections[i+1] || '';
    
    // Parse the card content into an object
    const card = parseCardSection(cardTitle, cardContent);
    if (card) {
      cards.push(card);
    }
  }
  
  return cards;
};

/**
 * Parse an individual card section of markdown content
 * @param title The card title extracted from the markdown
 * @param content The content for this card section
 * @returns A parsed card object
 */
const parseCardSection = (title: string, content: string): CardFormValues | null => {
  if (!content) return null;
  
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
  
  // Process card type (e.g., "GEAR – Consumable" -> "gear")
  if (typeMatch) {
    const typeText = typeMatch[1].trim();
    const baseType = typeText.split('–')[0].trim().toLowerCase();
    
    // Map to our internal card type
    const cardType = baseType === 'gear' ? 'gear' as CardType :
                     baseType === 'treasure' ? 'treasure' as CardType :
                     baseType === 'hazard' ? 'hazard' as CardType :
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
  if (keywordsMatch) {
    const keywordsText = keywordsMatch[1].trim();
    card.keywords = keywordsText.split(/,\s*/).map(k => k.trim());
  }
  
  // Process rules text
  if (rulesMatch) {
    const rulesText = rulesMatch[1].trim();
    card.rules = [rulesText];
  }
  
  // Process flavor text
  if (flavorMatch) {
    card.flavor = flavorMatch[1].trim().replace(/^\*|\'|\"|\*$/g, '');
  }
  
  // Process image prompt
  if (imagePromptMatch) {
    card.imagePrompt = imagePromptMatch[1].trim();
  }
  
  return card as CardFormValues;
};

/**
 * Maps a gear category text to our internal category type
 * @param categoryText The category text from the markdown
 * @returns The mapped category
 */
const mapGearCategory = (categoryText: string): 'consumable' | 'tool' | 'weapon' | 'vehicle' | 'supply' => {
  const lowerText = categoryText.toLowerCase();
  
  if (lowerText.includes('consumable')) return 'consumable';
  if (lowerText.includes('weapon')) return 'weapon';
  if (lowerText.includes('vehicle')) return 'vehicle';
  if (lowerText.includes('supply')) return 'supply';
  
  // Default to tool for other categories
  return 'tool';
};

/**
 * Main function to transform markdown data to card data
 * @param markdownContent Raw markdown content
 * @param cardType Default card type if not specified in the markdown
 * @returns Transformed card data
 */
export const transformMarkdownToCards = (markdownContent: string, defaultCardType: CardType): CardFormValues[] => {
  const cards = parseMarkdownCards(markdownContent);
  
  // Ensure all cards have the correct type if not properly extracted
  return cards.map(card => {
    if (!card.type) {
      card.type = defaultCardType;
    }
    return card;
  });
};
