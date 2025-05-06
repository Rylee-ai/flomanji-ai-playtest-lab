
import { TREASURE_CARDS } from "./treasures";
import { TreasureCard } from "@/types/cards/treasure";
import { log } from "@/utils/logging";

// This file re-exports the treasure cards from the modular structure
// and serves as a backward compatibility layer

log.info(`Treasure cards imported from modular structure: ${TREASURE_CARDS.length} cards`);

export { TREASURE_CARDS };

// Legacy support for functions that expect specific cards
export const getTreasureCardById = (id: string): TreasureCard | undefined => {
  return TREASURE_CARDS.find(card => card.id === id);
};
