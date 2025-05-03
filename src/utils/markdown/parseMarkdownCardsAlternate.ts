
import { CardFormValues } from "@/types/forms/card-form";
import { mapGearCategory } from "./cardTypeMappers";

/**
 * Alternative parsing method for different markdown formats
 * @param markdownContent Raw markdown content to parse
 * @returns An array of card objects
 */
export const parseMarkdownCardsAlternate = (markdownContent: string): CardFormValues[] => {
  const cards: CardFormValues[] = [];
  
  // Try different splitting strategies
  
  // Strategy 1: Look for cards separated by multiple newlines AND have card-like properties
  const sections = markdownContent.split(/\n{2,}/g)
    .filter(section => 
      section.includes("Type:") || 
      section.includes("Keywords:") || 
      section.includes("Rules:") ||
      section.includes("Flavor:"));
  
  console.log("Alternative parsing found sections:", sections.length);
  
  if (sections.length > 1) {
    for (const section of sections) {
      if (!section.trim()) continue;
      
      // Try to extract a name from the section
      const nameMatch = section.match(/^(?:#{1,3}|\d+\.|\*|\-)?\s*([^\n:]+)(?:\n|$)/);
      const name = nameMatch ? nameMatch[1].trim() : "Unnamed Card";
      
      // Extract card properties using flexible regex patterns
      const typeMatch = section.match(/(?:Type|Category):\s*([^\n]+)/i);
      const keywordsMatch = section.match(/Keywords?:\s*([^\n]+)/i);
      const rulesMatch = section.match(/Rules?:\s*([^\n]*(?:\n(?!\w+:)[^\n]+)*)/i);
      const flavorMatch = section.match(/(?:Flavor|Flavor Text|Quote):\s*([^\n]*(?:\n(?!\w+:)[^\n]+)*)/i);
      const iconsMatch = section.match(/Icons?:\s*([^\n]+)/i);
      const imagePromptMatch = section.match(/(?:Image|Prompt|Image Prompt):\s*([^\n]*(?:\n(?!\w+:)[^\n]+)*)/i);
      
      const card: Partial<CardFormValues> = {
        name,
        icons: [],
        keywords: [],
        rules: [],
        type: 'gear', // Default to gear based on current context
        category: 'tool', // Default category
      };
      
      // Extract card type and category
      if (typeMatch) {
        const typeText = typeMatch[1].trim();
        
        // Determine card type from type text
        if (typeText.toLowerCase().includes('gear')) {
          card.type = 'gear';
          
          // Extract category for gear cards
          const categoryPattern = /(?:gear|type)[^\w]+(consumable|tool|weapon|vehicle|supply)/i;
          const categoryMatch = typeText.match(categoryPattern);
          
          if (categoryMatch) {
            card.category = mapGearCategory(categoryMatch[1].toLowerCase());
          }
        } else if (typeText.toLowerCase().includes('treasure')) {
          card.type = 'treasure';
        } else if (typeText.toLowerCase().includes('hazard')) {
          card.type = 'hazard';
        }
      }
      
      // Extract keywords
      if (keywordsMatch) {
        card.keywords = keywordsMatch[1].split(/[,;|]/).map(k => k.trim());
      }
      
      // Extract rules
      if (rulesMatch) {
        // Split rules by bullets, numbers, or by periods followed by spaces
        const rulesText = rulesMatch[1].trim();
        const ruleItems = rulesText.split(/(?:\n\s*[\*\-]\s*|\n\s*\d+\.\s*|\.\s+(?=[A-Z]))/g)
          .map(rule => rule.trim())
          .filter(rule => rule.length > 0);
          
        card.rules = ruleItems.length > 0 ? ruleItems : [rulesText];
      }
      
      // Extract flavor text
      if (flavorMatch) {
        card.flavor = flavorMatch[1].trim().replace(/^["']|["']$/g, '');
      }
      
      // Extract icons
      if (iconsMatch) {
        const iconsText = iconsMatch[1].trim();
        const icons = iconsText.split(/[,;|]/).map(icon => {
          const iconName = icon.trim().replace(/icon$/i, '').trim();
          return {
            symbol: iconName,
            meaning: iconName
          };
        });
        card.icons = icons;
      }
      
      // Extract image prompt
      if (imagePromptMatch) {
        card.imagePrompt = imagePromptMatch[1].trim();
      }
      
      // Only add cards with a name
      if (card.name && card.name !== "Unnamed Card") {
        // Generate an ID based on the name if not present
        if (!card.id) {
          card.id = `gear-${card.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
        }
        
        cards.push(card as CardFormValues);
      }
    }
  }
  
  // Strategy 2: If we still don't have cards, look for named sections with properties
  if (cards.length === 0) {
    // Look for sections that start with a name followed by card properties
    const matches = [...markdownContent.matchAll(/(?:^|\n\n)([^\n]+)(?:\n(?:Type|Keywords|Rules|Flavor|Icons)[^\n]*)+/g)];
    
    for (const match of matches) {
      const cardName = match[1].trim().replace(/^[#\d\.\*\-\s]+/, '');
      const cardContent = match[0];
      
      // Use the same logic as above to extract properties
      const card = parseCardContent(cardName, cardContent);
      if (card && card.name) {
        cards.push(card as CardFormValues);
      }
    }
  }
  
  console.log("Alternative parsing found cards:", cards.length);
  return cards;
};

/**
 * Helper function to parse a card's content
 */
function parseCardContent(name: string, content: string): Partial<CardFormValues> {
  const card: Partial<CardFormValues> = {
    name,
    icons: [],
    keywords: [],
    rules: [],
    type: 'gear',
    category: 'tool',
  };
  
  // Generate an ID based on the name
  card.id = `gear-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  
  // Extract properties using similar patterns as above
  const typeMatch = content.match(/Type:\s*([^\n]+)/i);
  const keywordsMatch = content.match(/Keywords?:\s*([^\n]+)/i);
  const rulesMatch = content.match(/Rules?:\s*([^\n]*(?:\n(?!\w+:)[^\n]+)*)/i);
  const flavorMatch = content.match(/(?:Flavor|Flavor Text):\s*([^\n]*(?:\n(?!\w+:)[^\n]+)*)/i);
  
  // Process type and category
  if (typeMatch) {
    const typeText = typeMatch[1].trim().toLowerCase();
    if (typeText.includes('consumable')) card.category = 'consumable';
    else if (typeText.includes('weapon')) card.category = 'weapon';
    else if (typeText.includes('vehicle')) card.category = 'vehicle';
    else if (typeText.includes('supply')) card.category = 'supply';
  }
  
  // Process keywords
  if (keywordsMatch) {
    card.keywords = keywordsMatch[1].split(/[,;|]/).map(k => k.trim());
  }
  
  // Process rules
  if (rulesMatch) {
    card.rules = [rulesMatch[1].trim()];
  }
  
  // Process flavor
  if (flavorMatch) {
    card.flavor = flavorMatch[1].trim();
  }
  
  return card;
}
