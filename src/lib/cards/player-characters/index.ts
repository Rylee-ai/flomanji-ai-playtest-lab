
import { PlayerCharacterCard } from "@/types/cards/player-character";
import { v4 as uuidv4 } from "uuid";

// Import all character groups
import { SPRING_BREAKER } from "./spring-breaker";
import { HOA_ENFORCER } from "./hoa-enforcer";
import { CRYPTID_HUNTER } from "./cryptid-hunter";
import { GATOR_WRANGLER } from "./gator-wrangler";
import { SNOWBIRD_RETIREE } from "./snowbird-retiree";
import { THEME_PARK_EMPLOYEE } from "./theme-park-employee";
import { SURVIVALIST_PREPPER } from "./survivalist-prepper";
import { INSTAGRAM_INFLUENCER } from "./instagram-influencer";
import { LOCAL_BLOGGER } from "./local-blogger";

// Combine all characters into a single array
export const FLOMANJI_PLAYER_CHARACTERS: PlayerCharacterCard[] = [
  SPRING_BREAKER,
  HOA_ENFORCER,
  CRYPTID_HUNTER,
  GATOR_WRANGLER,
  SNOWBIRD_RETIREE,
  THEME_PARK_EMPLOYEE,
  SURVIVALIST_PREPPER,
  INSTAGRAM_INFLUENCER,
  LOCAL_BLOGGER
];

/**
 * Get all Flomanji player character cards
 * @returns Array of PlayerCharacterCard objects
 */
export const getAllFlomanjiPlayerCharacters = (): PlayerCharacterCard[] => {
  return FLOMANJI_PLAYER_CHARACTERS.map(card => ({
    ...card,
    id: card.id || uuidv4()
  }));
};

/**
 * Get a Flomanji player character by ID
 * @param id The character ID to find
 * @returns The character card or undefined if not found
 */
export const getFlomanjiPlayerCharacterById = (id: string): PlayerCharacterCard | undefined => {
  return FLOMANJI_PLAYER_CHARACTERS.find(card => card.id === id);
};
