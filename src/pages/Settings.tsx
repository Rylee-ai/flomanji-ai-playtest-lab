
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Key, CheckCircle2, Pencil, Settings2, Search } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface OpenRouterModel {
  id: string;
  name: string;
  description?: string;
  context_length: number;
  pricing?: {
    prompt: string;
    completion: string;
  };
}

const Settings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [newApiKey, setNewApiKey] = useState("");
  const [selectedModel, setSelectedModel] = useState("anthropic/claude-3-opus");
  const [openRouterModels, setOpenRouterModels] = useState<OpenRouterModel[]>([]);
  const [filteredModels, setFilteredModels] = useState<OpenRouterModel[]>([]);
  const [modelSearchTerm, setModelSearchTerm] = useState("");
  const [isLoadingModels, setIsLoadingModels] = useState(false);

  useEffect(() => {
    const storedModel = localStorage.getItem("openrouter-model");
    if (storedModel) {
      setSelectedModel(storedModel);
    }
    
    // Load available models if we have an API key
    const apiKey = localStorage.getItem("openrouter-api-key");
    if (apiKey) {
      fetchOpenRouterModels(apiKey);
    }
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

  const fetchOpenRouterModels = async (apiKey: string) => {
    try {
      setIsLoadingModels(true);
      const response = await fetch('https://openrouter.ai/api/v1/models', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': window.location.href,
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch models: ${response.status}`);
      }
      
      const data = await response.json();
      // Sort models by id for easier browsing
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

  const handleUpdateApiKey = async () => {
    try {
      if (!newApiKey.startsWith('or-')) {
        toast({
          variant: "destructive",
          title: "Invalid API key format",
          description: "OpenRouter keys should start with 'or-'"
        });
        return;
      }

      // Store in localStorage for immediate use
      localStorage.setItem("openrouter-api-key", newApiKey);

      toast({
        title: "Success",
        description: "API key updated successfully"
      });
      setIsEditing(false);
      setNewApiKey("");
      
      // Fetch models with the new API key
      fetchOpenRouterModels(newApiKey);
    } catch (error) {
      console.error("Error updating API key:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update API key"
      });
    }
  };

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Key className="h-5 w-5" />
            <CardTitle>OpenRouter API Key</CardTitle>
          </div>
          <CardDescription>
            Configure your OpenRouter API key for AI simulations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isEditing ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                {localStorage.getItem("openrouter-api-key") ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>API key is set and ready to use</span>
                  </>
                ) : (
                  <span className="text-amber-500">No API key set. Please add your OpenRouter API key.</span>
                )}
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="h-4 w-4 mr-2" />
                {localStorage.getItem("openrouter-api-key") ? "Edit Key" : "Add Key"}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Input
                type="password"
                value={newApiKey}
                onChange={(e) => setNewApiKey(e.target.value)}
                placeholder="Enter your OpenRouter API key"
              />
              <div className="flex space-x-2">
                <Button onClick={handleUpdateApiKey} disabled={!newApiKey}>
                  Save Changes
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsEditing(false);
                    setNewApiKey("");
                  }}
                >
                  Cancel
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                You can get an OpenRouter API key at <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="underline">openrouter.ai/keys</a>
              </p>
            </div>
          )}
        </CardContent>
      </Card>

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
        <CardContent className="space-y-4">
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
              {localStorage.getItem("openrouter-api-key") 
                ? "No models found. Please check your API key."
                : "Please set your OpenRouter API key to view available models."}
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
            Current model: <span className="font-mono">{selectedModel}</span>
          </p>
          
          {selectedModel === "google/gemini-2.5-pro-exp-03-25:free" && (
            <div className="bg-amber-50 dark:bg-amber-950 p-3 rounded text-sm">
              <p>You've selected Google Gemini 2.5 Pro Experimental (free). This is a good choice for testing.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About Flomanji AI Playtest Lab</CardTitle>
          <CardDescription>
            Version information and resources
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">Version</h3>
            <p className="text-sm text-muted-foreground">1.0.0</p>
          </div>
          <div>
            <h3 className="font-medium">Powered By</h3>
            <p className="text-sm text-muted-foreground">OpenRouter, React, TailwindCSS, and Netlify</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
