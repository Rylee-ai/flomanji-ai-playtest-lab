
import { CardType } from "@/types/cards";

/**
 * Extract card type information from markdown content
 */
export const extractTypeInfo = (markdownContent: string) => {
  const typeMatch = markdownContent.match(/type:\s*([a-zA-Z-]+)/i);
  let cardType = typeMatch ? typeMatch[1].toLowerCase() : null;
  
  // Validate and map the type
  const validTypes: CardType[] = [
    'treasure', 'artifact', 'automa', 'secret', 'hazard', 
    'gear', 'npc', 'region', 'chaos', 'mission', 
    'flomanjified', 'player-character', 'exploration', 
    'escape', 'escort', 'collection', 'boss', 'solo'
  ];
  
  if (cardType && !validTypes.includes(cardType as CardType)) {
    console.warn(`Invalid card type: ${cardType}, defaulting to gear`);
    cardType = 'gear';
  }
  
  return {
    type: cardType as CardType || 'gear'
  };
};
