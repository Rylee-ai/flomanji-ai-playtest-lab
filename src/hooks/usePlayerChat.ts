
import { useState, useEffect, useCallback } from "react";
import { createChatCompletion } from "@/lib/openrouterChat";
import { toast } from "sonner";
import { PlayerMessage } from "@/types";
import { useEnrichedPrompt } from "./useEnrichedPrompt";

/**
 * Custom hook for managing the Game Master chat functionality
 * Connects to OpenRouter AI with game resources as context
 */
export const usePlayerChat = (conversationId?: string) => {
  const [messages, setMessages] = useState<PlayerMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { prompt: systemPrompt, isLoading: isPromptLoading } = useEnrichedPrompt();

  // Initialize with welcome message
  useEffect(() => {
    // Set welcome message if no conversation ID (new chat)
    if (!conversationId) {
      setMessages([{
        id: "welcome",
        conversationId: "new",
        role: "ai",
        content: "Welcome to the Flomanji Playtest! I'm your Game Master. Feel free to ask me any questions about the game rules, your character options, or start a scenario. How can I help you today?",
        timestamp: new Date().toISOString()
      }]);
    } else {
      // TODO: Load existing conversation messages from storage if needed
      // This would be expanded in future to load from database
    }
  }, [conversationId]);

  // Send message to AI with game context
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading || isPromptLoading) return;
    
    // Create user message
    const userMessage: PlayerMessage = {
      id: `user-${Date.now()}`,
      conversationId: conversationId || "new",
      role: "human",
      content,
      timestamp: new Date().toISOString()
    };
    
    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setIsError(false);
    
    try {
      // Convert messages to format expected by OpenRouter
      const messageHistory = messages
        .filter(msg => msg.role === "human" || msg.role === "ai")
        .map(msg => ({
          role: msg.role === "human" ? "user" : "assistant",
          content: msg.content
        }))
        .slice(-6); // Keep conversation context manageable
      
      // Add the new message
      messageHistory.push({
        role: "user",
        content
      });
      
      // Get AI response from OpenRouter
      const responseContent = await createChatCompletion(systemPrompt, messageHistory);
      
      // Create AI message
      const aiMessage: PlayerMessage = {
        id: `ai-${Date.now()}`,
        conversationId: conversationId || "new",
        role: "ai",
        content: responseContent,
        timestamp: new Date().toISOString()
      };
      
      // Add AI response to chat
      setMessages(prev => [...prev, aiMessage]);
      
      // TODO: Save conversation to database if needed
      
    } catch (error) {
      console.error("Error sending message:", error);
      setIsError(true);
      toast.error("Error connecting to Game Master AI. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [messages, conversationId, isLoading, systemPrompt, isPromptLoading]);

  return {
    messages,
    isLoading: isLoading || isPromptLoading,
    isError,
    sendMessage,
    systemPrompt
  };
};
