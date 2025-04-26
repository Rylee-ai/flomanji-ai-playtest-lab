
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Wand, AlertCircle, Loader2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { CardFormValues } from "@/types/forms/card-form";
import { toast } from "sonner";
import { createChatCompletion } from "@/lib/openrouterChat";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface AICardAssistantProps {
  form: UseFormReturn<CardFormValues>;
}

export const AICardAssistant = ({ form }: AICardAssistantProps) => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKeyMissing, setApiKeyMissing] = useState(false);

  const buildSystemPrompt = (cardType: string) => {
    return `You are a specialized AI for the Flomanji card game. Your task is to generate creative and thematic content for a ${cardType} card based on the user's description.

Use the Florida setting and incorporate elements of chaos, weirdness, and adventure that fit the game's tone - a heightened 1987 Florida filled with supernatural threats.

Provide the following in your response as a JSON object with these exact fields:
- name: A catchy, thematic name for the card (10 words or less)
- description: A brief rules description that explains what the card does mechanically (25-50 words)
- flavor: Atmospheric flavor text that adds personality (15-30 words)
- imagePrompt: A detailed image description perfect for generating visual art for the card (50-80 words)
- keywords: An array of 1-3 relevant keywords for the card

Additionally, include card-specific fields based on the card type:`;
  };

  const getCardTypeSpecificPrompt = (cardType: string) => {
    switch(cardType) {
      case "treasure":
        return `
- value: A numeric value from 1-5
- consumable: Boolean (true/false) whether the card is used once or kept
- passiveEffect: A short description of any ongoing effect the treasure provides`;
      case "hazard":
        return `
- subType: One of "creature", "environmental", "social", "weird"
- onSuccess: What happens when players succeed against this hazard
- onFailure: What happens when players fail against this hazard
- difficultyClass: A number from 5-12 representing how hard it is to overcome`;
      case "chaos":
        return `
- globalEffect: A dramatic effect that impacts all players
- heatChange: A number from -2 to +3 indicating how this affects the game's Heat level`;
      case "flomanjified":
        return `
- chaosAction: A special ability the player can use when Flomanjified
- transformationEffect: What happens when someone becomes this role`;
      case "gear":
        return `
- category: One of "weapon", "tool", "clothing", "consumable"
- durability: How many uses this has (1-5, or "unlimited")
- specialAbility: A unique advantage this gear provides`;
      case "npc":
        return `
- role: The NPC's job or function in the game world
- attitude: Their default disposition toward players
- checkDC: Difficulty to convince them to help (5-12)
- specialOffer: What unique assistance they can provide`;
      case "region":
        return `
- biomeTags: An array of environment descriptors (e.g., ["swamp", "coastal"])
- encounterChance: The probability of finding hazards here (percentage)
- onEnter: An effect that triggers when players first arrive`;
      case "secret":
        return `
- alignment: "personal" (benefits just you) or "group" (benefits team)
- winCondition: The specific goal that must be achieved
- reward: What the player earns upon completion`;
      case "automa":
        return `
- action: The automated action this card makes the AI players take
- trigger: When this card comes into play
- intensity: How severely this affects gameplay (1-5)`;
      case "mission":
        return `
- hook: The enticing setup for this adventure
- startingHeat: Beginning Heat level (1-5)
- mapLayout: A brief description of the mission's environment
- playerCount: Recommended number of players (1-6)`;
      default:
        return "";
    }
  };

  const handleAIAssist = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt first");
      return;
    }

    setIsLoading(true);
    try {
      // Get the card type from the form
      const cardType = form.getValues("type");
      
      // Build the system prompt
      const basePrompt = buildSystemPrompt(cardType);
      const typeSpecificPrompt = getCardTypeSpecificPrompt(cardType);
      const systemPrompt = basePrompt + typeSpecificPrompt + "\n\nRespond ONLY with a valid JSON object that can be parsed with JSON.parse().";
      
      // Use our OpenRouter integration to get a completion
      const response = await createChatCompletion(
        systemPrompt,
        [{ role: "user", content: prompt }]
      );
      
      try {
        // Try to parse the JSON response
        const parsedResponse = JSON.parse(response);
        
        // Apply the basic fields that all cards have
        if (parsedResponse.name) form.setValue("name", parsedResponse.name);
        if (parsedResponse.description) form.setValue("description", parsedResponse.description);
        if (parsedResponse.flavor) form.setValue("flavor", parsedResponse.flavor);
        if (parsedResponse.imagePrompt) form.setValue("imagePrompt", parsedResponse.imagePrompt);
        if (parsedResponse.keywords && Array.isArray(parsedResponse.keywords)) {
          form.setValue("keywords", parsedResponse.keywords);
        }
        
        // Apply type-specific fields based on the card type
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
              form.setValue("difficultyClasses.brawn", Number(parsedResponse.difficultyClass));
              form.setValue("difficultyClasses.moxie", Number(parsedResponse.difficultyClass));
              form.setValue("difficultyClasses.charm", Number(parsedResponse.difficultyClass));
              form.setValue("difficultyClasses.weirdSense", Number(parsedResponse.difficultyClass));
            }
            break;
          case "chaos":
            if (parsedResponse.globalEffect) form.setValue("globalEffect", parsedResponse.globalEffect);
            if (parsedResponse.heatChange) form.setValue("heatChange", Number(parsedResponse.heatChange));
            break;
          case "flomanjified":
            if (parsedResponse.chaosAction) form.setValue("chaosAction", parsedResponse.chaosAction);
            if (parsedResponse.transformationEffect) form.setValue("transformationEffect", parsedResponse.transformationEffect);
            break;
          case "gear":
            if (parsedResponse.category) form.setValue("category", parsedResponse.category);
            if (parsedResponse.durability) {
              const durability = parsedResponse.durability === "unlimited" ? -1 : Number(parsedResponse.durability);
              form.setValue("durability", durability);
            }
            if (parsedResponse.specialAbility) form.setValue("specialAbility", parsedResponse.specialAbility);
            break;
          case "npc":
            if (parsedResponse.role) form.setValue("role", parsedResponse.role);
            if (parsedResponse.attitude) form.setValue("attitude", parsedResponse.attitude);
            if (parsedResponse.checkDC) form.setValue("checkDC", Number(parsedResponse.checkDC));
            if (parsedResponse.specialOffer) form.setValue("specialOffer", parsedResponse.specialOffer);
            break;
          case "region":
            if (parsedResponse.biomeTags && Array.isArray(parsedResponse.biomeTags)) {
              form.setValue("biomeTags", parsedResponse.biomeTags);
            }
            if (parsedResponse.encounterChance) form.setValue("encounterChance", Number(parsedResponse.encounterChance));
            if (parsedResponse.onEnter) form.setValue("onEnter", parsedResponse.onEnter);
            break;
          case "secret":
            if (parsedResponse.alignment) form.setValue("alignment", parsedResponse.alignment);
            if (parsedResponse.winCondition) form.setValue("winCondition", parsedResponse.winCondition);
            if (parsedResponse.reward) form.setValue("reward", parsedResponse.reward);
            break;
          case "automa":
            if (parsedResponse.action) form.setValue("action", parsedResponse.action);
            if (parsedResponse.trigger) form.setValue("trigger", parsedResponse.trigger);
            if (parsedResponse.intensity) form.setValue("intensity", Number(parsedResponse.intensity));
            break;
          case "mission":
            if (parsedResponse.hook) form.setValue("hook", parsedResponse.hook);
            if (parsedResponse.startingHeat) form.setValue("startingHeat", Number(parsedResponse.startingHeat));
            if (parsedResponse.mapLayout) form.setValue("mapLayout", parsedResponse.mapLayout);
            if (parsedResponse.playerCount) form.setValue("playerCount", Number(parsedResponse.playerCount));
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
      
      // Check if it's an API key issue
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

  const closeApiKeyDialog = () => {
    setApiKeyMissing(false);
  };

  return (
    <>
      <div className="space-y-4 p-4 border rounded-lg bg-secondary/10">
        <div className="flex items-center space-x-2">
          <Wand className="w-4 h-4" />
          <h4 className="text-sm font-medium">AI Card Assistant</h4>
        </div>
        <Textarea
          placeholder="Describe the card you want to create..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[100px]"
        />
        <Button 
          onClick={handleAIAssist}
          disabled={isLoading || !prompt.trim()}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Get AI Suggestions"
          )}
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          AI will generate content based on your card type and description.
        </p>
      </div>

      <AlertDialog open={apiKeyMissing} onOpenChange={setApiKeyMissing}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
              OpenRouter API Key Required
            </AlertDialogTitle>
            <AlertDialogDescription>
              <p className="mb-4">
                To use the AI Card Assistant, you need to set up your OpenRouter API key in the Settings page.
              </p>
              <p className="text-sm text-muted-foreground">
                An OpenRouter API key allows you to access various AI models for generating card content.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end">
            <Button onClick={closeApiKeyDialog}>
              Close
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
