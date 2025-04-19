
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Key, CheckCircle2, Pencil, Settings2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Settings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [newApiKey, setNewApiKey] = useState("");
  const [selectedModel, setSelectedModel] = useState("anthropic/claude-3-opus");

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

      const { error } = await supabase.functions.invoke("update-openrouter-key", {
        body: { key: newApiKey }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "API key updated successfully"
      });
      setIsEditing(false);
      setNewApiKey("");
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
            OpenRouter API key is configured and ready to use.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isEditing ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>API key is securely stored in Supabase</span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="h-4 w-4 mr-2" />
                Edit Key
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Input
                type="password"
                value={newApiKey}
                onChange={(e) => setNewApiKey(e.target.value)}
                placeholder="Enter new OpenRouter API key"
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
        <CardContent>
          <Select value={selectedModel} onValueChange={handleModelChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="anthropic/claude-3-opus">Claude 3 Opus (Most Powerful)</SelectItem>
              <SelectItem value="anthropic/claude-3-sonnet">Claude 3 Sonnet (Balanced)</SelectItem>
              <SelectItem value="anthropic/claude-3-haiku">Claude 3 Haiku (Fastest)</SelectItem>
              <SelectItem value="meta-llama/llama-2-70b-chat">Llama 2 70B</SelectItem>
              <SelectItem value="google/gemini-pro">Gemini Pro</SelectItem>
            </SelectContent>
          </Select>
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
