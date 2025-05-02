
import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { showErrorToast } from "@/lib/toast";

const PlayerChat = () => {
  const { id } = useParams<{ id?: string }>();
  const { user } = useAuth();
  const [messages, setMessages] = useState<{ role: 'human' | 'ai', content: string }[]>([
    { 
      role: 'ai', 
      content: 'Welcome to the Flomanji Playtest! I\'m your Game Master. Feel free to ask me any questions about the game rules, your character options, or start a scenario. How can I help you today?' 
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    
    // Add user message to chat
    setMessages(prev => [...prev, { role: 'human', content: userMessage }]);
    
    setIsLoading(true);
    
    // Here you would connect to your actual AI backend
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock response - in production, this would be a real API call
      const aiResponse = {
        role: 'ai' as const,
        content: `I understand you're asking about "${userMessage}". As a Game Master, I'll help guide you through the Flomanji experience. We're still in development phase, but I'd be happy to explain the core concepts of heat management, objectives, and character abilities.`
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      showErrorToast("There was a problem connecting to the Game Master AI");
    } finally {
      setIsLoading(false);
    }
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
        
        <Badge variant="outline" className="px-3 py-1">
          {id ? "Ongoing Conversation" : "New Conversation"}
        </Badge>
      </div>
      
      <Card className="mb-4 border-2">
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
                      : 'bg-muted rounded-tl-none'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="mb-4">
                <div className="inline-block p-3 rounded-lg max-w-[80%] bg-muted rounded-tl-none">
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
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading || !input.trim()}>
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
};

export default PlayerChat;
