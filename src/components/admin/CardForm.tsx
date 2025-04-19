import React from "react";
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

interface CardFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: CardFormValues) => void;
  initialData?: GameCard;
  activeTab: CardType;
}

const cardFormSchema = z.object({
  name: z.string().min(2, {
    message: "Card name must be at least 2 characters.",
  }),
  type: z.enum(["treasure", "hazard", "automa", "region", "npc", "mission", "gear", "chaos", "flomanjified", "secret"]),
  keywords: z.array(z.string()),
  icons: z.array(z.object({ symbol: z.string(), meaning: z.string() })),
  rules: z.array(z.string()),
  flavor: z.string().optional(),
  value: z.number().optional(),
  consumable: z.boolean().optional(),
  subType: z.string().optional(),
  difficultyClasses: z.object({
    fight: z.number().optional(),
    flee: z.number().optional(),
  }).optional(),
  bossHazard: z.boolean().optional(),
});

export type CardFormValues = z.infer<typeof cardFormSchema>;

export const CardForm = ({ open, onClose, onSubmit, initialData, activeTab }: CardFormProps) => {
  const form = useCardForm(initialData);
  const isEditing = !!initialData;
  const type = form.watch("type");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
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
