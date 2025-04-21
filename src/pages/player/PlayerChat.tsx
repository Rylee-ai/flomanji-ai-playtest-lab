
import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, BookOpen, Dice1, ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { usePlayerChat } from "@/hooks/usePlayerChat";
import { parseMarkdown } from "@/lib/utils";

const PlayerChat = () => {
  const { id } = useParams<{ id?: string }>();
  const { user } = useAuth();
  const { messages, isLoading, sendMessage } = usePlayerChat(id);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setInput("");
    
    // Send message to AI
    await sendMessage(userMessage);
  };

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Chat with Game Master</h1>
          <p className="text-muted-foreground">
            Ask questions, learn the rules, or play a simulated game
          </p>
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
          {/* Messages container */}
          <div className="h-[60vh] overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`mb-4 ${message.role === 'human' ? 'text-right' : ''}`}
              >
                <div 
                  className={`inline-block p-3 rounded-lg max-w-[80%] ${
                    message.role === 'human' 
                      ? 'bg-primary text-primary-foreground rounded-tr-none' 
                      : 'bg-muted rounded-tl-none dark:bg-slate-800'
                  }`}
                >
                  {message.role === 'ai' ? (
                    <div 
                      className="prose prose-sm dark:prose-invert max-w-none" 
                      dangerouslySetInnerHTML={{ __html: parseMarkdown(message.content) }}
                    />
                  ) : (
                    message.content
                  )}
                </div>
                <div className="text-xs text-muted-foreground mt-1 px-2">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="mb-4">
                <div className="inline-block p-3 rounded-lg max-w-[80%] bg-muted rounded-tl-none dark:bg-slate-800">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
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

