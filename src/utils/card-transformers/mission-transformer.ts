
import { MissionSheet } from '@/types/cards/mission';
import { CardFormValues } from '@/types/forms/card-form';
import { createBaseCard } from './base-transformer';

/**
 * Transform raw mission data to our internal mission card format
 */
export const transformMissionCardData = (jsonData: any[]): CardFormValues[] => {
  return jsonData.map(mission => {
    // First create the base card properties
    const baseCard = createBaseCard(mission);
    
    // Transform objectives to the correct format if needed
    const objectives = Array.isArray(mission.objectives) 
      ? mission.objectives.map((obj: any) => ({
          description: obj.description || "Complete objective",
          required: typeof obj.required === 'boolean' ? obj.required : true,
          reward: obj.reward,
          completionCheck: obj.completionCheck,
          difficultyLevel: obj.difficultyLevel || 3
        }))
      : [];
    
    // Transform to mission card
    return {
      ...baseCard,
      type: mission.type || 'escape',
      hook: mission.hook || mission.description || '',
      mapLayout: mission.mapLayout || 'Standard 5x5 grid',
      startingHeat: mission.startingHeat || 0,
      objectives: objectives,
      extractionRegion: mission.extractionRegion || 'Southeast corner',
      specialRules: Array.isArray(mission.specialRules) 
        ? mission.specialRules 
        : [],
      scaling: mission.scaling || {
        small: "Reduce difficulty checks by 1",
        large: "Add 1 additional hazard"
      }
    } as CardFormValues;
  });
};
