import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Key } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { getOpenRouterApiKey, setOpenRouterApiKey } from "@/lib/openrouterApiKey";

export const ApiKeySettings = () => {
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        setIsLoading(true);
        const key = await getOpenRouterApiKey();
        // Mask the key for security
        setApiKey(key ? key.slice(0, 5) + '***' + key.slice(-4) : "");
      } catch (error) {
        console.error("Error fetching API key:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load API key. Please try again."
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchApiKey();
  }, []);

  const handleSaveApiKey = async () => {
    // Allow both "or-" and "sk-or-v1-" prefixes
    const trimmedKey = apiKey.trim();
    if (trimmedKey && !(trimmedKey.startsWith("or-") || trimmedKey.startsWith("sk-or-v1-"))) {
      toast({
        variant: "destructive",
        title: "Invalid API Key",
        description: "OpenRouter API keys must start with 'or-' or 'sk-or-v1-'"
      });
      return;
    }

    try {
      setIsSaving(true);
      const success = await setOpenRouterApiKey(trimmedKey);
      
      if (success) {
        toast({
          title: "Success",
          description: "API key saved successfully"
        });
        // Mask the key after saving
        setApiKey(trimmedKey ? trimmedKey.slice(0, 5) + '***' + trimmedKey.slice(-4) : "");
      } else {
        throw new Error("Failed to save API key");
      }
    } catch (error) {
      console.error("Error saving API key:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save API key. Please check your connection and try again."
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Key className="h-5 w-5" />
          <CardTitle>OpenRouter API Key</CardTitle>
        </div>
        <CardDescription>
          Enter your OpenRouter API key to connect to LLM models.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              type="password"
              placeholder="Enter OpenRouter API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              disabled={isLoading || isSaving}
              className="flex-1"
            />
            <Button 
              onClick={handleSaveApiKey} 
              disabled={isLoading || isSaving}
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>

          <div className="space-y-2 text-sm">
            <p className="text-xs text-muted-foreground mb-1">
              You can get an OpenRouter API key at <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="underline">openrouter.ai/keys</a>
            </p>
            <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-md border border-blue-200 dark:border-blue-800">
              <p className="text-blue-700 dark:text-blue-300">OpenRouter keys start with <code className="font-mono bg-blue-100 dark:bg-blue-900 px-1 rounded">or-</code> or <code className="font-mono bg-blue-100 dark:bg-blue-900 px-1 rounded">sk-or-v1-</code> and connect to multiple AI models.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiKeySettings;
