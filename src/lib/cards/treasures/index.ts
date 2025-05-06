
import { TreasureCard } from "@/types/cards/treasure";
import { log } from "@/utils/logging";

// Import card collections from individual files
import { valuableItems } from "./valuable-items";
import { artifacts } from "./artifacts";
import { consumables } from "./consumables";
import { specialItems } from "./special-items";
import { defensiveItems } from "./defensive-items";
import { specialTools } from "./special-tools";

// Combine all treasure cards into a single collection
export const TREASURE_CARDS: TreasureCard[] = [
  ...valuableItems,
  ...artifacts,
  ...consumables,
  ...specialItems,
  ...defensiveItems,
  ...specialTools
];

log.info(`Treasure cards initialized with ${TREASURE_CARDS.length} items`);

// Helper functions for retrieving specific card types
export const getTreasureItems = (): TreasureCard[] => 
  TREASURE_CARDS.filter(card => card.type === 'treasure');

export const getArtifactItems = (): TreasureCard[] => 
  TREASURE_CARDS.filter(card => card.type === 'artifact');

export const getConsumableItems = (): TreasureCard[] => 
  TREASURE_CARDS.filter(card => card.consumable === true);

// Helper function to get a specific treasure card by ID
export const getTreasureById = (id: string): TreasureCard | undefined => 
  TREASURE_CARDS.find(card => card.id === id);

// Helper function to get cards by keyword
export const getTreasuresByKeyword = (keyword: string): TreasureCard[] => 
  TREASURE_CARDS.filter(card => card.keywords.includes(keyword));
