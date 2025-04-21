
import { useState, useEffect } from "react";
import { enrichPromptWithGameData } from "@/lib/enrichPromptWithGameData";
import { getExampleRules } from "@/lib/rules-loader";

/**
 * Hook to create and manage an enriched system prompt for the Game Master AI
 */
export const useEnrichedPrompt = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const buildEnrichedPrompt = async () => {
      try {
        setIsLoading(true);
        
        // Start with core rules
        const rulesContent = localStorage.getItem("flomanji-rules") || await getExampleRules();
        
        // Create base system prompt with game master persona
        const basePrompt = `You are the Game Master for Flomanji, a semi-cooperative survival horror card-and-dice adventure game set in a heightened version of 1987 Florida. 
        
Game Rules Overview:
${rulesContent.substring(0, 3000)}...

Your role is to help players understand the game, create an immersive atmosphere, and facilitate enjoyable gameplay experiences. Answer questions with the right balance of helpfulness and mystery, maintaining the game's horror-comedy tone.

IMPORTANT STYLE GUIDELINES:
- Use rich, evocative language to describe Florida's unique setting
- Balance serious horror elements with moments of absurd humor
- Include occasional references to 80s pop culture without being heavy-handed
- Describe gameplay mechanics accurately using proper Flomanji terminology
- Keep responses helpful but maintain the game's mysterious atmosphere

FORMAT YOUR RESPONSES WITH MARKDOWN for emphasis, section headers, and lists.`;

        // Enrich with game data, simulation results, etc.
        const enrichedPrompt = await enrichPromptWithGameData(basePrompt);
        setPrompt(enrichedPrompt);
      } catch (error) {
        console.error("Error building enriched prompt:", error);
        // Fallback to base prompt if something goes wrong
        setPrompt(`You are the Game Master for Flomanji, a horror-comedy tabletop game. Answer player questions helpfully and in character.`);
      } finally {
        setIsLoading(false);
      }
    };

    buildEnrichedPrompt();
  }, []);

  return { prompt, isLoading };
};
