
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings2, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { OpenRouterModelSelector } from "./OpenRouterModelSelector";
import { getOpenRouterModel, setOpenRouterModel } from "@/lib/openrouter";

export const ModelSettings = () => {
  const [selectedModel, setSelectedModel] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const model = await getOpenRouterModel();
        setSelectedModel(model);
      } catch (error) {
        console.error("Error fetching model:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchModel();
  }, []);

  const handleModelChange = async (model: string) => {
    try {
      setIsLoading(true);
      const success = await setOpenRouterModel(model);
      
      if (success) {
        setSelectedModel(model);
        toast({
          title: "Success",
          description: "LLM model updated successfully"
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update model in database"
        });
      }
    } catch (error) {
      console.error("Error updating model:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update model"
      });
    } finally {
      setIsLoading(false);
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
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm text-muted-foreground">Loading model settings...</span>
          </div>
        ) : (
          <OpenRouterModelSelector 
            selectedModel={selectedModel} 
            onModelChange={handleModelChange} 
          />
        )}
      </CardContent>
    </Card>
  );
};
