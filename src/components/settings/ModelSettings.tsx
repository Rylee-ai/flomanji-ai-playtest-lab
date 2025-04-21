import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings2, Loader2, AlertCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { OpenRouterModelSelector } from "./OpenRouterModelSelector";
import { getOpenRouterModel, setOpenRouterModel, getOpenRouterApiKey } from "@/lib/openrouterModel";
import { getOpenRouterApiKey as fetchApiKeyOnly } from "@/lib/openrouterApiKey";

export const ModelSettings = () => {
  const [selectedModel, setSelectedModel] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [apiKeyMissing, setApiKeyMissing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // First check if the API key exists
        const apiKey = await fetchApiKeyOnly().catch(e => {
          console.error("Error getting API key:", e);
          return "";
        });
        
        const hasApiKey = !!apiKey && apiKey.length > 0;
        setApiKeyMissing(!hasApiKey);
        
        if (hasApiKey) {
          // Only try to fetch the model if we have an API key
          const model = await getOpenRouterModel().catch(e => {
            console.error("Error getting model:", e);
            return "anthropic/claude-3-opus"; // Default fallback
          });
          setSelectedModel(model);
        }
      } catch (error) {
        console.error("Error fetching model settings:", error);
        setError(`Failed to load model settings: ${error.message || "Unknown error"}`);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load model settings"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleModelChange = async (model: string) => {
    try {
      if (!model) {
        toast({
          variant: "destructive",
          title: "Invalid Selection",
          description: "Please select a valid model"
        });
        return;
      }
      
      setIsLoading(true);
      console.log("Updating model to:", model);
      
      const success = await setOpenRouterModel(model);
      
      if (success) {
        setSelectedModel(model);
        toast({
          title: "Success",
          description: "LLM model updated successfully"
        });
      } else {
        throw new Error("Failed to update model in database");
      }
    } catch (error) {
      console.error("Error updating model:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to update model: ${error.message || "Unknown error"}`
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
        ) : error ? (
          <div className="text-sm text-red-500 flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            {error}
          </div>
        ) : apiKeyMissing ? (
          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 p-4 rounded-md">
            <div className="flex items-center text-amber-600 dark:text-amber-300 mb-2">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span className="font-medium">API Key Required</span>
            </div>
            <p className="text-sm text-amber-700 dark:text-amber-200">
              Please add your OpenRouter API key above before selecting a model.
            </p>
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
