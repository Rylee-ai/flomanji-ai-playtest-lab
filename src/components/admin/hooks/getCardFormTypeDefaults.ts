import { GameCard } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";

export const getCardFormTypeDefaults = (initialData: GameCard): Partial<CardFormValues> => {
  // This function would extract type-specific fields based on the card type
  // For now, we're just returning the card data as-is
  return initialData;
};
