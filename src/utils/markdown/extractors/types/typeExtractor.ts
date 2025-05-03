
import { CardFormValues } from "@/types/forms/card-form";
import { mapGearCategory } from "../../cardTypeMappers";

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
