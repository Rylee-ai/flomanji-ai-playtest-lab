
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { AgentRole, AgentConfig } from "@/types";
import { getGMSystemPrompt, getPlayerSystemPrompt, getCriticSystemPrompt } from "@/lib/prompts";
import { getExampleRules } from "@/lib/rules-loader";

// Initial default configurations for each agent role
export const getDefaultConfigs = async (): Promise<Record<AgentRole, AgentConfig>> => {
  // Get example rules to use in default prompts
  const exampleRules = await getExampleRules();
  
  return {
    GM: {
      systemPrompt: getGMSystemPrompt(exampleRules, "Default scenario"),
      temperature: 0.7,
      verbose: true,
    },
    Player: {
      systemPrompt: getPlayerSystemPrompt(exampleRules, 0),
      temperature: 0.7,
      personality: "balanced",
      skillLevel: "intermediate",
      meta: false,
      verbose: false,
    },
    Critic: {
      systemPrompt: getCriticSystemPrompt(exampleRules),
      temperature: 0.7,
      focus: "player-experience",
      detail: "standard",
      suggestions: true,
      verbose: false,
    }
  };
};

// Storage keys for persistence
const CONFIG_STORAGE_KEYS = {
  GM: "flomanji-agent-gm",
  Player: "flomanji-agent-player",
  Critic: "flomanji-agent-critic"
};

export const useAgentConfig = () => {
  const [configs, setConfigs] = useState<Record<string, AgentConfig>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Load agent configurations on mount
  useEffect(() => {
    const loadConfigs = async () => {
      try {
        setIsLoading(true);
        
        // Get default configurations first
        const defaultConfigs = await getDefaultConfigs();
        
        // Use localStorage as temporary persistence but in a real app
        // this would be replaced with a database call
        const loadedConfigs: Record<string, AgentConfig> = {};
        
        for (const [role, defaultConfig] of Object.entries(defaultConfigs)) {
          const storageKey = CONFIG_STORAGE_KEYS[role as AgentRole];
          const savedConfig = localStorage.getItem(storageKey);
          
          loadedConfigs[role.toLowerCase()] = savedConfig 
            ? JSON.parse(savedConfig) 
            : defaultConfig;
        }
        
        setConfigs(loadedConfigs);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load agent configurations:", error);
        toast.error("Failed to load agent configurations");
        setIsLoading(false);
      }
    };

    loadConfigs();
  }, []);

  // Resets a configuration to the default
  const resetAgentConfig = async (role: AgentRole) => {
    try {
      setIsSaving(true);
      
      // Get fresh default configs
      const defaultConfigs = await getDefaultConfigs();
      const defaultConfig = defaultConfigs[role];
      
      // Save to storage
      const storeRole = role.toLowerCase();
      localStorage.setItem(CONFIG_STORAGE_KEYS[role], JSON.stringify(defaultConfig));
      
      // Update state
      setConfigs(prevConfigs => ({
        ...prevConfigs,
        [storeRole]: defaultConfig,
      }));
      
      setIsSaving(false);
      toast.success(`Reset ${role} configuration to default`);
      return true;
    } catch (error) {
      console.error(`Failed to reset ${role} configuration:`, error);
      toast.error(`Failed to reset ${role} configuration`);
      setIsSaving(false);
      return false;
    }
  };

  // Save a specific agent configuration
  const saveAgentConfig = async (role: AgentRole, config: AgentConfig) => {
    try {
      setIsSaving(true);
      
      // Convert role to lowercase for storage key
      const storeRole = role.toLowerCase();
      
      // Save to storage
      localStorage.setItem(CONFIG_STORAGE_KEYS[role], JSON.stringify(config));
      
      // Update state with new config
      setConfigs(prevConfigs => ({
        ...prevConfigs,
        [storeRole]: config,
      }));
      
      setIsSaving(false);
      return true;
    } catch (error) {
      console.error(`Failed to save ${role} configuration:`, error);
      setIsSaving(false);
      return false;
    }
  };

  // Test an agent's response
  const testAgentResponse = async (role: AgentRole, prompt: string) => {
    try {
      // This would be replaced with an actual API call to test the agent
      // For now, we're just simulating a response after a delay
      return new Promise<string>(resolve => {
        setTimeout(() => {
          const responseTemplates = {
            GM: `[Game Master Response]\nThe humid Florida air clings to your skin as you approach the abandoned gas station. The neon sign flickers erratically, casting an eerie glow across the cracked pavement. What's your next move?`,
            Player: `[Player Response]\nI'll cautiously approach the gas station entrance, keeping my flashlight low. Before entering, I'll check the windows for any movement inside and listen for unusual sounds. I'm conserving my luck points in case we encounter something dangerous.`,
            Critic: `[Critic Analysis]\nThe scenario presents an appropriate level of tension while maintaining the Florida setting atmosphere. The GM has effectively established the scene with sensory details. Consider adding more explicit decision points to guide less experienced players.`
          };
          
          resolve(responseTemplates[role] || "No response template available for this agent type.");
        }, 1500);
      });
    } catch (error) {
      console.error(`Failed to test ${role} response:`, error);
      throw new Error(`Failed to test ${role} response: ${error.message}`);
    }
  };

  return {
    configs,
    isLoading,
    isSaving,
    saveAgentConfig,
    resetAgentConfig,
    testAgentResponse,
  };
};
