
import { v4 as uuidv4 } from 'uuid';

/**
 * Normalizes and cleans text before processing
 * @param text The text to clean
 * @returns Cleaned text string
 */
export const normalizeText = (text: string): string => {
  if (!text) return '';
  
  return text
    .replace(/\r\n/g, '\n')       // Normalize line endings
    .replace(/\n{3,}/g, '\n\n')   // Standardize multiple blank lines
    .trim();                      // Remove leading/trailing whitespace
};

/**
 * Generates a unique ID for a card based on its name
 * @param cardName The name of the card
 * @returns A unique ID string
 */
export const generateCardId = (cardName: string): string => {
  if (!cardName) return `card-unnamed-${uuidv4().slice(0, 8)}`;
  
  const safeName = cardName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return `card-${safeName}-${uuidv4().slice(0, 8)}`;
};

/**
 * Validates if a card has the minimum required fields
 * @param card The card object to validate
 * @returns Boolean indicating if card is valid
 */
export const validateCardMinimum = (card: any): boolean => {
  if (!card) return false;
  if (!card.name || card.name.trim().length === 0) return false;
  if (!card.id) return false;
  
  return true;
};
