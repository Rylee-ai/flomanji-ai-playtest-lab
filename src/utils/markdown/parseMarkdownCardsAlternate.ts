
import { CardFormValues } from "@/types/forms/card-form";
import { mapGearCategory } from "./cardTypeMappers";
import { v4 as uuidv4 } from 'uuid';

/**
 * Alternative parsing method for different markdown formats
 * @param markdownContent Raw markdown content to parse
 * @returns An array of card objects
 */
export const parseMarkdownCardsAlternate = (markdownContent: string): CardFormValues[] => {
  const cards: CardFormValues[] = [];
  
  console.log("Attempting alternate parsing method");
  
  // Clean up the content - standardize line endings
  const cleanedContent = markdownContent
    .replace(/\r\n/g, '\n')  // Normalize line endings
    .replace(/\n{3,}/g, '\n\n');  // Standardize multiple blank lines
  
  // Try a very aggressive approach - split by empty lines followed by asterisks
  // This targets the format with "* **Title:** CARD NAME**" 
  const titleFieldPattern = /\n\n\*\s*\*\*Title:/gi;
  
  // Find all positions of the pattern in the content
  const positions = [];
  let match;
  while ((match = titleFieldPattern.exec(cleanedContent)) !== null) {
    positions.push(match.index + 2); // +2 to skip the newlines
  }
  
  console.log(`Found ${positions.length} potential card boundaries using title field pattern`);
  
  // If we found patterns, split the content at these positions
  if (positions.length > 0) {
    const sections = [];
    
    // Add the first section (from start to the first match)
    if (positions[0] > 0) {
      sections.push(cleanedContent.substring(0, positions[0]));
    }
    
    // Add middle sections
    for (let i = 0; i < positions.length; i++) {
      const start = positions[i];
      const end = i < positions.length - 1 ? positions[i + 1] : cleanedContent.length;
      sections.push(cleanedContent.substring(start, end));
    }
    
    console.log(`Split content into ${sections.length} sections`);
    
    // Process each section
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i].trim();
      if (!section) continue;
      
      console.log(`Processing alternate section ${i+1}/${sections.length}`);
      
      // Extract the title using "* **Title:" pattern
      const titleMatch = section.match(/\*\s*\*\*Title:\*\*\s*([^\n]+)/i);
      
      if (titleMatch) {
        // Clean title - remove trailing asterisks if present
        const title = titleMatch[1].replace(/\*+$/g, '').trim();
        console.log(`Found alternate card title: "${title}"`);
        
        // Parse the card
        const card = parseAlternateCardSection(title, section);
        if (card) {
          cards.push(card);
          console.log(`Successfully added alternate card: ${card.name}, ID: ${card.id}`);
        } else {
          console.log(`Failed to parse alternate card: ${title}`);
        }
      } else {
        console.log(`No title found in section ${i+1}`);
      }
    }
  } else {
    console.log("No title field patterns found, trying other methods");
  }
  
  // If no cards found yet, try with blank lines
  if (cards.length === 0) {
    // Try splitting by double newlines
    const blankLineSections = cleanedContent.split(/\n\n/);
    console.log(`Split by blank lines found ${blankLineSections.length} sections`);
    
    // Group sections that belong to the same card
    let currentCardSections: string[] = [];
    const groupedSections: string[] = [];
    
    for (const section of blankLineSections) {
      const trimmed = section.trim();
      if (!trimmed) continue;
      
      // If this looks like the start of a new card, start a new group
      if (trimmed.match(/^\*\s*\*\*Title:/i) || 
          trimmed.match(/^\*\s*\*\*Type:/i) || 
          trimmed.match(/^\d+\.\s+[A-Z]/)) {
        
        // Save the previous card if we have sections
        if (currentCardSections.length > 0) {
          groupedSections.push(currentCardSections.join('\n\n'));
          currentCardSections = [];
        }
      }
      
      // Add this section to the current card
      currentCardSections.push(trimmed);
    }
    
    // Add the last card if there's one being built
    if (currentCardSections.length > 0) {
      groupedSections.push(currentCardSections.join('\n\n'));
    }
    
    console.log(`Grouped into ${groupedSections.length} potential cards`);
    
    // Process each grouped section
    for (const groupedSection of groupedSections) {
      // Try to find a title
      let title = '';
      
      // Check for "* **Title:" format
      const titleMatch = groupedSection.match(/\*\s*\*\*Title:\*\*\s*([^\n]+)/i);
      if (titleMatch) {
        title = titleMatch[1].replace(/\*+$/g, '').trim();
      } else {
        // Try numbered format: "1. CARD NAME"
        const numberedMatch = groupedSection.match(/^\d+\.\s+([A-Z0-9\s\(\)\-\'\"]+)/);
        if (numberedMatch) {
          title = numberedMatch[1].trim();
        } else {
          // Try to use the first line as title
          const firstLine = groupedSection.split('\n')[0].trim();
          title = firstLine.replace(/^\*+|\*+$/g, '').trim();
        }
      }
      
      if (title) {
        console.log(`Identified card with title: ${title}`);
        const card = parseAlternateCardSection(title, groupedSection);
        if (card) {
          cards.push(card);
          console.log(`Added grouped card: ${card.name}`);
        }
      }
    }
  }
  
  console.log(`Alternative parsing found ${cards.length} total cards`);
  return cards;
};

/**
 * Parse an individual card section using the alternate method
 */
function parseAlternateCardSection(title: string, content: string): CardFormValues | null {
  if (!content || !title) {
    console.log("Missing content or title for alternate parsing");
    return null;
  }
  
  // Generate a unique ID for the card
  const uniqueId = `card-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${uuidv4().slice(0, 8)}`;
  
  console.log(`Alternate parsing for card: "${title}", ID: ${uniqueId}`);
  
  // Initialize card with safe defaults
  const card: Partial<CardFormValues> = {
    id: uniqueId,
    name: title.replace(/\*+$/, '').trim(), // Remove any trailing asterisks
    icons: [],
    keywords: [],
    rules: [],
    type: 'gear', // Default to gear
    category: 'tool', // Default category
  };
  
  // Extract card properties using more flexible regex patterns
  
  // Type and category with improved pattern matching
  const typeMatch = content.match(/\*\s*\*\*Type:\*\*\s*([^\n]+)/i) || 
                    content.match(/Type:\s*([^\n]+)/i) ||
                    content.match(/\*\s*Type:\s*([^\n]+)/i);
  
  if (typeMatch) {
    const typeText = typeMatch[1].trim().toLowerCase();
    console.log(`Alternate parsing found type: "${typeText}"`);
    
    // Detect card type and gear category
    if (typeText.includes('gear')) {
      card.type = 'gear';
      
      // Extract category with a more flexible pattern
      const categoryMatch = typeText.match(/(?:gear|passive)(?:\s*[-–]\s*|\s+)(\w+)/i);
      if (categoryMatch) {
        const category = categoryMatch[1].trim();
        card.category = mapGearCategory(category);
        console.log(`Extracted gear category: ${card.category}`);
      } else if (typeText.includes('passive')) {
        card.category = 'tool';
        console.log(`Set category 'tool' for Passive gear`);
      } else if (typeText.includes('consumable')) {
        card.category = 'consumable';
        console.log(`Set category 'consumable' from type text`);
      } else if (typeText.includes('weapon')) {
        card.category = 'weapon';
      } else if (typeText.includes('vehicle')) {
        card.category = 'vehicle';
      } else {
        card.category = 'tool';
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
    }
  }
  
  // Icons - extract from [Icon Name] format or other variants
  const iconMatch = content.match(/\*\s*\*\*Icon\(s\):\*\*\s*([^\n]+)/i) || 
                    content.match(/Icon\(s\):\s*([^\n]+)/i) || 
                    content.match(/\*\s*Icons?:\s*([^\n]+)/i);
  
  if (iconMatch) {
    const iconsText = iconMatch[1].trim();
    console.log(`Found icons text: "${iconsText}"`);
    
    // Extract icons in [Icon Name] format
    const bracketedIcons = iconsText.match(/\[([^\]]+)\]/g);
    
    if (bracketedIcons && bracketedIcons.length > 0) {
      card.icons = bracketedIcons.map(match => {
        const icon = match.replace(/[\[\]\\]/g, '').trim();
        return {
          symbol: icon,
          meaning: icon
        };
      });
      console.log(`Extracted ${card.icons.length} bracketed icons`);
    } else {
      // If no bracketed format, split by commas or other separators
      const plainIcons = iconsText.split(/[,;|]/).filter(i => i.trim());
      if (plainIcons.length > 0) {
        card.icons = plainIcons.map(i => ({
          symbol: i.trim(),
          meaning: i.trim()
        }));
        console.log(`Extracted ${card.icons.length} plain icons`);
      }
    }
  }
  
  // Keywords with flexible pattern matching
  const keywordMatch = content.match(/\*\s*\*\*Keywords:\*\*\s*([^\n]+)/i) || 
                        content.match(/Keywords:\s*([^\n]+)/i) ||
                        content.match(/\*\s*Keywords:\s*([^\n]+)/i);
  
  if (keywordMatch) {
    const keywordsText = keywordMatch[1].trim();
    card.keywords = keywordsText.split(/[,;|]/).map(k => k.trim()).filter(k => k);
    console.log(`Extracted ${card.keywords.length} keywords`);
  }
  
  // Rules - improved multi-line handling
  const rulesMatch = content.match(/\*\s*\*\*Rules:\*\*\s*([\s\S]*?)(?=\*\s*\*\*(?!Rules)|$)/i) || 
                     content.match(/Rules:\s*([\s\S]*?)(?=\*\s*\*\*|$)/i) ||
                     content.match(/\*\s*Rules:\s*([\s\S]*?)(?=\*\s*\*\*|$)/i);
  
  if (rulesMatch) {
    // Clean up the rules text
    let rulesText = rulesMatch[1].trim()
                     .replace(/^\s*\*\s*/gm, '') // Remove bullet points
                     .replace(/\n+/g, ' ')       // Join multiple lines
                     .replace(/\*\*/g, '')       // Remove markdown formatting
                     .trim();
    
    card.rules = [rulesText];
    console.log(`Extracted rules: "${rulesText.substring(0, Math.min(50, rulesText.length))}..."`);
  }
  
  // Flavor text - improved multi-line handling
  const flavorMatch = content.match(/\*\s*\*\*Flavor:\*\*\s*([\s\S]*?)(?=\*\s*\*\*(?!Flavor)|$)/i) || 
                      content.match(/Flavor:\s*([\s\S]*?)(?=\*\s*\*\*|$)/i) ||
                      content.match(/\*\s*Flavor:\s*([\s\S]*?)(?=\*\s*\*\*|$)/i);
  
  if (flavorMatch) {
    // Clean and format flavor text
    let flavorText = flavorMatch[1].trim()
                     .replace(/^\s*\*\s*/gm, '')  // Remove bullet points
                     .replace(/^\*|^\"|\"$|\*$/g, '') // Remove leading/trailing asterisks and quotes
                     .replace(/\n+/g, ' ')       // Join multiple lines
                     .replace(/\*\*/g, '')       // Remove markdown formatting
                     .trim();
    
    card.flavor = flavorText;
    console.log(`Extracted flavor: "${flavorText.substring(0, Math.min(50, flavorText.length))}..."`);
  }
  
  // Image prompt - improved multi-line handling
  const imagePromptMatch = content.match(/\*\s*\*\*Image\s*Prompt:\*\*\s*([\s\S]*?)(?=\*\s*\*\*(?!Image)|$)/i) || 
                           content.match(/Image\s*Prompt:\s*([\s\S]*?)(?=\*\s*\*\*|$)/i) ||
                           content.match(/\*\s*Image\s*Prompt:\s*([\s\S]*?)(?=\*\s*\*\*|$)/i);
  
  if (imagePromptMatch) {
    const imagePrompt = imagePromptMatch[1].trim()
                         .replace(/^\s*\*\s*/gm, '') // Remove bullet points
                         .replace(/\n+/g, ' ')       // Join multiple lines
                         .replace(/\*\*/g, '')       // Remove markdown formatting
                         .trim();
    
    card.imagePrompt = imagePrompt;
    console.log(`Extracted image prompt: "${imagePrompt.substring(0, Math.min(50, imagePrompt.length))}..."`);
  }
  
  return card as CardFormValues;
}
