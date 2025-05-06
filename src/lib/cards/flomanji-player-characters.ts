
import { PlayerCharacterCard } from "@/types/cards/player-character";
import { log } from "@/utils/logging";
import { PLAYER_CHARACTER_CARDS } from "@/lib/cards/player-character-cards";

/**
 * Get all Flomanji player characters
 */
export const getAllFlomanjiPlayerCharacters = (): PlayerCharacterCard[] => {
  log.info("Getting all Flomanji player characters");
  return PLAYER_CHARACTER_CARDS;
};
