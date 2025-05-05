
import { HazardCard } from '@/types/cards/hazard';
import { CardFormValues } from '@/types/forms/card-form';
import { createBaseCard } from './base-transformer';

/**
 * Transform raw hazard data to our internal hazard card format
 */
export const transformHazardCardData = (jsonData: any[]): CardFormValues[] => {
  return jsonData.map(hazard => {
    // First create the base card properties
    const baseCard = createBaseCard(hazard);
    
    // Define the difficulty classes object
    const difficultyClasses = hazard.difficultyClasses || {};
    
    // Define the gear bonuses array if present
    const gearBonuses = Array.isArray(hazard.gearBonuses) 
      ? hazard.gearBonuses 
      : [];
    
    // Transform to hazard card
    return {
      ...baseCard,
      type: 'hazard',
      subType: hazard.subType || 'environmental',
      difficultyClasses,
      onFailure: hazard.onFailure || '',
      onSuccess: hazard.onSuccess || '',
      bossHazard: hazard.bossHazard || false,
      gearBonuses,
    } as CardFormValues;
  });
};
