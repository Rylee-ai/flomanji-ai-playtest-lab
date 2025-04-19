import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardType, GameCard } from "@/types/cards";
import { useCardForm } from "./hooks/useCardForm";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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

  const title = isEditing ? `Edit ${initialData?.name}` : "Create Card";
  const description = isEditing ? "Update the card's properties." : "Add a new card to the game.";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Card Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Card Type" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="flavor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Flavor Text</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Card Flavor" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Example conditional field based on card type */}
            {form.getValues("type") === "treasure" && (
              <>
                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Value</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Card Value"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="consumable"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel>Consumable</FormLabel>
                        <FormDescription>
                          Is this card consumed when used?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </>
            )}

            {form.getValues("type") === "hazard" && (
              <>
                <FormField
                  control={form.control}
                  name="subType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sub Type</FormLabel>
                      <FormControl>
                        <Input placeholder="Hazard Subtype" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bossHazard"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel>Boss Hazard</FormLabel>
                        <FormDescription>
                          Is this a boss level hazard?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </>
            )}

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
