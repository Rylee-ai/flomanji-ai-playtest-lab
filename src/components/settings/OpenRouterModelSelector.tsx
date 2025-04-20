
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { fetchOpenRouterModels } from "@/lib/openrouter";

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

  useEffect(() => {
    const loadModels = async () => {
      try {
        setIsLoadingModels(true);
        const data = await fetchOpenRouterModels();
        const sortedModels = data.data.sort((a: OpenRouterModel, b: OpenRouterModel) => 
          a.id.localeCompare(b.id)
        );
        
        setOpenRouterModels(sortedModels);
        setFilteredModels(sortedModels);
        setIsLoadingModels(false);
      } catch (error) {
        console.error("Error fetching OpenRouter models:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch OpenRouter models"
        });
        setIsLoadingModels(false);
      }
    };

    loadModels();
  }, []);

  useEffect(() => {
    if (modelSearchTerm) {
      const filtered = openRouterModels.filter(model => 
        model.id.toLowerCase().includes(modelSearchTerm.toLowerCase()) || 
        model.name.toLowerCase().includes(modelSearchTerm.toLowerCase())
      );
      setFilteredModels(filtered);
    } else {
      setFilteredModels(openRouterModels);
    }
  }, [modelSearchTerm, openRouterModels]);

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
        <div className="py-4 text-center text-muted-foreground">Loading available models...</div>
      ) : openRouterModels.length === 0 ? (
        <div className="py-4 text-center text-muted-foreground">
          No models found. Please check your configuration.
        </div>
      ) : (
        <Select value={selectedModel} onValueChange={onModelChange}>
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
        Current model: <span className="font-mono">{selectedModel}</span>
      </p>
      
      {selectedModel === "google/gemini-2.5-pro-exp-03-25:free" && (
        <div className="bg-amber-50 dark:bg-amber-950 p-3 rounded text-sm">
          <p>You've selected Google Gemini 2.5 Pro Experimental (free). This is a good choice for testing.</p>
        </div>
      )}
    </div>
  );
};
