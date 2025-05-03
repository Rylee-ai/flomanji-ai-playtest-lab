
import { CardType } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { createChatCompletion } from "@/lib/openrouterChat";

/**
 * Service for AI-powered card processing and enhancement
 */
export class AICardProcessorService {
  /**
   * Process cards using AI to enhance and validate them
   * @param cards The cards to process
   * @param cardType The type of cards being processed
   * @returns The enhanced cards and any suggestions for improvement
   */
  static async processCards(
    cards: CardFormValues[],
    cardType: CardType
  ): Promise<{
    enhancedCards: CardFormValues[];
    suggestions: CardSuggestion[];
  }> {
    try {
      if (!cards.length) {
        return { enhancedCards: [], suggestions: [] };
      }

      console.log(`Processing ${cards.length} ${cardType} cards with AI`);
      
      // Create a simplified version of the cards for the AI prompt
      const simplifiedCards = cards.map(card => ({
        name: card.name,
        type: card.type,
        keywords: card.keywords || [],
        rules: card.rules || [],
        flavor: card.flavor || "",
        // Only include type-specific fields
        ...(card.category && { category: card.category }),
        ...(card.value !== undefined && { value: card.value }),
        ...(card.subType && { subType: card.subType })
      }));

      // Generate the AI prompt based on card type and content
      const prompt = this.generatePrompt(simplifiedCards, cardType);
      
      // Process with AI
      const aiResponse = await createChatCompletion(
        this.getSystemPrompt(cardType),
        [{ role: "user", content: prompt }]
      );
      
      // Parse AI response
      const { enhancedCards, suggestions } = this.parseAIResponse(aiResponse, cards);
      
      return { 
        enhancedCards: enhancedCards || cards,
        suggestions: suggestions || []
      };
    } catch (error) {
      console.error("Error processing cards with AI:", error);
      // Return original cards if AI processing fails
      return { enhancedCards: cards, suggestions: [] };
    }
  }

  /**
   * Generate a system prompt for the AI based on card type
   */
  private static getSystemPrompt(cardType: CardType): string {
    return `You are an AI assistant specialized in analyzing and enhancing Flomanji game cards.
Your task is to review ${cardType} cards for logical consistency, rule clarity, and game balance.
Respond with enhanced card data and any suggestions for improvements.

For each card, check:
1. Consistent terminology matching Flomanji standards
2. Clear and unambiguous rule text
3. Proper categorization and keywords
4. Balanced gameplay effects
5. Thematic consistency

Your response should be formatted as valid JSON with two sections: 
1. "enhancedCards": An array of the improved card data
2. "suggestions": An array of improvement suggestions with cardName, field, suggestion, and reason

DO NOT completely rewrite cards unless absolutely necessary - focus on small improvements and enhancement suggestions.`;
  }

  /**
   * Generate a prompt for the AI based on the cards being processed
   */
  private static generatePrompt(
    cards: Partial<CardFormValues>[],
    cardType: CardType
  ): string {
    const cardsJson = JSON.stringify(cards, null, 2);
    
    return `Please analyze and enhance these ${cardType} cards for the Flomanji game:

${cardsJson}

For each card:
1. Fix any inconsistent terminology
2. Enhance clarity of rules text
3. Suggest appropriate keywords if missing
4. Validate game balance (without making major changes)
5. Ensure thematic consistency

Please return:
1. The enhanced cards (with minimal changes)
2. Specific suggestions for improvements

Respond in JSON format with "enhancedCards" and "suggestions" keys.`;
  }

  /**
   * Parse the AI response to extract enhanced cards and suggestions
   */
  private static parseAIResponse(
    aiResponse: string,
    originalCards: CardFormValues[]
  ): {
    enhancedCards: CardFormValues[];
    suggestions: CardSuggestion[];
  } {
    try {
      // Try to parse the AI response as JSON
      const parsedResponse = JSON.parse(aiResponse);
      
      // Extract enhanced cards, falling back to originals
      let enhancedCards = originalCards;
      if (parsedResponse.enhancedCards && Array.isArray(parsedResponse.enhancedCards)) {
        // Merge enhanced cards with originals to ensure no data is lost
        enhancedCards = originalCards.map((originalCard, index) => {
          const enhancedCard = parsedResponse.enhancedCards[index];
          if (!enhancedCard) return originalCard;
          
          return {
            ...originalCard,
            // Only update text fields that the AI has enhanced
            name: enhancedCard.name || originalCard.name,
            keywords: enhancedCard.keywords || originalCard.keywords,
            rules: enhancedCard.rules || originalCard.rules,
            flavor: enhancedCard.flavor || originalCard.flavor,
          };
        });
      }
      
      // Extract suggestions
      let suggestions: CardSuggestion[] = [];
      if (parsedResponse.suggestions && Array.isArray(parsedResponse.suggestions)) {
        suggestions = parsedResponse.suggestions;
      }
      
      return { enhancedCards, suggestions };
    } catch (error) {
      console.error("Error parsing AI response:", error);
      return { enhancedCards: originalCards, suggestions: [] };
    }
  }
}

/**
 * Type definition for card improvement suggestions
 */
export interface CardSuggestion {
  cardName: string;
  field: string;
  suggestion: string;
  reason: string;
}
