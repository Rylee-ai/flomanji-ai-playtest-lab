
import { CardType } from "@/types/cards";

/**
 * Generates a Markdown template for a specified card type
 * @param cardType The type of card to generate a template for
 * @returns A markdown string template
 */
export const getMarkdownTemplateForType = (cardType: CardType): string => {
  const baseTemplate = `### **Flomanji ${capitalizeCardType(cardType)} Cards**

*Brief description of this card type goes here.*

**1. TITLE: Example Card Name**

* **Type:** ${getTypeLabel(cardType)}
${getCardTypeSpecificFields(cardType)}* **Keywords:** keyword1, keyword2, keyword3
* **Rules:** Place the card rules text here. This is what the card does when played.
* **Flavor:** *"Goblet: 'A quote or flavor text that brings the card to life.'"*
* **Image Prompt:** A detailed description for generating an image for this card.

**2. TITLE: Another Example Card**

* **Type:** ${getTypeLabel(cardType)}
${getCardTypeSpecificFields(cardType)}* **Keywords:** keyword1, keyword2
* **Rules:** Another example of rules text for this card type.
* **Flavor:** *"Goblet: 'More witty or thematic flavor text goes here.'"*
* **Image Prompt:** Another detailed image description.
`;
  
  return baseTemplate;
};

/**
 * Capitalizes the first letter of a card type and handles special cases
 */
const capitalizeCardType = (cardType: CardType): string => {
  switch (cardType) {
    case 'npc':
      return 'NPC';
    case 'player-character':
      return 'Player Character';
    default:
      return cardType.charAt(0).toUpperCase() + cardType.slice(1);
  }
};

/**
 * Returns the appropriate type label for a card type
 */
const getTypeLabel = (cardType: CardType): string => {
  switch (cardType) {
    case 'gear':
      return 'GEAR – Tool';
    case 'treasure':
      return 'TREASURE – Standard';
    case 'hazard':
      return 'HAZARD – Environmental';
    case 'npc':
      return 'NPC – Vendor';
    case 'player-character':
      return 'CHARACTER – Role';
    case 'flomanjified':
      return 'FLOMANJIFIED – Role';
    case 'chaos':
      return 'CHAOS – Event';
    case 'region':
      return 'REGION – Biome';
    case 'mission':
      return 'MISSION – Exploration';
    case 'secret':
      return 'SECRET – Objective';
    case 'automa':
      return 'AUTOMA – Behavior';
    default:
      return cardType.toUpperCase();
  }
};

/**
 * Returns additional template fields specific to a card type
 */
const getCardTypeSpecificFields = (cardType: CardType): string => {
  switch (cardType) {
    case 'gear':
      return '* **Icon(s):** [Tool Icon] [Utility Icon]\n';
    case 'hazard':
      return '* **Icon(s):** [Danger Icon] [Environment Icon]\n* **Difficulty:** Fight 7, Flee 5\n';
    case 'npc':
      return '* **Icon(s):** [Character Icon] [Vendor Icon]\n* **Interaction:** Charm 6\n';
    case 'player-character':
      return '* **Stats:** Brawn 3, Moxie 2, Charm 4, Grit 3, WeirdSense 2\n* **Special Ability:** Description of character's unique ability\n';
    case 'treasure':
      return '* **Icon(s):** [Treasure Icon] [Value Icon]\n* **Value:** 3\n';
    case 'region':
      return '* **Icon(s):** [Biome Icon] [Feature Icon]\n* **Encounters:** Description of typical encounters\n';
    case 'mission':
      return '* **Icon(s):** [Mission Icon] [Difficulty Icon]\n* **Objectives:** Primary and secondary objectives\n* **Heat:** Starting heat level\n';
    default:
      return '* **Icon(s):** [Appropriate Icon] [Another Icon]\n';
  }
};
