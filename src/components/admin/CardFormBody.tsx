
import React from "react";
import { Form } from "@/components/ui/form";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BaseCardForm } from "./forms/BaseCardForm";
import { CardTypeFormSwitcher } from "./CardTypeFormSwitcher";
import { AICardAssistant } from "./forms/AICardAssistant";
import { UseFormReturn } from "react-hook-form";
import { CardType } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";

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
      <AICardAssistant form={form} />
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
