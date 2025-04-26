
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Wand } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { CardFormValues } from "@/types/forms/card-form";
import { toast } from "sonner";

interface AICardAssistantProps {
  form: UseFormReturn<CardFormValues>;
}

export const AICardAssistant = ({ form }: AICardAssistantProps) => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAIAssist = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt first");
      return;
    }

    setIsLoading(true);
    try {
      // For now, we'll just simulate the AI response
      // In a future iteration, we'll integrate with an actual AI service
      setTimeout(() => {
        const cardType = form.getValues("type");
        const demoResponse = {
          name: "AI Generated Card",
          flavor: "This is an AI-generated flavor text based on your prompt.",
          imagePrompt: prompt,
        };
        
        form.setValue("name", demoResponse.name);
        form.setValue("flavor", demoResponse.flavor);
        form.setValue("imagePrompt", demoResponse.imagePrompt);
        
        toast.success("AI suggestions applied!");
        setPrompt("");
      }, 1000);
    } catch (error) {
      toast.error("Failed to get AI suggestions");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-secondary/10">
      <div className="flex items-center space-x-2">
        <Wand className="w-4 h-4" />
        <h4 className="text-sm font-medium">AI Card Assistant</h4>
      </div>
      <Textarea
        placeholder="Describe the card you want to create..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="min-h-[100px]"
      />
      <Button 
        onClick={handleAIAssist}
        disabled={isLoading || !prompt.trim()}
        className="w-full"
      >
        {isLoading ? "Generating..." : "Get AI Suggestions"}
      </Button>
    </div>
  );
};
