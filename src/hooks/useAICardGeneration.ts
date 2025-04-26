import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { CardFormValues } from "@/types/forms/card-form";
import { toast } from "sonner";
import { createChatCompletion } from "@/lib/openrouterChat";
import { buildBaseSystemPrompt, getCardTypeSpecificPrompt } from "@/lib/ai-prompts/cardGenerationPrompts";

interface UseAICardGenerationProps {
  form: UseFormReturn<CardFormValues>;
}

export const useAICardGeneration = ({ form }: UseAICardGenerationProps) => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKeyMissing, setApiKeyMissing] = useState(false);

  const handleAIAssist = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt first");
      return;
    }

    setIsLoading(true);
    try {
      const cardType = form.getValues("type");
      const systemPrompt = buildBaseSystemPrompt(cardType) + 
                         getCardTypeSpecificPrompt(cardType) + 
                         "\n\nRespond ONLY with a valid JSON object that can be parsed with JSON.parse().";
      
      const response = await createChatCompletion(systemPrompt, [{ role: "user", content: prompt }]);
      
      try {
        const parsedResponse = JSON.parse(response);
        
        // Apply base fields
        if (parsedResponse.name) form.setValue("name", parsedResponse.name);
        if (parsedResponse.description) form.setValue("rules", [parsedResponse.description]);
        if (parsedResponse.flavor) form.setValue("flavor", parsedResponse.flavor);
        if (parsedResponse.imagePrompt) form.setValue("imagePrompt", parsedResponse.imagePrompt);
        if (parsedResponse.keywords && Array.isArray(parsedResponse.keywords)) {
          form.setValue("keywords", parsedResponse.keywords);
        }
        
        // Apply type-specific fields
        switch(cardType) {
          case "treasure":
          case "artifact":
            if (parsedResponse.value) form.setValue("value", Number(parsedResponse.value));
            if (parsedResponse.consumable !== undefined) form.setValue("consumable", Boolean(parsedResponse.consumable));
            if (parsedResponse.passiveEffect) form.setValue("passiveEffect", parsedResponse.passiveEffect);
            break;
          case "hazard":
            if (parsedResponse.subType) form.setValue("subType", parsedResponse.subType);
            if (parsedResponse.onSuccess) form.setValue("onSuccess", parsedResponse.onSuccess);
            if (parsedResponse.onFailure) form.setValue("onFailure", parsedResponse.onFailure);
            if (parsedResponse.difficultyClass) {
              form.setValue("difficultyClasses", {
                brawn: Number(parsedResponse.difficultyClass),
                moxie: Number(parsedResponse.difficultyClass),
                charm: Number(parsedResponse.difficultyClass),
                weirdSense: Number(parsedResponse.difficultyClass)
              });
            }
            break;
          case "chaos":
            if (parsedResponse.globalEffect) form.setValue("globalEffect", parsedResponse.globalEffect);
            if (parsedResponse.heatChange !== undefined) form.setValue("heatEffect", Number(parsedResponse.heatChange));
            break;
          case "flomanjified":
            if (parsedResponse.chaosAction) form.setValue("chaosAction", parsedResponse.chaosAction);
            if (parsedResponse.transformationEffect) form.setValue("specialAbility", parsedResponse.transformationEffect);
            break;
          case "gear":
            if (parsedResponse.category) form.setValue("category", parsedResponse.category);
            if (parsedResponse.durability) {
              const durability = parsedResponse.durability === "unlimited" ? -1 : Number(parsedResponse.durability);
              form.setValue("uses", durability);
            }
            if (parsedResponse.specialAbility) form.setValue("passive", parsedResponse.specialAbility);
            break;
          case "npc":
            if (parsedResponse.role) form.setValue("role", parsedResponse.role);
            if (parsedResponse.checkDC) form.setValue("checkDC", Number(parsedResponse.checkDC));
            // Handle NPC's actions array if needed
            // Instead of setting attitude directly, we could add it to a description or role field
            break;
          case "region":
            if (parsedResponse.biomeTags && Array.isArray(parsedResponse.biomeTags)) {
              form.setValue("biomeTags", parsedResponse.biomeTags);
            }
            if (parsedResponse.encounterChance) {
              // Store encounter chance as part of rules or another field if needed
            }
            if (parsedResponse.onEnter) form.setValue("onEnter", parsedResponse.onEnter);
            break;
          case "secret":
            if (parsedResponse.alignment) form.setValue("alignment", parsedResponse.alignment);
            if (parsedResponse.winCondition) form.setValue("winCondition", parsedResponse.winCondition);
            // For reward, we could add it to the winCondition or another field
            break;
          case "automa":
            if (parsedResponse.action) form.setValue("action", parsedResponse.action);
            if (parsedResponse.trigger) form.setValue("movement", parsedResponse.trigger);
            if (parsedResponse.intensity) form.setValue("combatBonus", Number(parsedResponse.intensity));
            break;
          case "mission":
            if (parsedResponse.hook) form.setValue("hook", parsedResponse.hook);
            if (parsedResponse.startingHeat) form.setValue("startingHeat", Number(parsedResponse.startingHeat));
            if (parsedResponse.mapLayout) form.setValue("mapLayout", parsedResponse.mapLayout);
            if (parsedResponse.playerCount) form.setValue("recommendedPlayerCount", String(parsedResponse.playerCount));
            break;
        }
        
        toast.success("AI suggestions applied!");
        setPrompt("");
      } catch (parseError) {
        console.error("Failed to parse AI response as JSON:", parseError);
        toast.error("Received invalid response format from AI. Please try again.");
      }
    } catch (error: any) {
      console.error("AI generation error:", error);
      
      if (error.message && (
          error.message.includes("API key") || 
          error.message.includes("not found") ||
          error.message.includes("authentication")
      )) {
        setApiKeyMissing(true);
      } else {
        toast.error(`AI generation failed: ${error.message || "Unknown error"}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    prompt,
    setPrompt,
    isLoading,
    apiKeyMissing,
    setApiKeyMissing,
    handleAIAssist
  };
};
