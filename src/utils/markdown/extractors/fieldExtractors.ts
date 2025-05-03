
import { CardFormValues } from "@/types/forms/card-form";
import { mapGearCategory } from "../cardTypeMappers";

/**
 * Extracts and processes the card type information from content
 * @param content The card section content
 * @param card The card object being built
 * @returns Updated card object with type information
 */
export const extractTypeInfo = (content: string, card: Partial<CardFormValues>): Partial<CardFormValues> => {
  // Type/Category - handle various formats including "GEAR – Consumable" and "GEAR - Passive"
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
      } else if (typeText.includes('combo')) {
        // Default combo gear to "tool" category
        card.category = 'tool';
        console.log(`Set default category 'tool' for Combo gear`);
      } else if (typeText.includes('one-time use') || typeText.includes('one time')) {
        card.category = 'consumable';
        console.log(`Set category 'consumable' for One-Time Use gear`);
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

  return card;
};

/**
 * Extracts and processes the card icon information from content
 * @param content The card section content
 * @param card The card object being built
 * @returns Updated card object with icon information
 */
export const extractIconInfo = (content: string, card: Partial<CardFormValues>): Partial<CardFormValues> => {
  const iconMatch = content.match(/\*\s*\*\*Icon\(s\):\*\*\s*([^\n]+)/i) || 
                   content.match(/Icon\(s\):\s*([^\n]+)/i) || 
                   content.match(/\*\s*Icons?:\s*([^\n]+)/i);
  
  if (iconMatch) {
    const iconsText = iconMatch[1].trim();
    console.log(`Found icons: "${iconsText}"`);
    
    // Extract icons in [Icon Name] format - handle escaped brackets \[Icon Name\]
    const iconRegex = /\\\[([^\\\]]+)\\\]|\[([^\]]+)\]/g;
    let match;
    const extractedIcons = [];
    
    while ((match = iconRegex.exec(iconsText)) !== null) {
      // Either use the first capture group (escaped brackets) or second (normal brackets)
      const iconName = match[1] || match[2];
      if (iconName && iconName.trim()) {
        extractedIcons.push({
          symbol: iconName.trim(),
          meaning: iconName.trim()
        });
      }
    }
    
    // If no bracketed icons found, try splitting by commas or spaces
    if (extractedIcons.length === 0 && iconsText) {
      const plainIcons = iconsText.split(/,|\s+/).filter(i => i.trim());
      plainIcons.forEach(icon => {
        if (icon.trim()) {
          extractedIcons.push({
            symbol: icon.trim(),
            meaning: icon.trim()
          });
        }
      });
    }
    
    if (extractedIcons.length > 0) {
      card.icons = extractedIcons;
      console.log(`Extracted ${extractedIcons.length} icons`);
    }
  }
  
  return card;
};

/**
 * Extracts and processes the card keywords information from content
 * @param content The card section content
 * @param card The card object being built
 * @returns Updated card object with keyword information
 */
export const extractKeywordInfo = (content: string, card: Partial<CardFormValues>): Partial<CardFormValues> => {
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
  
  return card;
};

/**
 * Extracts and processes the card rules information from content
 * @param content The card section content
 * @param card The card object being built
 * @returns Updated card object with rules information
 */
export const extractRulesInfo = (content: string, card: Partial<CardFormValues>): Partial<CardFormValues> => {
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
  
  return card;
};

/**
 * Extracts and processes the card flavor text from content
 * @param content The card section content
 * @param card The card object being built
 * @returns Updated card object with flavor text
 */
export const extractFlavorInfo = (content: string, card: Partial<CardFormValues>): Partial<CardFormValues> => {
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
  
  return card;
};

/**
 * Extracts and processes the card image prompt from content
 * @param content The card section content
 * @param card The card object being built
 * @returns Updated card object with image prompt
 */
export const extractImagePromptInfo = (content: string, card: Partial<CardFormValues>): Partial<CardFormValues> => {
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
  
  return card;
};
