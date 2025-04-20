import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CardType, GameCard } from "@/types/cards";
import { useCardForm } from "./hooks/useCardForm";
import { z } from "zod";
import { BaseCardForm } from "./forms/BaseCardForm";
import { TreasureCardForm } from "./forms/TreasureCardForm";
import { HazardCardForm } from "./forms/HazardCardForm";
import { RegionCardForm } from "./forms/RegionCardForm";
import { NPCCardForm } from "./forms/NPCCardForm";
import { GearCardForm } from "./forms/GearCardForm";
import { ChaosCardForm } from "./forms/ChaosCardForm";
import { FlomanjifiedCardForm } from "./forms/FlomanjifiedCardForm";
import { SecretCardForm } from "./forms/SecretCardForm";
import { AutomaCardForm } from "./forms/AutomaCardForm";
import { PlayerCharacterForm } from "./forms/PlayerCharacterForm";

export const cardFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, { message: "Card name must be at least 2 characters." }),
  type: z.enum(["treasure", "artifact", "hazard", "automa", "region", "npc", "mission", "gear", "chaos", "flomanjified", "secret", "player-character"]),
  keywords: z.array(z.string()).optional(),
  icons: z.array(z.object({ 
    symbol: z.string(),
    meaning: z.string() 
  })).optional(),
  rules: z.array(z.string()).optional(),
  flavor: z.string().optional(),
  imagePrompt: z.string().optional(),
  markdownContent: z.string().optional(),

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
});

export type CardFormValues = z.infer<typeof cardFormSchema>;

export interface CardFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CardFormValues) => void;
  initialData?: GameCard;
  activeTab: string;
}

export const CardForm = ({ open, onClose, onSubmit, initialData, activeTab }: CardFormProps) => {
  const form = useCardForm(initialData);
  const isEditing = !!initialData;
  const type = form.watch("type");
  
  useEffect(() => {
    if (!isEditing && activeTab) {
      form.setValue("type", activeTab as CardType);
    }
  }, [activeTab, form, isEditing]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? `Edit ${initialData?.name}` : "Create Card"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Update the card's properties." : "Add a new card to the game."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <BaseCardForm form={form} />
            
            {type === "treasure" && <TreasureCardForm form={form} />}
            {type === "hazard" && <HazardCardForm form={form} />}
            {type === "region" && <RegionCardForm form={form} />}
            {type === "npc" && <NPCCardForm form={form} />}
            {type === "gear" && <GearCardForm form={form} />}
            {type === "chaos" && <ChaosCardForm form={form} />}
            {type === "flomanjified" && <FlomanjifiedCardForm form={form} />}
            {type === "secret" && <SecretCardForm form={form} />}
            {type === "automa" && <AutomaCardForm form={form} />}
            {type === "player-character" && <PlayerCharacterForm form={form} />}

            <DialogFooter>
              <Button type="submit">
                {isEditing ? "Update Card" : "Create Card"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
