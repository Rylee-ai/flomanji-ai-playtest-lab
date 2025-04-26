
import { AutomaCard } from "@/types/cards";
import { createBaseCard } from "./base-processor";

export const processAutomaCard = (validatedCard: any): Partial<AutomaCard> => ({
  ...createBaseCard(validatedCard),
  type: 'automa',
  movement: validatedCard.movement,
  combatBonus: validatedCard.combatBonus,
  specialEffect: validatedCard.specialEffect,
});
