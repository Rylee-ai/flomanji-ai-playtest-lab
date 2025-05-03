
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

* **Title:** EXAMPLE PASSIVE GEAR
* **Type:** GEAR – Passive
* **Icon(s):** [Passive Icon] [Protection Icon]
* **Keywords:** protective, equipped, permanent
* **Rules:** While equipped: Gain +1 Grit on Stat Checks involving physical challenges.
* **Flavor:** *"Goblet: 'A permanent boon to your physical prowess.'"*
* **Image Prompt:** A sturdy wristband with swamp-proof materials
`;
    
    case 'treasure':
      return `* **Title:** EXAMPLE TREASURE
* **Type:** TREASURE
* **Icon(s):** [Value Icon] [Mystery Icon]
* **Keywords:** valuable, tradeable, collectible
* **Rules:** This item can be traded for valuable resources or information.
* **Flavor:** *"Goblet: 'Worth more than its weight in nostalgia.'"*
* **Image Prompt:** A gleaming artifact partially covered in swamp moss

* **Title:** EXAMPLE RARE TREASURE
* **Type:** TREASURE – Rare
* **Icon(s):** [Rare Icon] [Ancient Icon]
* **Keywords:** ancient, powerful, unique
* **Rules:** This treasure provides an ongoing benefit while in your possession.
* **Flavor:** *"Goblet: 'The ancients knew its value, and now, so do you.'"*
* **Image Prompt:** A mysterious artifact with glowing runes from a lost civilization
`;
    
    case 'hazard':
      return `* **Title:** EXAMPLE HAZARD
* **Type:** HAZARD – Environmental
* **Icon(s):** [Danger Icon] [Environment Icon]
* **Keywords:** obstacle, threatening, challenging
* **Rules:** Players must make a DC 4 Grit check when encountering this hazard. Failure results in 1 damage.
* **Flavor:** *"Goblet: 'Nature's way of saying 'keep out' in the most painful manner possible.'"*
* **Image Prompt:** A dangerous environmental feature looming menacingly

* **Title:** EXAMPLE CREATURE HAZARD
* **Type:** HAZARD – Creature
* **Icon(s):** [Animal Icon] [Threat Icon]
* **Keywords:** predator, aggressive, territorial
* **Rules:** When encountered, all players must make a DC 5 Fight or Flee check. Failure results in 2 damage.
* **Flavor:** *"Goblet: 'Teeth, claws, and a very bad attitude. Proceed with caution... or better yet, don't.'"*
* **Image Prompt:** A menacing creature with glowing eyes lurking in the shadows
`;

    case 'npc':
      return `* **Title:** EXAMPLE NPC
* **Type:** NPC – Vendor
* **Icon(s):** [Character Icon] [Commerce Icon]
* **Keywords:** helpful, knowledgeable, trade
* **Rules:** This NPC offers useful items for trade or purchase. Players can gain information with a successful DC 3 Charm check.
* **Flavor:** *"Goblet: 'They've seen things you wouldn't believe... and they're willing to talk for the right price.'"*
* **Image Prompt:** A weathered individual with knowing eyes surrounded by unusual merchandise
`;

    case 'player-character':
      return `* **Title:** EXAMPLE CHARACTER
* **Type:** PLAYER-CHARACTER
* **Icon(s):** [Hero Icon] [Specialty Icon]
* **Keywords:** versatile, resourceful, determined
* **Rules:** Starting Stats: Brawn 3, Moxie 4, Charm 2, Grit 3, Weird Sense 3. Special Ability: Once per game, automatically succeed on any Weird Sense check.
* **Flavor:** *"Goblet: 'Born for adventure, destined for... well, let's find out together, shall we?'"*
* **Image Prompt:** A determined character with practical survival gear and a confident stance
`;

    // Add templates for other card types
    default:
      return `* **Title:** EXAMPLE ${cardType.toUpperCase()} CARD
* **Type:** ${cardType.toUpperCase()}
* **Icon(s):** [Icon1] [Icon2]
* **Keywords:** keyword1, keyword2, keyword3
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
