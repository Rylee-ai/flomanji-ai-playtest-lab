
import React, { useEffect } from "react";
import { CardType, GameCard } from "@/types/cards";
import { useCardForm } from "./hooks/useCardForm";
import { z } from "zod";
import { CardFormDialog } from "./CardFormDialog";
import { CardFormBody } from "./CardFormBody";

// Define mission subtypes as a subset of CardType for form validation
export const missionSubtypes = [
  "exploration", "escape", "escort", "collection", "boss", "solo"
] as const;

export const cardFormSchema = z.object({
  // Base fields for all cards
  name: z.string().min(2, { message: "Card name must be at least 2 characters." }),
  type: z.enum([
    "treasure", "artifact", "hazard", "automa", "region", "npc", 
    "mission", "gear", "chaos", "flomanjified", "secret", "player-character",
    ...missionSubtypes
  ]),
  keywords: z.array(z.string()).optional(),
  icons: z.array(z.object({ 
    symbol: z.string(),
    meaning: z.string() 
  })).optional(),
  rules: z.array(z.string()).optional(),
  flavor: z.string().optional(),
  imagePrompt: z.string().optional(),

  // Treasure & Artifact specific fields
  value: z.number().optional(),
  consumable: z.boolean().optional(),
  passiveEffect: z.string().optional(),
  useEffect: z.string().optional(),

  // Hazard specific fields
  subType: z.enum(["environmental", "creature", "social", "weird"]).optional(),
  difficultyClasses: z.object({
    fight: z.number().optional(),
    flee: z.number().optional(),
    negotiate: z.number().optional(),
    outsmart: z.number().optional(),
    grit: z.number().optional(),
    moxie: z.number().optional(),
    charm: z.number().optional(),
    weirdSense: z.number().optional()
  }).optional(),
  onFailure: z.string().optional(),
  onSuccess: z.string().optional(),
  bossHazard: z.boolean().optional(),
  gearBonuses: z.array(z.object({
    itemName: z.string(),
    effect: z.enum(["autoSuccess", "bonus"]),
    bonusValue: z.number().optional()
  })).optional(),

  // Region specific fields
  biomeTags: z.array(z.string()).optional(),
  onEnter: z.string().optional(),
  action: z.string().optional(),
  rest: z.string().optional(),
  bonusZone: z.string().optional(),

  // NPC specific fields
  checkDC: z.number().optional(),
  actions: z.array(z.object({
    description: z.string(),
    cost: z.number(),
    effect: z.string()
  })).optional(),

  // Gear specific fields
  category: z.enum(["consumable", "tool", "weapon", "vehicle", "supply"]).optional(),
  uses: z.number().optional(),
  actionCost: z.number().optional(),
  passive: z.string().optional(),
  statBonus: z.object({
    stat: z.enum(["brawn", "moxie", "charm", "grit", "weirdSense"]).optional(),
    value: z.number().optional()
  }).optional(),

  // Chaos specific fields
  heatEffect: z.number().optional(),
  globalEffect: z.string().optional(),
  duration: z.enum(["immediate", "ongoing", "end-of-round"]).optional(),

  // Flomanjified specific fields
  originalRole: z.string().optional(),
  chaosAction: z.string().optional(),
  specialAbility: z.string().optional(),

  // Secret objective specific fields
  alignment: z.enum(["saboteur", "innocent"]).optional(),
  winCondition: z.string().optional(),

  // Automa specific fields
  movement: z.string().optional(),
  combatBonus: z.number().optional(),
  specialEffect: z.string().optional(),

  // Player Character specific fields
  role: z.string().optional(),
  stats: z.object({
    brawn: z.number().optional(),
    moxie: z.number().optional(),
    charm: z.number().optional(),
    grit: z.number().optional(),
    weirdSense: z.number().optional()
  }).optional(),
  ability: z.object({
    name: z.string().optional(),
    description: z.string().optional()
  }).optional(),
  health: z.number().optional(),
  weirdness: z.number().optional(),
  luck: z.number().optional(),
  starterGear: z.array(z.object({
    name: z.string(),
    type: z.string(),
    effect: z.string()
  })).optional(),
  
  // Mission specific fields
  hook: z.string().optional(),
  mapLayout: z.string().optional(),
  startingHeat: z.number().optional(),
  extractionRegion: z.string().optional(),
  specialRules: z.array(z.string()).optional(),
  objectives: z.array(z.object({
    description: z.string(),
    required: z.boolean(),
    reward: z.string().optional(),
    difficultyLevel: z.number().optional(),
    completionCheck: z.string().optional()
  })).optional(),
  challenges: z.array(z.object({
    description: z.string(),
    frequency: z.enum(["once", "recurring", "triggered"]),
    trigger: z.string().optional(),
    heatEffect: z.number().optional(),
    weirdnessEffect: z.number().optional()
  })).optional(),
  phases: z.array(z.object({
    name: z.string(),
    description: z.string(),
    objectives: z.array(z.object({
      description: z.string(),
      required: z.boolean(),
      reward: z.string().optional(),
      difficultyLevel: z.number().optional()
    })),
    timeLimit: z.number().optional()
  })).optional(),
  scaling: z.object({
    small: z.string(),
    large: z.string()
  }).optional(),
  recommendedPlayerCount: z.array(z.number()).optional(),
  estimatedDuration: z.number().optional(),
  difficultyRating: z.number().optional()
});

export type CardFormValues = z.infer<typeof cardFormSchema>;

// Define the CardFormProps interface
export interface CardFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CardFormValues) => void;
  initialData?: GameCard;
  activeTab: string;
}

export const CardForm = ({
  open,
  onClose,
  onSubmit,
  initialData,
  activeTab,
}: CardFormProps) => {
  const form = useCardForm(initialData);
  const isEditing = !!initialData;
  const type = form.watch("type");

  // Set the form type based on activeTab when creating a new card
  useEffect(() => {
    if (!isEditing && activeTab) {
      // Handle mission subtypes - map them to 'mission' for the form
      const formType = missionSubtypes.includes(activeTab as any) 
        ? "mission" 
        : activeTab as CardType;
      
      form.setValue("type", formType);
    }
  }, [activeTab, form, isEditing]);

  return (
    <CardFormDialog open={open} onClose={onClose} isEditing={isEditing} initialData={initialData}>
      <CardFormBody
        form={form}
        onSubmit={onSubmit}
        isEditing={isEditing}
        type={type}
      />
    </CardFormDialog>
  );
};
