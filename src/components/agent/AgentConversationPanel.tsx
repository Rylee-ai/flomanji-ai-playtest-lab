
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Loader2 } from "lucide-react";
import { AgentRole } from '@/types';
import { toast } from "sonner";

const AgentConversationPanel = ({ configs }) => {
  const [selectedAgent, setSelectedAgent] = useState<AgentRole>("GM");
  const [userPrompt, setUserPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Fixed type issue: explicitly cast the value to AgentRole
  const handleAgentChange = (value: string) => {
    setSelectedAgent(value as AgentRole);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userPrompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }
    
    try {
      setIsLoading(true);
      // This is a placeholder for the actual API call to get the agent response
      // In a real implementation, you would call the OpenAI API with the system prompt
      // For now, we'll simulate a delay and use hardcoded responses
      
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let simulatedResponse = "";
      
      if (selectedAgent === "GM") {
        simulatedResponse = `[Game Master Response]\nThe humid Florida air clings to your skin as you approach the abandoned gas station. The neon sign flickers erratically, casting an eerie glow across the cracked pavement. What's your next move?`;
      } else if (selectedAgent === "Player 1") {
        simulatedResponse = `[Player Response]\nI'll cautiously approach the gas station entrance, keeping my flashlight low. Before entering, I'll check the windows for any movement inside and listen for unusual sounds. I'm conserving my luck points in case we encounter something dangerous.`;
      } else if (selectedAgent === "Critic") {
        simulatedResponse = `[Critic Analysis]\nThe scenario presents an appropriate level of tension while maintaining the Florida setting atmosphere. The GM has effectively established the scene with sensory details. Consider adding more explicit decision points to guide less experienced players.`;
      }
      
      setResponse(simulatedResponse);
      setUserPrompt("");
    } catch (error) {
      console.error("Error generating response:", error);
      toast.error("Failed to generate response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="flex flex-col h-[600px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Test Conversation</CardTitle>
            <CardDescription>
              Try out conversations with your configured agents
            </CardDescription>
          </div>
          <Select value={selectedAgent} onValueChange={handleAgentChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select agent" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GM">Game Master</SelectItem>
              <SelectItem value="Player 1">Player</SelectItem>
              <SelectItem value="Critic">Critic</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <div className="flex-grow mb-4 overflow-y-auto rounded-md bg-secondary/50 p-4">
          {response ? (
            <div className="whitespace-pre-wrap font-mono">{response}</div>
          ) : (
            <div className="text-muted-foreground text-center h-full flex items-center justify-center">
              Enter a prompt below to test the {selectedAgent} agent
            </div>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder={`Enter a prompt for the ${selectedAgent}...`}
            className="min-h-[60px] flex-grow"
          />
          <Button type="submit" disabled={isLoading || !userPrompt.trim()}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AgentConversationPanel;
