
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { OpenRouterModelSelector } from "./OpenRouterModelSelector";

export const ModelSettings = () => {
  const [selectedModel, setSelectedModel] = useState("anthropic/claude-3-opus");

  useEffect(() => {
    const storedModel = localStorage.getItem("openrouter-model");
    if (storedModel) {
      setSelectedModel(storedModel);
    }
  }, []);

  const handleModelChange = async (model: string) => {
    try {
      localStorage.setItem("openrouter-model", model);
      setSelectedModel(model);
      toast({
        title: "Success",
        description: "LLM model updated successfully"
      });
    } catch (error) {
      console.error("Error updating model:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update model"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Settings2 className="h-5 w-5" />
          <CardTitle>LLM Model Selection</CardTitle>
        </div>
        <CardDescription>
          Choose which OpenRouter LLM model to use for AI interactions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <OpenRouterModelSelector 
          selectedModel={selectedModel} 
          onModelChange={handleModelChange} 
        />
      </CardContent>
    </Card>
  );
};
