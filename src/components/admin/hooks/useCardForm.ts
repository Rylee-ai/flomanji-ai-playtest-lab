
import { useForm } from "react-hook-form";
import { CardFormValues } from "../CardForm";
import { GameCard } from "@/types/cards";

export const useCardForm = (initialData?: GameCard) => {
  const form = useForm<CardFormValues>({
    defaultValues: initialData ? {
      name: initialData.name,
      type: initialData.type,
      keywords: initialData.keywords,
      icons: initialData.icons,
      rules: initialData.rules,
      flavor: initialData.flavor || "",
      // Type-specific fields are handled in the form conditionally
      ...getTypeSpecificData(initialData)
    } : {
      name: "",
      type: "treasure",
      keywords: [],
      icons: [],
      rules: [],
      flavor: ""
    }
  });

  return form;
};

const getTypeSpecificData = (card: GameCard): Partial<CardFormValues> => {
  switch (card.type) {
    case "treasure":
    case "artifact":
      return {
        value: card.value,
        consumable: card.consumable
      };
    case "hazard":
      return {
        subType: card.subType,
        difficultyClasses: card.difficultyClasses,
        bossHazard: card.bossHazard
      };
    // Add other card type specific data here
    default:
      return {};
  }
};
