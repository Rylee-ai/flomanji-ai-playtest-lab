
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { initializeOpenAI } from "@/lib/api";
import { toast } from "@/components/ui/sonner";

const Settings = () => {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    // Load saved API key if available
    const savedKey = localStorage.getItem("openai-api-key");
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleSaveApiKey = () => {
    try {
      const success = initializeOpenAI(apiKey);
      if (success) {
        toast.success("API key saved successfully");
      } else {
        toast.error("Failed to initialize OpenAI client");
      }
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
          <CardTitle>OpenAI API Key</CardTitle>
          <CardDescription>
            Set your OpenAI API key to enable AI simulations
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
              placeholder="sk-..."
            />
            <p className="text-sm text-muted-foreground">
              Your API key is stored locally and never sent to our servers.
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
            <p className="text-sm text-muted-foreground">OpenAI, React, TailwindCSS, and Netlify</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
