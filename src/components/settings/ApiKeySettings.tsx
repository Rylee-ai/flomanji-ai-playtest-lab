
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Key, CheckCircle2, Pencil, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { getOpenRouterApiKey, setOpenRouterApiKey, clearOpenRouterCache } from "@/lib/openrouter";

export const ApiKeySettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [newApiKey, setNewApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [apiKeyError, setApiKeyError] = useState<string | null>(null);
  const [fetchAttempts, setFetchAttempts] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        setIsLoading(true);
        setApiKeyError(null);
        
        console.log("Fetching API key, attempt:", fetchAttempts + 1);
        const apiKey = await getOpenRouterApiKey();
        console.log("API Key retrieved (masked):", apiKey ? "***" : "none");
        
        // Set state based on whether we got a key
        setHasApiKey(!!apiKey && apiKey.length > 0);
      } catch (error) {
        console.error("Error checking API key:", error);
        setApiKeyError("Failed to retrieve API key status");
      } finally {
        setIsLoading(false);
      }
    };

    fetchApiKey();
  }, [fetchAttempts]);

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
        // Trigger a refresh to verify the key was saved
        setFetchAttempts(prev => prev + 1);
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

  const handleRetryFetch = async () => {
    setIsRefreshing(true);
    try {
      // Clear the cache to force a fresh fetch
      clearOpenRouterCache();
      // Increment attempt counter to trigger useEffect
      setFetchAttempts(prev => prev + 1);
      
      toast({
        title: "Refreshing",
        description: "Attempting to reconnect to database"
      });
    } finally {
      setIsRefreshing(false);
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
          <div className="space-y-2">
            <div className="text-sm text-red-500 flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              {apiKeyError}. Please check your database connection.
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRetryFetch}
              className="flex items-center"
              disabled={isRefreshing}
            >
              {isRefreshing ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Retry Connection
            </Button>
          </div>
        ) : !isEditing ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm">
              {hasApiKey ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="text-green-600">API key is set and ready to use</span>
                </>
              ) : (
                <div className="flex items-center space-x-2 text-amber-500">
                  <AlertCircle className="h-4 w-4" />
                  <span>No API key set. Please add your OpenRouter API key.</span>
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              <Button 
                variant={hasApiKey ? "outline" : "default"}
                size="sm"
                onClick={() => setIsEditing(true)}
                className="flex items-center"
              >
                <Pencil className="h-4 w-4 mr-2" />
                {hasApiKey ? "Edit Key" : "Add Key"}
              </Button>
              {hasApiKey && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRetryFetch}
                  disabled={isRefreshing}
                >
                  {isRefreshing ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4 mr-2" />
                  )}
                  Refresh
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Input
              type="password"
              value={newApiKey}
              onChange={(e) => setNewApiKey(e.target.value)}
              placeholder="Enter your OpenRouter API key"
              className="font-mono"
            />
            <div className="flex space-x-2">
              <Button 
                onClick={handleUpdateApiKey} 
                disabled={!newApiKey || isLoading}
                className="flex items-center"
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
            <div className="space-y-2 text-sm">
              <p className="text-xs text-muted-foreground mb-1">
                You can get an OpenRouter API key at <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="underline">openrouter.ai/keys</a>
              </p>
              <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-md border border-blue-200 dark:border-blue-800">
                <p className="text-blue-700 dark:text-blue-300">OpenRouter keys start with <code className="font-mono bg-blue-100 dark:bg-blue-900 px-1 rounded">or-</code> and connect to multiple AI models.</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
