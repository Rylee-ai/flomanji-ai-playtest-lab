
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Key, CheckCircle2, Pencil } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export const ApiKeySettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [newApiKey, setNewApiKey] = useState("");

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

      localStorage.setItem("openrouter-api-key", newApiKey);

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
  );
};
