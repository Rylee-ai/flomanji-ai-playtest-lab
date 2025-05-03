
import { CardFormValues } from "@/types/forms/card-form";
import { v4 as uuidv4 } from 'uuid';
import { mapGearCategory } from "./cardTypeMappers";

/**
 * Parse a specific section of markdown text into a card object
 * @param title The card title extracted from the section
 * @param content The full section content
 * @returns A card object with extracted data
 */
export const parseCardSection = (title: string, content: string): CardFormValues | null => {
  console.log(`Parsing card section for ${title}`);
  
  if (!content) {
    console.log("Empty content provided");
    return null;
  }

  // Generate a unique ID
  const cardId = `card-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${uuidv4().slice(0, 8)}`;
  
  // Initialize card with basic data
  const card: Partial<CardFormValues> = {
    id: cardId,
    name: title,
    keywords: [],
    rules: [],
    icons: []
  };
  
  // Extract card data with improved regex patterns

  // Type/Category
  const typeMatch = content.match(/\*\s*\*\*Type:\*\*\s*([^\n]+)/i) || content.match(/Type:\s*([^\n]+)/i);
  if (typeMatch) {
    console.log(`Found type: "${typeMatch[1].trim()}"`);
    
    // Extract the base card type
    const typeText = typeMatch[1].trim().toLowerCase();
    
    if (typeText.includes('gear')) {
      card.type = 'gear';
      
      // Extract the gear category
      if (typeText.includes('–')) {
        const category = typeText.split('–')[1].trim();
        card.category = mapGearCategory(category);
        console.log(`Extracted gear category: ${card.category}`);
      }
    } else if (typeText.includes('treasure')) {
      card.type = 'treasure';
    } else if (typeText.includes('hazard')) {
      card.type = 'hazard';
    } else if (typeText.includes('npc')) {
      card.type = 'npc';
    } else if (typeText.includes('region')) {
      card.type = 'region';
    } else if (typeText.includes('chaos')) {
      card.type = 'chaos';
    } else if (typeText.includes('flomanjified')) {
      card.type = 'flomanjified';
    } else if (typeText.includes('secret')) {
      card.type = 'secret';
    } else if (typeText.includes('mission')) {
      card.type = 'mission';
    } else if (typeText.includes('player')) {
      card.type = 'player-character';
    } else if (typeText.includes('automa')) {
      card.type = 'automa';
    } else {
      // Default to gear if unclear
      card.type = 'gear';
    }
  } else {
    console.log("No type found, defaulting to 'gear'");
    card.type = 'gear';
  }
  
  // Icons - declare iconMatch before using it
  const iconMatch = content.match(/\*\s*\*\*Icon\(s\):\*\*\s*([^\n]+)/i) || content.match(/Icon\(s\):\s*([^\n]+)/i);
  if (iconMatch) {
    const iconsText = iconMatch[1].trim();
    console.log(`Found icons: "${iconsText}"`);
    
    // Extract icons in [Icon Name] format
    const iconRegex = /\[([^\]]+)\]/g;
    let match;
    while ((match = iconRegex.exec(iconsText)) !== null) {
      const iconName = match[1].trim();
      card.icons = card.icons || [];
      card.icons.push({
        symbol: iconName,
        meaning: iconName
      });
    }
  }
  
  // Keywords
  const keywordMatch = content.match(/\*\s*\*\*Keywords:\*\*\s*([^\n]+)/i) || content.match(/Keywords:\s*([^\n]+)/i);
  if (keywordMatch) {
    const keywordsText = keywordMatch[1].trim();
    console.log(`Found keywords: "${keywordsText}"`);
    card.keywords = keywordsText.split(/,\s*/).map(k => k.trim());
  }
  
  // Rules Text - handle multi-line content
  const rulesMatch = content.match(/\*\s*\*\*Rules:\*\*\s*([\s\S]*?)(?=\*\s*\*\*(?!Rules)|$)/i) || 
                     content.match(/Rules:\s*([\s\S]*?)(?=\*\s*(?!Rules)|$)/i);
  if (rulesMatch) {
    const rulesText = rulesMatch[1].trim()
                      .replace(/^\s*\*\s*/gm, '') // Remove bullet points
                      .replace(/\n+/g, ' ');       // Join multiple lines
    console.log(`Found rules: "${rulesText.substring(0, 50)}..."`);
    card.rules = [rulesText];
  }
  
  // Flavor Text - also multi-line
  const flavorMatch = content.match(/\*\s*\*\*Flavor:\*\*\s*([\s\S]*?)(?=\*\s*\*\*(?!Flavor)|$)/i) || 
                      content.match(/Flavor:\s*([\s\S]*?)(?=\*\s*(?!Flavor)|$)/i);
  if (flavorMatch) {
    let flavorText = flavorMatch[1].trim()
                    .replace(/^\s*\*\s*/gm, '')  // Remove bullet points
                    .replace(/\n+/g, ' ');       // Join multiple lines
    
    // Clean up quotes and asterisks if present
    flavorText = flavorText.replace(/^["']|["']$/g, '').trim();
    
    console.log(`Found flavor text: "${flavorText.substring(0, 50)}..."`);
    card.flavor = flavorText;
  }
  
  // Image Prompt
  const imagePromptMatch = content.match(/\*\s*\*\*Image\s*Prompt:\*\*\s*([\s\S]*?)(?=\*\s*\*\*(?!Image)|$)/i) || 
                           content.match(/Image\s*Prompt:\s*([\s\S]*?)(?=\*\s*(?!Image)|$)/i);
  if (imagePromptMatch) {
    const imagePrompt = imagePromptMatch[1].trim()
                       .replace(/^\s*\*\s*/gm, '') // Remove bullet points
                       .replace(/\n+/g, ' ');       // Join multiple lines
    console.log(`Found image prompt: "${imagePrompt.substring(0, 50)}..."`);
    card.imagePrompt = imagePrompt;
  }

  // For gear cards, ensure they have a category
  if (card.type === 'gear' && !card.category) {
    console.log(`Setting default category 'tool' for gear card: ${card.name}`);
    card.category = 'tool';
  }
  
  console.log(`Successfully parsed card: ${card.name}, type: ${card.type}`);
  return card as CardFormValues;
};
