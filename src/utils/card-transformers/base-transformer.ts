
import { CardFormValues } from '@/types/forms/card-form';
import { processCardIcons } from '../card-processors/base-processor';

/**
 * Base transformer function that handles common card properties
 */
export const createBaseCard = (rawCard: any): Partial<CardFormValues> => {
  // Handle different naming conventions in source data
  const name = rawCard.name || rawCard.title || '';
  const id = rawCard.id || `card-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  
  // Process icons
  const icons = Array.isArray(rawCard.icons)
    ? processCardIcons(rawCard.icons)
    : [];
  
  // Process keywords
  const keywords = Array.isArray(rawCard.keywords)
    ? rawCard.keywords
    : [];
  
  // Process rules
  const rules = Array.isArray(rawCard.rules)
    ? rawCard.rules
    : typeof rawCard.rules === 'string' 
      ? [rawCard.rules] 
      : [];
  
  // Return the base card
  return {
    id,
    name,
    icons,
    keywords,
    rules,
    flavor: rawCard.flavor || '',
    imagePrompt: rawCard.imagePrompt || rawCard.image_prompt || '',
  };
};
