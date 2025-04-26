
import React from "react";
import { GameCard } from "@/types/cards";
import { useCardForm } from "./hooks/useCardForm";
import { CardFormDialog } from "./CardFormDialog";
import { CardFormBody } from "./CardFormBody";
import { CardFormProps } from "@/types/forms/card-form";
import { useCardFormInit } from "./hooks/useCardFormInit";

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

  useCardFormInit(form, initialData, activeTab, isEditing);

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

