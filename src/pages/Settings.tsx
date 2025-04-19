
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Key, CheckCircle2, Pencil } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Settings = () => {
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
