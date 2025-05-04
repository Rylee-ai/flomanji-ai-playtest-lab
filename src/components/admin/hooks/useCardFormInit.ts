
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
    // Only reset the form when we have valid data or conditions
    if (isEditing && initialData) {
      // For editing existing cards
      form.reset({
        name: initialData.name || "",
        type: initialData.type || "treasure",
        flavor: initialData.flavor || "",
        imagePrompt: initialData.imagePrompt || "",
        keywords: initialData.keywords || [],
        icons: initialData.icons || [],
        rules: initialData.rules || [],
        ...(initialData as any)
      });
    } else if (!isEditing && activeTab) {
      // For new cards
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
