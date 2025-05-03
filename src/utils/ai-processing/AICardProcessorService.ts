
import { CardType } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { createChatCompletion } from "@/lib/openrouterChat";
import { toast } from "sonner";

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
        console.log("AICardProcessorService: No cards to process");
        return { enhancedCards: [], suggestions: [] };
      }

      console.log(`AICardProcessorService: Processing ${cards.length} ${cardType} cards with AI`);
      
      // Create a simplified version of the cards for the AI prompt
      const simplifiedCards = cards.map(card => ({
        id: card.id || "", // Include ID if available
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
      
      console.log("AICardProcessorService: Sending request to AI service");
      // Process with AI
      const aiResponse = await createChatCompletion(
        this.getSystemPrompt(cardType),
        [{ role: "user", content: prompt }]
      );
      
      console.log("AICardProcessorService: Received response from AI service");
      
      // Parse AI response
      const { enhancedCards, suggestions } = this.parseAIResponse(aiResponse, cards);
      
      console.log(`AICardProcessorService: Processed ${enhancedCards.length} cards with ${suggestions.length} suggestions`);
      
      return { 
        enhancedCards: enhancedCards || cards,
        suggestions: suggestions || []
      };
    } catch (error) {
      console.error("Error processing cards with AI:", error);
      toast.error(`AI processing error: ${error.message || "Unknown error"}`);
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

DO NOT completely rewrite cards unless absolutely necessary - focus on small improvements and enhancement suggestions.
CRITICALLY IMPORTANT: Your response must be valid JSON that can be parsed with JSON.parse()`;
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

Respond in JSON format with "enhancedCards" and "suggestions" keys. Don't include any text outside the JSON object.`;
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
      // Clean the response to ensure we only have valid JSON
      const cleanedResponse = this.cleanJsonResponse(aiResponse);
      console.log("AICardProcessorService: Parsing AI response");
      
      // Try to parse the AI response as JSON
      const parsedResponse = JSON.parse(cleanedResponse);
      
      // Extract enhanced cards, falling back to originals
      let enhancedCards = originalCards;
      if (parsedResponse.enhancedCards && Array.isArray(parsedResponse.enhancedCards)) {
        console.log("AICardProcessorService: Processing enhanced cards from AI");
        // Merge enhanced cards with originals to ensure no data is lost
        enhancedCards = originalCards.map((originalCard, index) => {
          // If we don't have a matching enhanced card, return the original
          if (!parsedResponse.enhancedCards[index]) return originalCard;
          
          const enhancedCard = parsedResponse.enhancedCards[index];
          
          // Maintain the original structure while updating specific fields
          const mergedCard = { 
            ...originalCard,
            // Only update these fields from the AI response if they exist
            ...(enhancedCard.name && { name: enhancedCard.name }),
            ...(enhancedCard.keywords && { keywords: enhancedCard.keywords }),
            ...(enhancedCard.rules && { rules: enhancedCard.rules }),
            ...(enhancedCard.flavor && { flavor: enhancedCard.flavor }),
          };
          
          // Ensure that keywords and rules are always arrays
          if (!Array.isArray(mergedCard.keywords)) {
            mergedCard.keywords = mergedCard.keywords ? [mergedCard.keywords] : [];
          }
          
          if (!Array.isArray(mergedCard.rules)) {
            mergedCard.rules = mergedCard.rules ? [mergedCard.rules] : [];
          }
          
          return mergedCard;
        });
      } else {
        console.warn("AICardProcessorService: No enhanced cards found in AI response");
      }
      
      // Extract suggestions
      let suggestions: CardSuggestion[] = [];
      if (parsedResponse.suggestions && Array.isArray(parsedResponse.suggestions)) {
        console.log(`AICardProcessorService: Processing ${parsedResponse.suggestions.length} suggestions from AI`);
        suggestions = parsedResponse.suggestions.map(suggestion => ({
          cardName: suggestion.cardName || "Unknown Card",
          field: suggestion.field || "general",
          suggestion: suggestion.suggestion || "No suggestion provided",
          reason: suggestion.reason || "No reason provided"
        }));
      } else {
        console.warn("AICardProcessorService: No suggestions found in AI response");
      }
      
      return { enhancedCards, suggestions };
    } catch (error) {
      console.error("Error parsing AI response:", error, "Response:", aiResponse);
      return { enhancedCards: originalCards, suggestions: [] };
    }
  }

  /**
   * Clean the AI response to ensure we have valid JSON
   */
  private static cleanJsonResponse(response: string): string {
    try {
      // Try to find JSON content within markdown code blocks or regular text
      const jsonMatch = response.match(/```(?:json)?([\s\S]*?)```/) || response.match(/(\{[\s\S]*\})/);
      
      if (jsonMatch && jsonMatch[1]) {
        return jsonMatch[1].trim();
      }
      
      // If no JSON blocks found, just return the original response
      return response;
    } catch (error) {
      console.error("Error cleaning JSON response:", error);
      return response;
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
