
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
  console.log(`Parsing card section for "${title}"`);
  
  if (!content) {
    console.log("Empty content provided");
    return null;
  }

  // Clean the title - remove any trailing asterisks which are common in the user's format
  const cleanTitle = title.replace(/\*+$/, '').trim();
  
  // Generate a unique ID
  const cardId = `card-${cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${uuidv4().slice(0, 8)}`;
  
  // Initialize card with basic data
  const card: Partial<CardFormValues> = {
    id: cardId,
    name: cleanTitle,
    keywords: [],
    rules: [],
    icons: []
  };
  
  // Extract card data with improved regex patterns

  // Type/Category - handle various formats including "GEAR – Consumable" format
  // Use more flexible patterns - handle both dash types and variations in spacing
  const typeMatch = content.match(/\*\s*\*\*Type:\*\*\s*([^\n]+)/i) || 
                    content.match(/Type:\s*([^\n]+)/i) || 
                    content.match(/\*\s*Type:\s*([^\n]+)/i);
  
  if (typeMatch) {
    const typeText = typeMatch[1].trim().toLowerCase();
    console.log(`Found type: "${typeMatch[1].trim()}"`);
    
    // Extract the base card type
    if (typeText.includes('gear')) {
      card.type = 'gear';
      
      // Extract the gear category - handle both "–" (em-dash) and "-" (hyphen)
      const categoryMatch = typeText.match(/(?:gear|passive)(?:\s*[-–]\s*|\s+)(\w+)/i);
      if (categoryMatch) {
        const category = categoryMatch[1].trim();
        card.category = mapGearCategory(category);
        console.log(`Extracted gear category: ${card.category}`);
      } else if (typeText.includes('passive')) {
        // Default passive gear to "tool" category
        card.category = 'tool';
        console.log(`Set default category 'tool' for Passive gear`);
      } else if (typeText.includes('consumable')) {
        card.category = 'consumable';
        console.log(`Set category 'consumable' from type text`);
      } else if (typeText.includes('weapon')) {
        card.category = 'weapon';
        console.log(`Set category 'weapon' from type text`);
      } else if (typeText.includes('vehicle')) {
        card.category = 'vehicle';
        console.log(`Set category 'vehicle' from type text`);
      } else {
        card.category = 'tool';
        console.log(`Setting default category 'tool' for gear card: ${card.name}`);
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
      card.category = 'tool';
    }
  } else {
    console.log("No type found, defaulting to 'gear'");
    card.type = 'gear';
    card.category = 'tool';
  }

  // Icons - Handle the format [Icon Name] [Icon Name] with more flexible spacing
  const iconMatch = content.match(/\*\s*\*\*Icon\(s\):\*\*\s*([^\n]+)/i) || 
                    content.match(/Icon\(s\):\s*([^\n]+)/i) || 
                    content.match(/\*\s*Icons?:\s*([^\n]+)/i);
  
  if (iconMatch) {
    const iconsText = iconMatch[1].trim();
    console.log(`Found icons: "${iconsText}"`);
    
    // Extract icons in [Icon Name] format
    const iconRegex = /\[([^\]]+)\]/g;
    let match;
    const extractedIcons = [];
    while ((match = iconRegex.exec(iconsText)) !== null) {
      const iconName = match[1].trim();
      extractedIcons.push({
        symbol: iconName,
        meaning: iconName
      });
    }
    
    // If no bracketed icons found, try splitting by commas or spaces
    if (extractedIcons.length === 0 && iconsText) {
      const plainIcons = iconsText.split(/,|\s+/).filter(i => i.trim());
      plainIcons.forEach(icon => {
        extractedIcons.push({
          symbol: icon.trim(),
          meaning: icon.trim()
        });
      });
    }
    
    if (extractedIcons.length > 0) {
      card.icons = extractedIcons;
      console.log(`Extracted ${extractedIcons.length} icons`);
    }
  }
  
  // Keywords - handle more variations of formatting
  const keywordMatch = content.match(/\*\s*\*\*Keywords:\*\*\s*([^\n]+)/i) || 
                       content.match(/Keywords:\s*([^\n]+)/i) || 
                       content.match(/\*\s*Keywords:\s*([^\n]+)/i);
  
  if (keywordMatch) {
    const keywordsText = keywordMatch[1].trim();
    console.log(`Found keywords: "${keywordsText}"`);
    // Split by commas and clean up each keyword
    card.keywords = keywordsText.split(/,\s*/).map(k => k.trim()).filter(k => k);
    console.log(`Extracted ${card.keywords.length} keywords`);
  }
  
  // Rules Text - improved multi-line content handling
  const rulesMatch = content.match(/\*\s*\*\*Rules:\*\*\s*([\s\S]*?)(?=\*\s*\*\*(?!Rules)|$)/i) || 
                     content.match(/Rules:\s*([\s\S]*?)(?=\*\s*\*\*|$)/i) ||
                     content.match(/\*\s*Rules:\s*([\s\S]*?)(?=\*\s*\*\*|$)/i);
  
  if (rulesMatch) {
    let rulesText = rulesMatch[1].trim()
                     .replace(/^\s*\*\s*/gm, '') // Remove bullet points
                     .replace(/\n+/g, ' ');      // Join multiple lines
    
    // Clean up any markdown formatting artifacts
    rulesText = rulesText.replace(/\*\*/g, '').trim();
    
    console.log(`Found rules: "${rulesText.substring(0, Math.min(50, rulesText.length))}..."`);
    card.rules = [rulesText];
  }
  
  // Flavor Text - improved multi-line handling
  const flavorMatch = content.match(/\*\s*\*\*Flavor:\*\*\s*([\s\S]*?)(?=\*\s*\*\*(?!Flavor)|$)/i) || 
                      content.match(/Flavor:\s*([\s\S]*?)(?=\*\s*\*\*|$)/i) ||
                      content.match(/\*\s*Flavor:\s*([\s\S]*?)(?=\*\s*\*\*|$)/i);
  
  if (flavorMatch) {
    let flavorText = flavorMatch[1].trim()
                    .replace(/^\s*\*\s*/gm, '')  // Remove bullet points
                    .replace(/\n+/g, ' ');       // Join multiple lines
    
    // Clean up quotes and asterisks if present
    flavorText = flavorText.replace(/^\*|^\"|\"$|\*$/g, '').trim();
    flavorText = flavorText.replace(/\*\*/g, '').trim();
    
    console.log(`Found flavor text: "${flavorText.substring(0, Math.min(50, flavorText.length))}..."`);
    card.flavor = flavorText;
  }
  
  // Image Prompt - improved multi-line handling
  const imagePromptMatch = content.match(/\*\s*\*\*Image\s*Prompt:\*\*\s*([\s\S]*?)(?=\*\s*\*\*(?!Image)|$)/i) || 
                           content.match(/Image\s*Prompt:\s*([\s\S]*?)(?=\*\s*\*\*|$)/i) ||
                           content.match(/\*\s*Image\s*Prompt:\s*([\s\S]*?)(?=\*\s*\*\*|$)/i);
  
  if (imagePromptMatch) {
    const imagePrompt = imagePromptMatch[1].trim()
                       .replace(/^\s*\*\s*/gm, '') // Remove bullet points
                       .replace(/\n+/g, ' ')       // Join multiple lines
                       .replace(/\*\*/g, '');      // Remove any remaining markdown
    
    console.log(`Found image prompt: "${imagePrompt.substring(0, Math.min(50, imagePrompt.length))}..."`);
    card.imagePrompt = imagePrompt;
  }

  // For gear cards, ensure they have a category
  if (card.type === 'gear' && !card.category) {
    // Map "passive" to "tool" as per the user's format
    if (content.toLowerCase().includes('passive')) {
      card.category = 'tool';
      console.log(`Setting 'tool' category for Passive gear card: ${card.name}`);
    } else {
      console.log(`Setting default category 'tool' for gear card: ${card.name}`);
      card.category = 'tool';
    }
  }
  
  console.log(`Successfully parsed card: ${card.name}, type: ${card.type}`);
  return card as CardFormValues;
};
