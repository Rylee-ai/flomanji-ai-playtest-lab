
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { ExternalLink } from "lucide-react";

const Settings = () => {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    // Load saved API key if available
    const savedKey = localStorage.getItem("openrouter-api-key");
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleSaveApiKey = () => {
    try {
      localStorage.setItem("openrouter-api-key", apiKey);
      toast.success("API key saved successfully");
    } catch (error) {
      console.error("Error saving API key:", error);
      toast.error("Failed to save API key");
    }
  };

  const openSupabaseIntegration = () => {
    window.open("https://supabase.com/docs/guides/platform/oauth-apps", "_blank");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>OpenRouter API Key</CardTitle>
          <CardDescription>
            Set your OpenRouter API key to enable AI simulations. OpenRouter provides access to various AI models including Claude 3.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <Input 
              id="api-key"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="or-..."
            />
            <p className="text-sm text-muted-foreground">
              📋 Temporary Solution: API key is stored locally and never sent to our servers. 
              <br />
              🔒 For enhanced security, we recommend integrating with Supabase for secret management.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button onClick={handleSaveApiKey} disabled={!apiKey}>
            Save API Key
          </Button>
          <Button 
            variant="outline" 
            onClick={openSupabaseIntegration}
          >
            Learn about Supabase Integration
            <ExternalLink className="ml-2 h-4 w-4" />
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
