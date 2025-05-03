
import { CardFormValues } from "@/types/forms/card-form";
import { mapGearCategory } from "./cardTypeMappers";

/**
 * Alternative parsing method for different markdown formats
 * @param markdownContent Raw markdown content to parse
 * @returns An array of card objects
 */
export const parseMarkdownCardsAlternate = (markdownContent: string): CardFormValues[] => {
  const cards: CardFormValues[] = [];
  
  // Strategy for parsing numbered gear cards in the Flomanji format
  // This handles formats like:
  // **1. CARD NAME**
  // * **Type:** GEAR - Category
  // * **Icon(s):** [Icon]
  // ...
  
  // Regular expression to find cards with numbered format
  const cardRegex = /\*?\*?\d+\.\s+([A-Z0-9\s\(\)\-\'\"]+)\*?\*?[\s\n]*(?:\*\s+\*\*Type:\*\*\s*([^\n]*)|Type:\s*([^\n]*))/g;
  
  let match;
  let startPos = 0;
  const matches = [];
  
  // Find all potential card matches
  while ((match = cardRegex.exec(markdownContent)) !== null) {
    matches.push({
      title: match[1].trim(),
      position: match.index,
      fullMatch: match[0]
    });
  }
  
  console.log(`Found ${matches.length} card matches using gear card pattern`);
  
  // Process each card by extracting the text between current match and next match
  for (let i = 0; i < matches.length; i++) {
    const currentMatch = matches[i];
    const nextMatch = i < matches.length - 1 ? matches[i + 1] : null;
    
    // Get the full card text
    const endPos = nextMatch ? nextMatch.position : markdownContent.length;
    const cardText = markdownContent.substring(currentMatch.position, endPos);
    
    console.log(`Processing card: "${currentMatch.title}"`);
    
    // Parse the card data
    const card = parseCardFromDetailed(currentMatch.title, cardText);
    if (card) {
      cards.push(card);
    }
  }
  
  // If we still have no cards, try to split by bold section indicators
  if (cards.length === 0) {
    console.log("Trying alternate pattern with bold section headers");
    const boldSections = markdownContent.split(/(?=\*\*\d+\.\s+[A-Z\s\(\)\-\'\"]+\*\*)/g);
    
    for (const section of boldSections) {
      const titleMatch = section.match(/\*\*\d+\.\s+([A-Z0-9\s\(\)\-\'\"]+)\*\*/);
      if (titleMatch) {
        const title = titleMatch[1].trim();
        console.log(`Found bold section: "${title}"`);
        const card = parseCardFromDetailed(title, section);
        if (card) {
          cards.push(card);
        }
      }
    }
  }
  
  console.log(`Alternative parsing found ${cards.length} cards`);
  return cards;
};

/**
 * Parse an individual card from a detailed markdown section
 * Specifically designed for the Flomanji Gear Cards format
 */
function parseCardFromDetailed(title: string, content: string): CardFormValues | null {
  if (!content || !title) return null;
  
  const card: Partial<CardFormValues> = {
    name: title,
    icons: [],
    keywords: [],
    rules: [],
    type: 'gear', // Default to gear based on current context
    category: 'tool', // Default category
  };
  
  // Generate an ID based on the name
  card.id = `gear-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  
  // Extract card type and category
  const typeMatch = content.match(/\*?\s*\*?\*?Type:\*?\*?\s*([^\n]+)/i);
  if (typeMatch) {
    const typeText = typeMatch[1].trim();
    
    if (typeText.toLowerCase().includes('consumable')) {
      card.category = 'consumable';
    } else if (typeText.toLowerCase().includes('weapon')) {
      card.category = 'weapon';
    } else if (typeText.toLowerCase().includes('vehicle')) {
      card.category = 'vehicle';
    } else if (typeText.toLowerCase().includes('supply')) {
      card.category = 'supply';
    }
    
    // If no specific category was found, it stays as 'tool'
  }
  
  // Extract icons
  const iconMatch = content.match(/\*?\s*\*?\*?Icon\(s\):\*?\*?\s*([^\n]+)/i);
  if (iconMatch) {
    const iconsText = iconMatch[1].trim();
    // Look for bracketed icons like [Fire Icon]
    const bracketedIcons = iconsText.match(/\[([^\]]+)\]/g);
    if (bracketedIcons) {
      card.icons = bracketedIcons.map(match => {
        const icon = match.replace(/[\[\]]/g, '').trim();
        return {
          symbol: icon,
          meaning: icon
        };
      });
    }
  }
  
  // Extract keywords
  const keywordMatch = content.match(/\*?\s*\*?\*?Keywords:\*?\*?\s*([^\n]+)/i);
  if (keywordMatch) {
    card.keywords = keywordMatch[1].split(/[,\s]+/).map(k => k.trim());
  }
  
  // Extract rules
  const rulesMatch = content.match(/\*?\s*\*?\*?Rules:\*?\*?\s*([\s\S]*?)(?=\*\s+\*\*|$)/i);
  if (rulesMatch) {
    const rulesText = rulesMatch[1].trim();
    card.rules = [rulesText];
  }
  
  // Extract flavor text
  const flavorMatch = content.match(/\*?\s*\*?\*?Flavor:\*?\*?\s*([\s\S]*?)(?=\*\s+\*\*|$)/i);
  if (flavorMatch) {
    card.flavor = flavorMatch[1].trim().replace(/^\*|^\"|\"$|\*$/g, '');
  }
  
  // Extract image prompt
  const imagePromptMatch = content.match(/\*?\s*\*?\*?Image Prompt:\*?\*?\s*([\s\S]*?)(?=\*\s+\*\*|$)/i);
  if (imagePromptMatch) {
    card.imagePrompt = imagePromptMatch[1].trim();
  }
  
  return card as CardFormValues;
}
