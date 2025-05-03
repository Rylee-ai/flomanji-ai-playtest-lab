
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import AgentConfigForm from "@/components/agent/AgentConfigForm";
import AgentPreviewPanel from "@/components/agent/AgentPreviewPanel";
import AgentConversationPanel from "@/components/agent/AgentConversationPanel";
import AgentLibrary from "@/components/agent/AgentLibrary";
import { getOpenRouterApiKey } from "@/lib/openrouterApiKey";
import { getOpenRouterModel } from "@/lib/openrouterModel";
import { AgentRole } from "@/types";
import { RefreshCw } from "lucide-react";
import { useAgentConfig } from "@/hooks/useAgentConfig";

const AgentManager = () => {
  const { configs, isLoading, isSaving, saveAgentConfig, resetAgentConfig, testAgentResponse } = useAgentConfig();
  const [activeTab, setActiveTab] = useState("config");
  const [apiKeyStatus, setApiKeyStatus] = useState<"loading" | "missing" | "available">("loading");

  useEffect(() => {
    const checkApiKey = async () => {
      try {
        const apiKey = await getOpenRouterApiKey();
        const model = await getOpenRouterModel();
        if (apiKey) {
          setApiKeyStatus("available");
        } else {
          setApiKeyStatus("missing");
          toast.error("API key is missing. Please add it in Settings.");
        }
      } catch (error) {
        console.error("Error checking API key:", error);
        setApiKeyStatus("missing");
      }
    };

    checkApiKey();
  }, []);

  const handleSaveAllConfigs = async () => {
    try {
      // Save all agent configurations
      const promises = Object.entries(configs).map(([role, config]) => {
        return saveAgentConfig(role as AgentRole, config);
      });
      
      await Promise.all(promises);
      toast.success("All agent configurations saved successfully");
    } catch (error) {
      console.error("Error saving configs:", error);
      toast.error("Failed to save agent configurations");
    }
  };

  const handleResetConfig = async (role: AgentRole) => {
    const success = await resetAgentConfig(role);
    if (success) {
      toast.success(`Reset ${role} configuration to default`);
    }
  };

  const handleResetAllConfigs = async () => {
    try {
      const roles: AgentRole[] = ["GM", "Player 1", "Critic"] as AgentRole[];
      const promises = roles.map(role => resetAgentConfig(role));
      
      await Promise.all(promises);
      toast.success("All agent configurations reset to defaults");
    } catch (error) {
      console.error("Error resetting configs:", error);
      toast.error("Failed to reset agent configurations");
    }
  };

  const handleUpdateConfig = (role: string, newConfig: any) => {
    // This would need to be implemented in useAgentConfig hook
    console.log(`Updating ${role} config:`, newConfig);
    // For now, we'll just log the changes
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">AI Agent Manager</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleResetAllConfigs} 
            disabled={isSaving || isLoading}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset Defaults
          </Button>
          <Button onClick={handleSaveAllConfigs} disabled={isSaving || isLoading}>
            {isSaving ? "Saving..." : "Save Configuration"}
          </Button>
        </div>
      </div>

      {apiKeyStatus === "missing" && (
        <Card className="bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
          <CardContent className="pt-6">
            <p className="text-amber-800 dark:text-amber-200">
              OpenRouter API key is missing. Please add it in the Settings page to use AI features.
            </p>
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="library">Agent Library</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="test">Test Conversation</TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="space-y-4">
          <AgentConfigForm 
            configs={configs} 
            onChange={handleUpdateConfig} 
            onSave={handleSaveAllConfigs}
            onReset={handleResetConfig}
            isLoading={isLoading || isSaving}
          />
        </TabsContent>

        <TabsContent value="library" className="space-y-4">
          <AgentLibrary />
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          <AgentPreviewPanel configs={configs} />
        </TabsContent>

        <TabsContent value="test" className="space-y-4">
          <AgentConversationPanel configs={configs} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgentManager;
