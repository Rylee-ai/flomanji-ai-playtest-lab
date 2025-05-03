
import { CardFormValues } from "@/types/forms/card-form";
import { mapGearCategory } from "./cardTypeMappers";

/**
 * Alternative parsing method for different markdown formats
 * @param markdownContent Raw markdown content to parse
 * @returns An array of card objects
 */
export const parseMarkdownCardsAlternate = (markdownContent: string): CardFormValues[] => {
  const cards: CardFormValues[] = [];
  
  console.log("Attempting alternate parsing method for Flomanji format");
  
  // Clean up the content - standardize line endings
  const cleanedContent = markdownContent
    .replace(/\r\n/g, '\n')  // Normalize line endings
    .replace(/\n{3,}/g, '\n\n');  // Standardize multiple blank lines
  
  // Try splitting by double newlines followed by an asterisk - works well for the user's format
  let sections = cleanedContent.split(/\n\n(?=\*)/);
  console.log(`Double newline with asterisk format found ${sections.length} sections`);
  
  // If that doesn't work well, try with the format "* **Title:** CARD NAME"
  if (sections.length <= 1) {
    sections = cleanedContent.split(/(?=\*\s*\*\*Title:\*\*)/i);
    console.log(`Title format found ${sections.length} sections`);
  }
  
  // Try with the format "* **Title:** CARD NAME**" - note the extra asterisks at the end
  if (sections.length <= 1) {
    sections = cleanedContent.split(/(?=\*\s*\*\*Title:\*\*\s*[^\n\*]+\*\*)/i);
    console.log(`Title format with trailing asterisks found ${sections.length} sections`);
  }
  
  // Regular expression to find cards with Flomanji format - with or without escaped backslash
  if (sections.length <= 1) {
    const flomanjiCardRegex = /\*\*\d+\\?\.\s+([A-Z0-9\s\(\)\-\'\"]+)\*\*/g;
    
    let match;
    const matches = [];
    
    // Find all potential card matches
    while ((match = flomanjiCardRegex.exec(cleanedContent)) !== null) {
      matches.push({
        title: match[1].trim(),
        position: match.index,
        fullMatch: match[0]
      });
    }
    
    console.log(`Found ${matches.length} card matches using Flomanji gear card pattern`);
    
    // Process each card by extracting the text between current match and next match
    for (let i = 0; i < matches.length; i++) {
      const currentMatch = matches[i];
      const nextMatch = i < matches.length - 1 ? matches[i + 1] : null;
      
      // Get the full card text
      const endPos = nextMatch ? nextMatch.position : cleanedContent.length;
      const cardText = cleanedContent.substring(currentMatch.position, endPos);
      
      console.log(`Processing Flomanji card: "${currentMatch.title}" from position ${currentMatch.position} to ${endPos}`);
      
      // Parse the card data
      const card = parseFlomanjiCard(currentMatch.title, cardText);
      if (card) {
        cards.push(card);
        console.log(`Successfully added Flomanji card: ${card.name}, ID: ${card.id}`);
      } else {
        console.log(`Failed to parse Flomanji card: ${currentMatch.title}`);
      }
    }
  }
  
  // If sections were found, process each section
  if (sections.length > 1 && cards.length === 0) {
    console.log(`Processing ${sections.length} sections`);
    
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i].trim();
      if (!section) continue;
      
      // Extract the title using * **Title:** pattern
      let titleMatch = section.match(/\*\s*\*\*Title:\*\*\s*([^\n\*]+)(\*\*)?/i);
      let cardTitle = "";
      
      if (titleMatch) {
        cardTitle = titleMatch[1].trim();
        console.log(`Found alternate card title: "${cardTitle}"`);
        
        // Clean title - remove trailing asterisks if present
        cardTitle = cardTitle.replace(/\*+$/, '').trim();
        
        // Parse the card
        const card = parseFlomanjiCard(cardTitle, section);
        if (card) {
          cards.push(card);
          console.log(`Successfully added alternate card: ${card.name}, ID: ${card.id}`);
        } else {
          console.log(`Failed to parse alternate card: ${cardTitle}`);
        }
      }
    }
  }
  
  // Try to split by standard numbered sections (without double asterisks)
  if (cards.length === 0) {
    console.log("Trying numbered sections pattern");
    const numberedSections = cleanedContent.split(/(?=\d+\.\s+[A-Z\s\(\)\-\'\"]+)/g);
    
    if (numberedSections.length > 1) {
      console.log(`Found ${numberedSections.length} numbered sections`);
      
      for (const section of numberedSections) {
        const titleMatch = section.match(/\d+\.\s+([A-Z0-9\s\(\)\-\'\"]+)/);
        if (titleMatch) {
          const title = titleMatch[1].trim();
          console.log(`Found numbered section: "${title}"`);
          const card = parseFlomanjiCard(title, section);
          if (card) {
            cards.push(card);
            console.log(`Successfully added card from numbered section: ${card.name}`);
          }
        }
      }
    }
  }
  
  // Try to split by bold section headers
  if (cards.length === 0) {
    console.log("Trying bold sections without numbers");
    const boldSections = cleanedContent.split(/(?=\*\*[A-Z0-9\s\(\)\-\'\"]+\*\*)/g);
    
    for (const section of boldSections) {
      const titleMatch = section.match(/\*\*([A-Z0-9\s\(\)\-\'\"]+)\*\*/);
      if (titleMatch) {
        const title = titleMatch[1].trim();
        console.log(`Found bold section: "${title}"`);
        const card = parseFlomanjiCard(title, section);
        if (card) {
          cards.push(card);
          console.log(`Successfully added card from bold section: ${card.name}`);
        }
      }
    }
  }
  
  console.log(`Alternative parsing found ${cards.length} total cards`);
  return cards;
};

/**
 * Parse an individual card from the Flomanji Gear Cards format
 */
function parseFlomanjiCard(title: string, content: string): CardFormValues | null {
  if (!content || !title) return null;
  
  // Generate a unique ID for the card
  const uniqueId = `gear-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString(36).substring(4)}`;
  
  // Initialize card with safe defaults
  const card: Partial<CardFormValues> = {
    id: uniqueId,
    name: title.replace(/\*+$/, '').trim(), // Remove any trailing asterisks
    icons: [],
    keywords: [],
    rules: [],
    type: 'gear', // Default to gear for Flomanji cards
    category: 'tool', // Default category
  };
  
  // Extract card properties using regex patterns
  
  // Type and category
  const typeMatch = content.match(/\*\s*\*\*Type:\*\*\s*([^\n]+)/i) || 
                    content.match(/Type:\s*([^\n]+)/i);
  
  if (typeMatch) {
    const typeText = typeMatch[1].trim().toLowerCase();
    
    // Detect gear category - handle both "–" (em-dash) and "-" (hyphen)
    if (typeText.includes('gear')) {
      card.type = 'gear';
      
      if (typeText.includes('–') || typeText.includes('-')) {
        const separator = typeText.includes('–') ? '–' : '-';
        const parts = typeText.split(separator);
        if (parts.length > 1) {
          const category = parts[1].trim();
          card.category = mapGearCategory(category);
          console.log(`Extracted gear category: ${card.category}`);
        }
      }
    } else if (typeText.includes('consumable')) {
      card.type = 'gear';
      card.category = 'consumable';
    } else if (typeText.includes('passive')) {
      card.type = 'gear';
      card.category = 'tool';
    } else if (typeText.includes('combo')) {
      card.type = 'gear';
      card.category = 'tool';
    } else if (typeText.includes('treasure')) {
      card.type = 'treasure';
    } else if (typeText.includes('hazard')) {
      card.type = 'hazard';
    }
  }
  
  // Icons - extract from [Icon Name] format
  const iconMatch = content.match(/\*\s*\*\*Icon\(s\):\*\*\s*([^\n]+)/i) || 
                    content.match(/Icon\(s\):\s*([^\n]+)/i);
  
  if (iconMatch) {
    const iconsText = iconMatch[1].trim();
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
    } else {
      // If no bracketed format, split by commas or other separators
      card.icons = iconsText.split(/[,;|]/).map(i => ({
        symbol: i.trim(),
        meaning: i.trim()
      }));
    }
  }
  
  // Keywords
  const keywordMatch = content.match(/\*\s*\*\*Keywords:\*\*\s*([^\n]+)/i) || 
                        content.match(/Keywords:\s*([^\n]+)/i);
  
  if (keywordMatch) {
    const keywordsText = keywordMatch[1].trim();
    card.keywords = keywordsText.split(/[,;|]/).map(k => k.trim());
  }
  
  // Rules - these are multi-line and need special handling
  const rulesMatch = content.match(/\*\s*\*\*Rules:\*\*\s*([\s\S]*?)(?=\*\s*\*\*(?!Rules)|$)/i) || 
                     content.match(/Rules:\s*([\s\S]*?)(?=\*\s*\*\*|$)/i);
  
  if (rulesMatch) {
    // Clean up the rules text - remove bullet points, trim lines
    const rulesText = rulesMatch[1].trim()
                      .replace(/^\s*\*\s*/gm, '') // Remove bullet points
                      .replace(/\n+/g, ' ')       // Join multiple lines
                      .trim();
    
    card.rules = [rulesText];
  }
  
  // Flavor text - also multi-line
  const flavorMatch = content.match(/\*\s*\*\*Flavor:\*\*\s*([\s\S]*?)(?=\*\s*\*\*(?!Flavor)|$)/i) || 
                      content.match(/Flavor:\s*([\s\S]*?)(?=\*\s*\*\*|$)/i);
  
  if (flavorMatch) {
    // Clean and format flavor text
    card.flavor = flavorMatch[1].trim()
                 .replace(/^\s*\*\s*/gm, '')  // Remove bullet points
                 .replace(/^\*|^\"|\"$|\*$/g, '') // Remove leading/trailing asterisks and quotes
                 .replace(/\n+/g, ' ')       // Join multiple lines
                 .trim();
  }
  
  // Image prompt
  const imagePromptMatch = content.match(/\*\s*\*\*Image\s*Prompt:\*\*\s*([\s\S]*?)(?=\*\s*\*\*(?!Image)|$)/i) || 
                           content.match(/Image\s*Prompt:\s*([\s\S]*?)(?=\*\s*\*\*|$)/i);
  
  if (imagePromptMatch) {
    card.imagePrompt = imagePromptMatch[1].trim()
                      .replace(/^\s*\*\s*/gm, '') // Remove bullet points
                      .replace(/\n+/g, ' ')       // Join multiple lines
                      .trim();
  }
  
  return card as CardFormValues;
}
