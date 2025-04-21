import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { fetchOpenRouterModels } from "@/lib/openrouterModels";

export interface OpenRouterModel {
  id: string;
  name: string;
  description?: string;
  context_length: number;
  pricing?: {
    prompt: string;
    completion: string;
  };
}

interface OpenRouterModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

export const OpenRouterModelSelector: React.FC<OpenRouterModelSelectorProps> = ({ 
  selectedModel, 
  onModelChange 
}) => {
  const [openRouterModels, setOpenRouterModels] = useState<OpenRouterModel[]>([]);
  const [filteredModels, setFilteredModels] = useState<OpenRouterModel[]>([]);
  const [modelSearchTerm, setModelSearchTerm] = useState("");
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        setIsLoadingModels(true);
        setFetchError(null);
        
        const data = await fetchOpenRouterModels().catch(error => {
          console.error("Error in fetchOpenRouterModels:", error);
          throw error;
        });
        
        if (!data || !Array.isArray(data.data)) {
          console.error("Invalid data format from OpenRouter API:", data);
          throw new Error("Received invalid data format from OpenRouter API");
        }
        
        const sortedModels = [...data.data].sort((a: OpenRouterModel, b: OpenRouterModel) => 
          a.id.localeCompare(b.id)
        );
        
        setOpenRouterModels(sortedModels);
        setFilteredModels(sortedModels);
      } catch (error) {
        console.error("Error fetching OpenRouter models:", error);
        setFetchError(`Failed to fetch models: ${error.message || "Unknown error"}`);
        
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch OpenRouter models. Please check your API key and try again."
        });
      } finally {
        setIsLoadingModels(false);
      }
    };

    loadModels();
  }, []);

  useEffect(() => {
    if (modelSearchTerm && openRouterModels.length > 0) {
      const filtered = openRouterModels.filter(model => 
        model.id.toLowerCase().includes(modelSearchTerm.toLowerCase()) || 
        model.name.toLowerCase().includes(modelSearchTerm.toLowerCase())
      );
      setFilteredModels(filtered);
    } else {
      setFilteredModels(openRouterModels);
    }
  }, [modelSearchTerm, openRouterModels]);

  const handleModelChange = (value: string) => {
    try {
      console.log("Model selected:", value);
      onModelChange(value);
    } catch (error) {
      console.error("Error changing model:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update model selection. Please try again."
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <Input
          type="search"
          className="pl-10"
          placeholder="Search available models..."
          value={modelSearchTerm}
          onChange={(e) => setModelSearchTerm(e.target.value)}
          disabled={isLoadingModels || openRouterModels.length === 0}
        />
      </div>

      {isLoadingModels ? (
        <div className="py-4 text-center text-muted-foreground flex items-center justify-center">
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          <span>Loading available models...</span>
        </div>
      ) : fetchError ? (
        <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 p-4 rounded-md">
          <div className="flex items-center text-red-600 dark:text-red-400 mb-2">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span className="font-medium">Error loading models</span>
          </div>
          <p className="text-sm text-red-700 dark:text-red-300">{fetchError}</p>
          <p className="text-sm mt-2">Please check your API key in the settings above.</p>
        </div>
      ) : openRouterModels.length === 0 ? (
        <div className="py-4 text-center text-muted-foreground">
          No models found. Please check your API key configuration.
        </div>
      ) : (
        <Select value={selectedModel} onValueChange={handleModelChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a model" />
          </SelectTrigger>
          <SelectContent className="max-h-80">
            {filteredModels.length === 0 ? (
              <div className="py-2 text-center text-sm text-muted-foreground">No models match your search</div>
            ) : (
              filteredModels.map(model => (
                <SelectItem key={model.id} value={model.id}>
                  <div className="flex flex-col">
                    <span>{model.name}</span>
                    <span className="text-xs text-muted-foreground">
                      Context: {model.context_length} tokens
                    </span>
                  </div>
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      )}
      
      <p className="text-xs text-muted-foreground">
        Current model: <span className="font-mono">{selectedModel || "None selected"}</span>
      </p>
    </div>
  );
};
