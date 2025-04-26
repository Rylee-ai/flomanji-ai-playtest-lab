
import React, { useEffect } from "react";
import { GameCard } from "@/types/cards";
import { useCardForm } from "./hooks/useCardForm";
import { CardFormDialog } from "./CardFormDialog";
import { CardFormBody } from "./CardFormBody";
import { CardFormProps } from "@/types/forms/card-form";
import { missionSubtypes } from "@/schemas/card-form-schema";

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

  useEffect(() => {
    if (isEditing && initialData) {
      form.reset({
        name: initialData.name,
        type: initialData.type,
        flavor: initialData.flavor || "",
        imagePrompt: initialData.imagePrompt || "",
        keywords: initialData.keywords || [],
        icons: initialData.icons || [],
        rules: initialData.rules || [],
        ...(initialData as any)
      });
    } else if (!isEditing && activeTab) {
      const formType = missionSubtypes.includes(activeTab as any) 
        ? "mission" 
        : activeTab as CardType;
      form.reset({
        name: "",
        type: formType,
        flavor: "",
        imagePrompt: "",
        keywords: [],
        icons: [],
        rules: []
      });
    }
  }, [isEditing, initialData, activeTab, form]);

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
