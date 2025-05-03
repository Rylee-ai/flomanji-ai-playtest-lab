
import { useState } from "react";
import { toast } from "sonner";
import { CardType } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { AICardProcessorService, CardSuggestion } from "@/utils/ai-processing/AICardProcessorService";

/**
 * Hook for managing AI-powered card processing
 * Provides state and methods for handling AI analysis of imported cards
 */
export function useAICardProcessing() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [suggestions, setSuggestions] = useState<CardSuggestion[]>([]);
  const [enhancedCards, setEnhancedCards] = useState<CardFormValues[]>([]);
  const [originalCards, setOriginalCards] = useState<CardFormValues[]>([]);
  const [processingError, setProcessingError] = useState<string | null>(null);
  const [processingStats, setProcessingStats] = useState<{
    totalCards: number;
    improvedCards: number;
    totalSuggestions: number;
  }>({ totalCards: 0, improvedCards: 0, totalSuggestions: 0 });

  /**
   * Process cards with AI to enhance and validate them
   * @param cards Array of cards to process
   * @param cardType Type of cards being processed
   * @returns Array of processed cards (enhanced or original if processing fails)
   */
  const processCardsWithAI = async (cards: CardFormValues[], cardType: CardType): Promise<CardFormValues[]> => {
    if (!cards.length) {
      return cards;
    }

    setIsProcessing(true);
    setProcessingError(null);
    setOriginalCards(cards);
    
    try {
      console.log(`useAICardProcessing: Processing ${cards.length} cards of type ${cardType}`);
      const { enhancedCards, suggestions } = await AICardProcessorService.processCards(cards, cardType);
      
      // Calculate processing stats
      const improvedCards = enhancedCards.filter((card, index) => 
        JSON.stringify(card) !== JSON.stringify(cards[index])
      ).length;
      
      setEnhancedCards(enhancedCards);
      setSuggestions(suggestions);
      setProcessingStats({
        totalCards: cards.length,
        improvedCards: improvedCards,
        totalSuggestions: suggestions.length
      });
      
      if (suggestions.length > 0) {
        toast.success(`AI found ${suggestions.length} potential improvements for your cards`);
      } else if (improvedCards > 0) {
        toast.success(`AI enhanced ${improvedCards} cards with no additional suggestions`);
      } else {
        toast.success(`AI has validated your cards with no issues found`);
      }
      
      return enhancedCards;
    } catch (error: any) {
      console.error("Error in AI card processing:", error);
      setProcessingError(error.message || "Unknown error during AI processing");
      toast.error("AI processing failed. Using original cards instead.");
      return cards;
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Apply a specific suggestion to a card
   * @param suggestionIndex Index of the suggestion to apply
   * @returns Updated array of cards with the suggestion applied
   */
  const applySuggestion = (suggestionIndex: number): CardFormValues[] => {
    if (!suggestions[suggestionIndex] || !enhancedCards.length) {
      return enhancedCards;
    }

    const suggestion = suggestions[suggestionIndex];
    
    try {
      console.log(`Applying suggestion for ${suggestion.cardName}, field: ${suggestion.field}`);
      
      // Create a copy of the enhanced cards
      const updatedCards = enhancedCards.map(card => {
        if (card.name === suggestion.cardName) {
          // Apply the suggestion based on the field
          const updatedCard = { ...card };
          const fieldKey = suggestion.field as keyof CardFormValues;
          
          // Handle array fields differently
          if (Array.isArray(updatedCard[fieldKey])) {
            // For array fields like rules or keywords, add the suggestion as a new item
            const currentArray = updatedCard[fieldKey] as unknown[];
            
            // Create a properly typed array with the suggestion
            if (fieldKey === 'rules' || fieldKey === 'keywords' || fieldKey === 'icons') {
              // For known array fields, correctly type the arrays
              if (typeof suggestion.suggestion === 'string') {
                if (fieldKey === 'rules') {
                  updatedCard.rules = [...(updatedCard.rules || []), suggestion.suggestion];
                } else if (fieldKey === 'keywords') {
                  updatedCard.keywords = [...(updatedCard.keywords || []), suggestion.suggestion];
                } else if (fieldKey === 'icons') {
                  // Icons are objects with symbol and name properties
                  console.warn('Cannot directly add string suggestion to icons array, requires proper icon object');
                }
              } else if (typeof suggestion.suggestion === 'object' && fieldKey === 'icons') {
                // Type assertion to handle the icons array case
                const iconSuggestion = suggestion.suggestion as {symbol: string, name: string};
                updatedCard.icons = [...(updatedCard.icons || []), iconSuggestion];
              }
            }
          } else {
            // For string fields, replace the value if compatible types
            if (typeof updatedCard[fieldKey] === typeof suggestion.suggestion) {
              updatedCard[fieldKey] = suggestion.suggestion as any;
            } else {
              console.warn(`Type mismatch: Cannot apply suggestion of type ${typeof suggestion.suggestion} to field ${fieldKey} of type ${typeof updatedCard[fieldKey]}`);
            }
          }
          
          return updatedCard;
        }
        return card;
      });
      
      // Update the state
      setEnhancedCards(updatedCards);
      
      // Remove the applied suggestion
      const updatedSuggestions = suggestions.filter((_, index) => index !== suggestionIndex);
      setSuggestions(updatedSuggestions);
      
      toast.success(`Applied suggestion for ${suggestion.cardName}`);
      
      return updatedCards;
    } catch (error: any) {
      console.error("Error applying suggestion:", error);
      toast.error(`Failed to apply suggestion: ${error.message}`);
      return enhancedCards;
    }
  };

  /**
   * Reset all AI processing state
   */
  const resetAIProcessing = () => {
    setSuggestions([]);
    setEnhancedCards([]);
    setOriginalCards([]);
    setProcessingError(null);
    setProcessingStats({ totalCards: 0, improvedCards: 0, totalSuggestions: 0 });
  };

  /**
   * Get a card comparison to see what changed in a specific card
   * @param cardIndex Index of the card to compare
   * @returns An object with original and enhanced card
   */
  const getCardComparison = (cardIndex: number) => {
    if (!originalCards[cardIndex] || !enhancedCards[cardIndex]) {
      return null;
    }
    
    return {
      original: originalCards[cardIndex],
      enhanced: enhancedCards[cardIndex]
    };
  };

  return {
    isProcessing,
    suggestions,
    enhancedCards,
    originalCards,
    processingError,
    processingStats,
    processCardsWithAI,
    applySuggestion,
    resetAIProcessing,
    getCardComparison
  };
}
