
import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/components/ui/use-toast";

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
  
  // Conversation context tracking to avoid repetitive responses
  const [conversationContext, setConversationContext] = useState<Set<string>>(new Set());
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Helper function to generate appropriate AI responses based on user input
  const generateAIResponse = (userMessage: string): string => {
    // Track the type of query to avoid repetition
    const lowerMessage = userMessage.toLowerCase();
    
    // General game explanation request
    if (lowerMessage.includes("how to play") || lowerMessage.includes("explain") || 
        lowerMessage.includes("tell me about") || 
        (lowerMessage.includes("great") && lowerMessage.includes("do that"))) {
      
      // Check if we've already explained the basics
      if (conversationContext.has("basics_explained")) {
        // If requested to go deeper after initial explanation
        return `Let's dive deeper into Flomanji gameplay:

1. **Heat Management**: Heat represents the mounting danger in the game. It increases when you encounter hazards or spend too much time in dangerous regions. At Heat 9, all players gain +1 Weirdness each round, and at Heat 10, you lose the game!

2. **Character Abilities**: Each character has unique abilities tied to their role. For example, the Scientist can analyze weird phenomena, while the Athlete excels at physical challenges.

3. **Stat Checks**: When facing challenges, you'll roll 2d6 and add your relevant stat:
   - Brawn: Physical strength and endurance
   - Moxie: Speed, reflexes, and determination
   - Charm: Social influence and persuasion
   - Grit: Mental fortitude and resolve
   - Weird Sense: Perception of the supernatural

4. **Action Economy**: On your turn, you have 2 actions from:
   - Move: Travel to adjacent regions
   - Use Gear: Employ items from your inventory
   - Interact: Engage with NPCs or objects
   - Team-Up: Help another player
   - Rest: Recover 1 Health or clear 1 Weirdness
   - Mission: Progress toward objectives

Would you like to know about specific mechanics like combat, region exploration, or treasure cards?`;
      } else {
        // First time explaining the basics
        setConversationContext(prev => new Set([...prev, "basics_explained"]));
        return `Flomanji is a semi-cooperative survival horror card-and-dice adventure game set in a heightened version of 1987 Florida. Here's how to play:

1. **Core Objective**: Work together to complete mission objectives while managing rising Heat (danger level) and avoiding Weirdness (supernatural corruption).

2. **Characters**: Each player controls a character with unique stats (Brawn, Moxie, Charm, Grit, Weird Sense) and special abilities.

3. **Gameplay Loop**:
   - Take turns performing 2 actions per round
   - Draw and resolve cards when exploring or facing hazards
   - Roll dice (2d6 + relevant stat) for skill checks
   - Manage resources (Health, Luck, Weirdness, Gear)

4. **Key Mechanics**:
   - Heat increases with time and hazards (lose at Heat 10)
   - Weirdness builds from exposure to supernatural elements
   - Collecting gear and treasures improves your chances
   - Characters can use Luck points to reroll dice

Would you like me to explain any specific aspect in more detail?`;
      }
    }
    
    // Default response if no specific pattern is matched
    return `I understand you're asking about "${userMessage}". As your Game Master, I'll help guide you through Flomanji.

Based on your question, I'd recommend focusing on:
1. Understanding the four main response options to hazards: Fight (Brawn), Flee (Moxie), Negotiate (Charm), or Outsmart (Weird Sense).
2. Managing your Heat level - each region and encounter potentially raises it.
3. Using your character's unique abilities and starter gear effectively.

Is there a specific aspect of gameplay you'd like to explore further?`;
  };

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
      
      // Generate contextually appropriate response
      const responseContent = generateAIResponse(userMessage);
      
      const aiResponse = {
        role: 'ai' as const,
        content: responseContent
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error sending message",
        description: "There was a problem connecting to the Game Master AI",
        variant: "destructive",
      });
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
