
import { useState } from "react";
import { toast } from "sonner";
import { CardType } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { AICardProcessorService, CardSuggestion } from "@/utils/ai-processing/AICardProcessorService";

/**
 * Hook for managing AI-powered card processing
 */
export function useAICardProcessing() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [suggestions, setSuggestions] = useState<CardSuggestion[]>([]);
  const [enhancedCards, setEnhancedCards] = useState<CardFormValues[]>([]);
  const [originalCards, setOriginalCards] = useState<CardFormValues[]>([]);

  /**
   * Process cards with AI to enhance and validate them
   */
  const processCardsWithAI = async (cards: CardFormValues[], cardType: CardType): Promise<CardFormValues[]> => {
    if (!cards.length) {
      return cards;
    }

    setIsProcessing(true);
    setOriginalCards(cards);
    
    try {
      const { enhancedCards, suggestions } = await AICardProcessorService.processCards(cards, cardType);
      
      setEnhancedCards(enhancedCards);
      setSuggestions(suggestions);
      
      if (suggestions.length > 0) {
        toast.success(`AI found ${suggestions.length} potential improvements for your cards`);
      } else {
        toast.success(`AI has validated your cards with no issues found`);
      }
      
      return enhancedCards;
    } catch (error) {
      console.error("Error in AI card processing:", error);
      toast.error("AI processing failed. Using original cards instead.");
      return cards;
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Apply a specific suggestion to a card
   */
  const applySuggestion = (suggestionIndex: number): CardFormValues[] => {
    if (!suggestions[suggestionIndex] || !enhancedCards.length) {
      return enhancedCards;
    }

    const suggestion = suggestions[suggestionIndex];
    
    // Create a copy of the enhanced cards
    const updatedCards = enhancedCards.map(card => {
      if (card.name === suggestion.cardName) {
        // Apply the suggestion based on the field
        return {
          ...card,
          [suggestion.field]: suggestion.suggestion
        };
      }
      return card;
    });
    
    // Update the state
    setEnhancedCards(updatedCards);
    
    // Remove the applied suggestion
    const updatedSuggestions = suggestions.filter((_, index) => index !== suggestionIndex);
    setSuggestions(updatedSuggestions);
    
    return updatedCards;
  };

  /**
   * Reset all AI processing state
   */
  const resetAIProcessing = () => {
    setSuggestions([]);
    setEnhancedCards([]);
    setOriginalCards([]);
  };

  return {
    isProcessing,
    suggestions,
    enhancedCards,
    originalCards,
    processCardsWithAI,
    applySuggestion,
    resetAIProcessing
  };
}
