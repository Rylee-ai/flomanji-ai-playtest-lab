
import React from "react";
import { Form } from "@/components/ui/form";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BaseCardForm } from "./forms/BaseCardForm";
import { CardTypeFormSwitcher } from "./CardTypeFormSwitcher";
import { UseFormReturn } from "react-hook-form";
import { CardType, GameCard } from "@/types/cards";
import { CardFormValues } from "./CardForm";

interface CardFormBodyProps {
  form: UseFormReturn<CardFormValues>;
  onSubmit: (data: CardFormValues) => void;
  isEditing: boolean;
  type: CardType | undefined;
}

export const CardFormBody = ({
  form,
  onSubmit,
  isEditing,
  type,
}: CardFormBodyProps) => (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <BaseCardForm form={form} />
      <CardTypeFormSwitcher type={type} form={form} />
      <DialogFooter>
        <Button type="submit">
          {isEditing ? "Update Card" : "Create Card"}
        </Button>
      </DialogFooter>
    </form>
  </Form>
);
