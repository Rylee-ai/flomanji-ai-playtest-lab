
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { CardType, GameCard } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { missionSubtypes } from "@/schemas/card-form-schema";

export const useCardFormInit = (
  form: UseFormReturn<CardFormValues>,
  initialData: GameCard | undefined,
  activeTab: string | undefined,
  isEditing: boolean
) => {
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
};

