
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { Key } from "lucide-react";

const Settings = () => {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const savedKey = localStorage.getItem("openrouter-api-key");
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleSaveApiKey = () => {
    try {
      if (!apiKey.startsWith('or-')) {
        toast.error("Invalid API key format. OpenRouter keys should start with 'or-'");
        return;
      }
      localStorage.setItem("openrouter-api-key", apiKey);
      toast.success("API key saved successfully");
    } catch (error) {
      console.error("Error saving API key:", error);
      toast.error("Failed to save API key");
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
            Set your OpenRouter API key to enable AI simulations. OpenRouter provides access to various AI models including Claude 3.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <div className="relative">
              <Input 
                id="api-key"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="or-..."
                className="pr-32"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                {apiKey && (
                  <span className="text-xs text-muted-foreground">
                    {apiKey.slice(0, 5)}...{apiKey.slice(-4)}
                  </span>
                )}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Your API key is stored locally and never sent to our servers. Get your API key from <a href="https://openrouter.ai/keys" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">OpenRouter</a>.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveApiKey} disabled={!apiKey}>
            Save API Key
          </Button>
        </CardFooter>
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
