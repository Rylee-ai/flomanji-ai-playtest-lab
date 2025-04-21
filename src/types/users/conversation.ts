
export interface PlayerConversation {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: PlayerMessage[];
}

export interface PlayerMessage {
  id: string;
  conversationId: string;
  role: "human" | "ai";
  content: string;
  timestamp: string;
}
