
import { useForm } from "react-hook-form";
import { CardFormValues } from "../CardForm";
import { GameCard } from "@/types/cards";
import { TreasureCard } from "@/types/cards/treasure";
import { HazardCard } from "@/types/cards/hazard";

export const useCardForm = (initialData?: GameCard) => {
  const form = useForm<CardFormValues>({
    defaultValues: initialData ? {
      name: initialData.name,
      type: initialData.type === "artifact" ? "treasure" : initialData.type, // Handle artifact as treasure
      keywords: initialData.keywords || [],
      icons: initialData.icons || [],
      rules: initialData.rules || [],
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
    case "artifact": {
      const treasureCard = card as TreasureCard;
      return {
        value: treasureCard.value,
        consumable: treasureCard.consumable
      };
    }
    case "hazard": {
      const hazardCard = card as HazardCard;
      return {
        subType: hazardCard.subType,
        difficultyClasses: hazardCard.difficultyClasses,
        bossHazard: hazardCard.bossHazard
      };
    }
    // Add other card type specific data here
    default:
      return {};
  }
};
