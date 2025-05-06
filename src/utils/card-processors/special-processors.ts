
import { createBaseCard } from "./base-processor";

/**
 * Process hazard card data into the required format
 */
export const processHazardCard = (validatedCard: any): Partial<any> => ({
  ...createBaseCard(validatedCard),
  type: 'hazard',
  subType: validatedCard.subType,
  difficultyClasses: validatedCard.difficultyClasses,
  onFailure: validatedCard.onFailure,
  onSuccess: validatedCard.onSuccess,
  bossHazard: validatedCard.bossHazard,
  gearBonuses: validatedCard.gearBonuses,
});

/**
 * Process chaos card data into the required format
 */
export const processChaosCard = (validatedCard: any): Partial<any> => ({
  ...createBaseCard(validatedCard),
  type: 'chaos',
  heatEffect: validatedCard.heatEffect,
  globalEffect: validatedCard.globalEffect,
  duration: validatedCard.duration,
});

/**
 * Process automa card data into the required format
 */
export const processAutomaCard = (validatedCard: any): Partial<any> => ({
  ...createBaseCard(validatedCard),
  type: 'automa',
  movement: validatedCard.movement,
  combatBonus: validatedCard.combatBonus,
  specialEffect: validatedCard.specialEffect,
});

/**
 * Process secret objective card data into the required format
 */
export const processSecretCard = (validatedCard: any): Partial<any> => ({
  ...createBaseCard(validatedCard),
  type: 'secret',
  alignment: validatedCard.alignment,
  winCondition: validatedCard.winCondition,
});
