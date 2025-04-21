import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, BookOpen, Dice1, ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { usePlayerChat } from "@/hooks/usePlayerChat";
import PlayerChatMessages from "./PlayerChatMessages";

const PlayerChat = () => {
  const { id } = useParams<{ id?: string }>();
  const { user } = useAuth();
  const { messages, isLoading, sendMessage } = usePlayerChat(id);
  const [input, setInput] = useState("");

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setInput("");
    try {
      await sendMessage(userMessage);
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Chat with Game Master</h1>
          <p className="text-muted-foreground">Ask questions, learn the rules, or play a simulated game</p>
        </div>

        <div className="flex gap-2">
          <Badge variant="outline" className="px-3 py-1">
            {id ? "Ongoing Conversation" : "New Conversation"}
          </Badge>
          <Button variant="outline" size="sm" title="Quick Rules Reference">
            <BookOpen className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Rules</span>
          </Button>
        </div>
      </div>

      <Card className="mb-4 border-2 bg-black/10 dark:bg-black/40">
        <CardContent className="p-0">
          <PlayerChatMessages messages={messages} isLoading={isLoading} />
        </CardContent>
      </Card>

      {/* Message input */}
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <Input
          placeholder="Ask the Game Master anything about Flomanji..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          className="flex-1"
        />
        <Button type="button" variant="outline" disabled={isLoading} title="Roll dice">
          <Dice1 className="h-5 w-5" />
        </Button>
        <Button type="button" variant="outline" disabled={isLoading} title="Share image">
          <ImageIcon className="h-5 w-5" />
        </Button>
        <Button type="submit" disabled={isLoading || !input.trim()}>
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
};

export default PlayerChat;
