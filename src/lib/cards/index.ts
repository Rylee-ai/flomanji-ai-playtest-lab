
import { CardType, GameCard } from "@/types/cards";
import { log } from "@/utils/logging";
import { FLOMANJIFIED_CARDS } from "./flomanjified";
import { TREASURE_CARDS } from "./treasures";

// This file serves as a placeholder for the card library
// The actual card data will be loaded from external sources

log.info("Card library initialized with collections");

// Export empty collections for each card type
export const HAZARD_CARDS: GameCard[] = [];
export const GEAR_CARDS: GameCard[] = [];
export const NPC_CARDS: GameCard[] = [];
export const MISSION_CARDS: GameCard[] = [];
export const PLAYER_CHARACTER_CARDS: GameCard[] = [];
export const REGION_CARDS: GameCard[] = [];
export const CHAOS_CARDS: GameCard[] = [];
export { FLOMANJIFIED_CARDS };
export { TREASURE_CARDS };
export const SECRET_CARDS: GameCard[] = [];
export const AUTOMA_CARDS: GameCard[] = [];

// Function to get empty card collection by type
export const getEmptyCardCollection = (type: CardType): GameCard[] => {
  log.debug(`Requested empty card collection for type: ${type}`);
  return [];
};
