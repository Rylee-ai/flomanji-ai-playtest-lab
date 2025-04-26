
import { useState } from "react";
import { CardType, GameCard } from "@/types/cards";
import { createChatCompletion } from "@/lib/openrouterChat";
import { toast } from "sonner";

interface UseAIGenerationProps {
  onCardCreated: (card: GameCard) => void;
  selectedCardTemplate: CardType;
}

export const useAIGeneration = ({ onCardCreated, selectedCardTemplate }: UseAIGenerationProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);
  const [generatedCard, setGeneratedCard] = useState<GameCard | null>(null);
  const [bulkResults, setBulkResults] = useState<GameCard[]>([]);

  const handleGenerateCard = async (prompt: string, systemPrompt: string) => {
    setIsGenerating(true);
    setErrors(null);
    
    try {
      const template = `Create a ${selectedCardTemplate} card in JSON format`;
      const messages = [
        { 
          role: "user", 
          content: `${template}\n\nSpecific requirements: ${prompt}` 
        }
      ];

      const result = await createChatCompletion(systemPrompt, messages);
      
      const jsonMatch = result.match(/```json\n([\s\S]*?)\n```/) || 
                       result.match(/{[\s\S]*}/) || 
                       result.match(/\[\s*{[\s\S]*}\s*\]/);
      
      if (!jsonMatch) {
        throw new Error("Failed to extract valid JSON from the AI response");
      }
      
      const jsonString = jsonMatch[1] || jsonMatch[0];
      let parsedCard = JSON.parse(jsonString);
      
      const cardData = Array.isArray(parsedCard) ? parsedCard[0] : parsedCard;
      
      if (!cardData.id) {
        cardData.id = `ai-generated-${Date.now().toString(36)}`;
      }
      
      setGeneratedCard(cardData);
      toast.success("Card generated successfully");
    } catch (error) {
      console.error("Error generating card:", error);
      setErrors(error instanceof Error ? error.message : "Failed to generate card");
      toast.error("Failed to generate card");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBulkGenerate = async (bulkPrompt: string, systemPrompt: string, bulkCount: number) => {
    setIsGenerating(true);
    setErrors(null);
    
    try {
      const template = `Create a ${selectedCardTemplate} card in JSON format`;
      const messages = [
        { 
          role: "user", 
          content: `Generate ${bulkCount} unique ${selectedCardTemplate} cards based on this template:\n${template}\n\nAdditional requirements for all cards: ${bulkPrompt}\n\nReturn an array of card objects in JSON format.` 
        }
      ];

      const result = await createChatCompletion(systemPrompt, messages);
      
      const jsonMatch = result.match(/```json\n([\s\S]*?)\n```/) || 
                       result.match(/\[\s*{[\s\S]*}\s*\]/) ||
                       result.match(/{[\s\S]*}/);
      
      if (!jsonMatch) {
        throw new Error("Failed to extract valid JSON from the AI response");
      }
      
      const jsonString = jsonMatch[1] || jsonMatch[0];
      let parsedCards = JSON.parse(jsonString);
      
      const cardsData = Array.isArray(parsedCards) ? parsedCards : [parsedCards];
      
      const cardsWithIds = cardsData.map((card, index) => ({
        ...card,
        id: card.id || `ai-bulk-${Date.now().toString(36)}-${index}`
      }));
      
      setBulkResults(cardsWithIds);
      toast.success(`Generated ${cardsWithIds.length} cards`);
    } catch (error) {
      console.error("Error generating bulk cards:", error);
      setErrors(error instanceof Error ? error.message : "Failed to generate cards");
      toast.error("Failed to generate bulk cards");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveCard = () => {
    if (!generatedCard) return;
    onCardCreated(generatedCard);
    toast.success("Card saved to collection");
    setGeneratedCard(null);
  };
  
  const handleSaveBulkCard = (card: GameCard) => {
    onCardCreated(card);
    toast.success(`Card "${card.name}" saved to collection`);
    setBulkResults(bulkResults.filter(c => c.id !== card.id));
  };
  
  const handleSaveAllBulkCards = () => {
    if (!bulkResults.length) return;
    bulkResults.forEach(onCardCreated);
    toast.success(`Saved ${bulkResults.length} cards to collection`);
    setBulkResults([]);
  };

  return {
    isGenerating,
    errors,
    generatedCard,
    bulkResults,
    handleGenerateCard,
    handleBulkGenerate,
    handleSaveCard,
    handleSaveBulkCard,
    handleSaveAllBulkCards,
    setBulkResults,
  };
};
