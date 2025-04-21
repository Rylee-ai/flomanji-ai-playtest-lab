
/**
 * Represents a chat message in the player-GM conversation
 */
export interface PlayerMessage {
  id: string;
  conversationId: string;
  role: "human" | "ai";
  content: string;
  timestamp: string;
}
