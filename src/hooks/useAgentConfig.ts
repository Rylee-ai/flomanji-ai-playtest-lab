
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { AgentRole, AgentConfig } from "@/types";

// Initial default configurations for each agent role
const defaultConfigs: Record<AgentRole, AgentConfig> = {
  GM: {
    systemPrompt: `You are the Game Master for Flomanji, a semi-cooperative survival horror card-and-dice adventure game set in a heightened 1987 Florida.

Your role is to facilitate play, describe the environment, narrate outcomes, and enforce rules. 
Make the game challenging but fair, and create a cinematic B-movie horror-comedy atmosphere.`,
    temperature: 0.7,
    verbose: true,
  },
  Player: {
    systemPrompt: `You are a Player in Flomanji, controlling a survivor in a semi-cooperative adventure set in a heightened 1987 Florida filled with supernatural threats.

You have the following responsibilities:
1. Make decisions based on your character's stats and abilities
2. Use your special ability strategically
3. Manage your Health, Weirdness, and Luck effectively`,
    temperature: 0.7,
    personality: "balanced",
    skillLevel: "intermediate",
    meta: false,
    verbose: false, // Added verbose explicitly as false
  },
  Critic: {
    systemPrompt: `You are a Critic AI analyzing a playtest session of Flomanji, a semi-cooperative survival horror card-and-dice adventure game.

Analyze the gameplay session objectively and provide feedback on:

1. Rules Implementation
2. Game Balance
3. Player Experience
4. Design Improvement Opportunities`,
    temperature: 0.7,
    focus: "player-experience",
    detail: "standard",
    suggestions: true,
    verbose: false, // Added verbose explicitly as false
  }
};

export const useAgentConfig = () => {
  const [configs, setConfigs] = useState<Record<string, AgentConfig>>({
    gm: defaultConfigs.GM,
    player: defaultConfigs.Player,
    critic: defaultConfigs.Critic,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Load agent configurations from localStorage on mount
  useEffect(() => {
    const loadConfigs = () => {
      try {
        setIsLoading(true);
        
        const savedGM = localStorage.getItem("flomanji-agent-gm");
        const savedPlayer = localStorage.getItem("flomanji-agent-player");
        const savedCritic = localStorage.getItem("flomanji-agent-critic");
        
        setConfigs({
          gm: savedGM ? JSON.parse(savedGM) : defaultConfigs.GM,
          player: savedPlayer ? JSON.parse(savedPlayer) : defaultConfigs.Player,
          critic: savedCritic ? JSON.parse(savedCritic) : defaultConfigs.Critic,
        });
        
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load agent configurations:", error);
        toast.error("Failed to load agent configurations");
        setIsLoading(false);
      }
    };

    loadConfigs();
  }, []);

  // Save a specific agent configuration
  const saveAgentConfig = async (role: AgentRole, config: AgentConfig) => {
    try {
      setIsSaving(true);
      
      // Convert role to lowercase for storage key
      const storeRole = role.toLowerCase();
      
      // Save to localStorage for now
      // In a real implementation, you would save to your database
      localStorage.setItem(`flomanji-agent-${storeRole}`, JSON.stringify(config));
      
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
    testAgentResponse,
  };
};
