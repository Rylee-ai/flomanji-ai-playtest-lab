
import { PlayerCharacterCard } from "@/types/cards/player-character";
import { createBaseCard } from "./base-processor";

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
