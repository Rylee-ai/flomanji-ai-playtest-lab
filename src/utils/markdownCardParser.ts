
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
  console.log("Parsing markdown content, length:", markdownContent.length);
  
  // Split the markdown content by major card sections
  // We're looking for sections that begin with a number followed by a period and space
  let cardSections: string[] = [];
  
  // Try different patterns for splitting cards
  if (markdownContent.includes("**1.")) {
    // Format: **1. Card Name**
    cardSections = markdownContent.split(/\n\s*\*\*\d+\.\s*(.+?)\*\*/);
    console.log("Using numbered card format with ** markers, found sections:", cardSections.length);
  } else if (markdownContent.includes("# ")) {
    // Format: # Card Name
    cardSections = markdownContent.split(/\n\s*#\s+(.+?)(?:\n|$)/);
    console.log("Using # header format, found sections:", cardSections.length);
  } else {
    // Format: Card Name
    // Last resort - try to split on double newlines
    cardSections = markdownContent.split(/\n\n+/);
    console.log("Using paragraph breaks, found sections:", cardSections.length);
  }
  
  // Filter out empty sections and process each card section
  for (let i = 1; i < cardSections.length; i += 2) {
    if (!cardSections[i]) continue;
    
    const cardTitle = cardSections[i].trim();
    const cardContent = cardSections[i+1] || '';
    
    console.log("Processing card:", cardTitle);
    
    // Parse the card content into an object
    const card = parseCardSection(cardTitle, cardContent);
    if (card) {
      cards.push(card);
    }
  }
  
  console.log("Total cards parsed:", cards.length);
  // If we failed to parse cards with the standard method, try a fallback approach
  if (cards.length === 0) {
    console.log("Falling back to alternate parsing method");
    return parseMarkdownCardsAlternate(markdownContent);
  }
  
  return cards;
};

/**
 * Alternative parsing method for different markdown formats
 */
const parseMarkdownCardsAlternate = (markdownContent: string): CardFormValues[] => {
  const cards: CardFormValues[] = [];
  
  // Split content by what looks like card boundaries (headings or numbered items)
  const sections = markdownContent.split(/\n(?=\d+\.\s+|#\s+|##\s+)/);
  
  console.log("Alternative parsing found sections:", sections.length);
  
  for (const section of sections) {
    if (!section.trim()) continue;
    
    // Try to extract a name from the section
    const nameMatch = section.match(/^(?:\d+\.\s+|#\s+|##\s+)?(.*?)(?:\n|$)/);
    const name = nameMatch ? nameMatch[1].trim() : "Unnamed Card";
    
    // Check for common fields
    const typeMatch = section.match(/Type:?\s*(.*?)(?:\n|$)/i);
    const keywordsMatch = section.match(/Keywords?:?\s*(.*?)(?:\n|$)/i);
    const rulesMatch = section.match(/Rules?:?\s*([\s\S]*?)(?:\n\n|$)/i);
    const flavorMatch = section.match(/Flavor:?\s*(.*?)(?:\n|$)/i);
    
    const card: Partial<CardFormValues> = {
      name,
      icons: [],
      keywords: [],
      rules: [],
    };
    
    // Extract card type
    if (typeMatch) {
      const typeText = typeMatch[1].trim();
      if (typeText.toLowerCase().includes('gear')) {
        card.type = 'gear' as CardType;
      } else if (typeText.toLowerCase().includes('treasure')) {
        card.type = 'treasure' as CardType;
      } else if (typeText.toLowerCase().includes('hazard')) {
        card.type = 'hazard' as CardType;
      }
    }
    
    // Extract keywords
    if (keywordsMatch) {
      card.keywords = keywordsMatch[1].split(/,\s*/).map(k => k.trim());
    }
    
    // Extract rules
    if (rulesMatch) {
      card.rules = [rulesMatch[1].trim()];
    }
    
    // Extract flavor text
    if (flavorMatch) {
      card.flavor = flavorMatch[1].trim();
    }
    
    // Only add cards with a name
    if (card.name) {
      cards.push(card as CardFormValues);
    }
  }
  
  console.log("Alternative parsing found cards:", cards.length);
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
  console.log("Starting markdown to card transformation with type:", defaultCardType);
  const cards = parseMarkdownCards(markdownContent);
  
  // Ensure all cards have the correct type if not properly extracted
  const processedCards = cards.map(card => {
    if (!card.type) {
      console.log(`Setting default type ${defaultCardType} for card: ${card.name}`);
      card.type = defaultCardType;
    }
    
    // For gear cards, ensure they have a category
    if (card.type === 'gear' && !card.category) {
      card.category = 'tool';
    }
    
    return card;
  });
  
  console.log(`Transformed ${processedCards.length} cards from markdown`);
  return processedCards;
};
