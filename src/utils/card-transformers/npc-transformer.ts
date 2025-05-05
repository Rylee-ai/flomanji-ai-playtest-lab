
import { NPCCard } from '@/types/cards/npc';
import { CardFormValues } from '@/types/forms/card-form';
import { createBaseCard } from './base-transformer';

/**
 * Transform raw NPC data to our internal NPC card format
 */
export const transformNPCCardData = (jsonData: any[]): CardFormValues[] => {
  return jsonData.map(npc => {
    // First create the base card properties
    const baseCard = createBaseCard(npc);
    
    // Transform actions if present
    const actions = Array.isArray(npc.actions) 
      ? npc.actions.map((action: any) => ({
          description: action.description || '',
          cost: action.cost !== undefined ? action.cost : 1,
          effect: action.effect || ''
        }))
      : [];
    
    // Transform to NPC card
    return {
      ...baseCard,
      type: 'npc',
      checkDC: npc.checkDC || 0,
      actions,
    } as CardFormValues;
  });
};
