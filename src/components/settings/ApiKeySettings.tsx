
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Key, CheckCircle2, Pencil, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { getOpenRouterApiKey, setOpenRouterApiKey } from "@/lib/openrouter";

export const ApiKeySettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [newApiKey, setNewApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [apiKeyError, setApiKeyError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        setIsLoading(true);
        setApiKeyError(null);
        
        const apiKey = await getOpenRouterApiKey();
        console.log("API Key retrieved (masked):", apiKey ? "***" : "none");
        setHasApiKey(!!apiKey);
      } catch (error) {
        console.error("Error checking API key:", error);
        setApiKeyError("Failed to retrieve API key status");
      } finally {
        setIsLoading(false);
      }
    };

    fetchApiKey();
  }, []);

  const handleUpdateApiKey = async () => {
    try {
      if (!newApiKey.trim()) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "API key cannot be empty"
        });
        return;
      }

      if (!newApiKey.startsWith('or-')) {
        toast({
          variant: "destructive",
          title: "Invalid API key format",
          description: "OpenRouter keys should start with 'or-'"
        });
        return;
      }

      setIsLoading(true);
      setApiKeyError(null);
      
      const success = await setOpenRouterApiKey(newApiKey);

      if (success) {
        toast({
          title: "Success",
          description: "API key updated successfully"
        });
        setIsEditing(false);
        setNewApiKey("");
        setHasApiKey(true);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update API key in database"
        });
      }
    } catch (error) {
      console.error("Error updating API key:", error);
      setApiKeyError("Failed to update API key");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update API key"
      });
    } finally {
      setIsLoading(false);
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
          Configure your OpenRouter API key for AI simulations.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm text-muted-foreground">Loading API key status...</span>
          </div>
        ) : apiKeyError ? (
          <div className="text-sm text-red-500">
            {apiKeyError}. Please try refreshing the page or check your database connection.
          </div>
        ) : !isEditing ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              {hasApiKey ? (
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
              {hasApiKey ? "Edit Key" : "Add Key"}
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
              <Button 
                onClick={handleUpdateApiKey} 
                disabled={!newApiKey || isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsEditing(false);
                  setNewApiKey("");
                }}
                disabled={isLoading}
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
  );
};
