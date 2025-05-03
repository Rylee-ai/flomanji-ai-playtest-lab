import { CardType } from "@/types/cards";

/**
 * Generates a Markdown template for a specified card type
 * @param cardType The type of card to generate a template for
 * @returns A markdown string template
 */
export function getMarkdownTemplateForType(cardType: string): string {
  switch (cardType.toLowerCase()) {
    case 'gear':
      return `* **Title:** EXAMPLE GEAR ITEM
* **Type:** GEAR – Tool
* **Icon(s):** [Tool Icon] [Utility Icon]
* **Keywords:** utility, durable, multi-use
* **Rules:** This item provides a specific advantage when used in appropriate situations.
* **Flavor:** *"Goblet: 'A reliable tool for any adventurer in the wilds of Flomanji.'"*
* **Image Prompt:** A well-crafted handheld tool with wooden handle and metal parts

* **Title:** EXAMPLE CONSUMABLE
* **Type:** GEAR – Consumable
* **Icon(s):** [Healing Icon] [One-Use Icon]
* **Keywords:** healing, single-use, emergency
* **Rules:** Discard to use. Declare "Healing Up!" Restore 1 Health point to any character.
* **Flavor:** *"Goblet: 'Apply liberally to wounds. Results may vary.'"*
* **Image Prompt:** A small vial with glowing green liquid inside, cork slightly askew
`;
    
    case 'treasure':
      return `* **Title:** EXAMPLE TREASURE
* **Type:** TREASURE
* **Icon(s):** [Value Icon] [Mystery Icon]
* **Keywords:** valuable, tradeable, collectible
* **Rules:** This item can be traded for valuable resources or information.
* **Flavor:** *"Goblet: 'Worth more than its weight in nostalgia.'"*
* **Image Prompt:** A gleaming artifact partially covered in swamp moss
`;
    
    case 'hazard':
      return `* **Title:** EXAMPLE HAZARD
* **Type:** HAZARD – Environmental
* **Icon(s):** [Danger Icon] [Environment Icon]
* **Keywords:** obstacle, threatening, challenging
* **Rules:** Players must make a DC 4 Grit check when encountering this hazard. Failure results in 1 damage.
* **Flavor:** *"Goblet: 'Nature's way of saying 'keep out' in the most painful manner possible.'"*
* **Image Prompt:** A dangerous environmental feature looming menacingly
`;

    // Add templates for other card types
    default:
      return `* **Title:** EXAMPLE CARD
* **Type:** ${cardType.toUpperCase()}
* **Icon(s):** [Icon1] [Icon2]
* **Keywords:** keyword1, keyword2
* **Rules:** Description of how this card works in the game.
* **Flavor:** *"Goblet: 'A flavorful quote about this card.'"*
* **Image Prompt:** A vivid description for generating an image of this card
`;
  }
}

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
    case 'hazard':
      return '* **Icon(s):** [Danger Icon] [Environment Icon]\n* **Difficulty:** Fight 7, Flee 5\n';
    case 'npc':
      return '* **Icon(s):** [Character Icon] [Vendor Icon]\n* **Interaction:** Charm 6\n';
    case 'player-character':
      return '* **Stats:** Brawn 3, Moxie 2, Charm 4, Grit 3, Weird Sense 2\n* **Special Ability:** Description of character\'s unique ability\n';
    case 'treasure':
      return '* **Icon(s):** [Treasure Icon] [Value Icon]\n* **Value:** 3\n';
    case 'region':
      return '* **Icon(s):** [Biome Icon] [Feature Icon]\n* **Encounters:** Description of typical encounters\n';
    case 'mission':
      return '* **Icon(s):** [Mission Icon] [Difficulty Icon]\n* **Objectives:** Primary and secondary objectives\n* **Heat:** Starting heat level\n';
    default:
      return '* **Icon(s):** [Primary Icon] [Secondary Icon]\n';
  }
};
