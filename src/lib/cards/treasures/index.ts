
import { TreasureCard } from "@/types/cards/treasure";
import { log } from "@/utils/logging";

// Import card collections from individual files
import { valuableItems } from "./valuable-items";
import { artifacts } from "./artifacts";
import { consumables } from "./consumables";
import { specialItems } from "./special-items";

// Combine all treasure cards into a single collection
export const TREASURE_CARDS: TreasureCard[] = [
  ...valuableItems,
  ...artifacts,
  ...consumables,
  ...specialItems
];

log.info(`Treasure cards initialized with ${TREASURE_CARDS.length} items`);
