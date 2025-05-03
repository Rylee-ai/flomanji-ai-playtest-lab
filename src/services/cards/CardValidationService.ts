
import { GameCard, CardType } from "@/types/cards";
import * as schemas from "@/schemas/card-schemas";

/**
 * Service for validating cards against schemas
 */
export class CardValidationService {
  /**
   * Validate card against schema
   */
  static validateCard<T extends GameCard>(card: T, type: CardType): { valid: boolean; errors: string[] } {
    // This is a placeholder - we'll implement actual validation using Zod schemas
    // In a full implementation, we would use the appropriate schema based on the card type
    
    const errors: string[] = [];
    
    // Basic validation
    if (!card.id) {
      errors.push("Card must have an ID");
    }
    
    if (!card.name) {
      errors.push("Card must have a name");
    }
    
    if (!card.type) {
      errors.push("Card must have a type");
    }
    
    if (!Array.isArray(card.icons)) {
      errors.push("Card icons must be an array");
    }
    
    if (!Array.isArray(card.keywords)) {
      errors.push("Card keywords must be an array");
    }
    
    if (!Array.isArray(card.rules)) {
      errors.push("Card rules must be an array");
    }
    
    return { 
      valid: errors.length === 0, 
      errors 
    };
  }
}
