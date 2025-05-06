
import { NPCCard, PlayerCharacterCard, FlomanjifiedRoleCard } from "@/types/cards";
import { createBaseCard } from "./base-processor";

/**
 * Process NPC card data into the required format
 */
export const processNPCCard = (validatedCard: any): Partial<NPCCard> => ({
  ...createBaseCard(validatedCard),
  type: 'npc',
  checkDC: validatedCard.checkDC,
  actions: validatedCard.actions,
});

/**
 * Process player character card data into the required format
 */
export const processPlayerCharacterCard = (validatedCard: any): Partial<PlayerCharacterCard> => ({
  ...createBaseCard(validatedCard),
  type: 'player-character',
  role: validatedCard.role,
  stats: validatedCard.stats,
  ability: validatedCard.ability,
  health: validatedCard.health,
  weirdness: validatedCard.weirdness,
  luck: validatedCard.luck,
  starterGear: validatedCard.starterGear,
});

/**
 * Process flomanjified role card data into the required format
 */
export const processFlomanjifiedCard = (validatedCard: any): Partial<FlomanjifiedRoleCard> => ({
  ...createBaseCard(validatedCard),
  type: 'flomanjified',
  originalRole: validatedCard.originalRole,
  chaosAction: validatedCard.chaosAction,
  specialAbility: validatedCard.specialAbility,
});
