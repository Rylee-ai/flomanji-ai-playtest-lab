
import { useForm } from "react-hook-form";
import { CardFormValues } from "../CardForm";
import { GameCard, CardType } from "@/types/cards";
import { getCardFormTypeDefaults } from "./getCardFormTypeDefaults";

export const useCardForm = (initialData?: GameCard) => {
  console.log("Initial form data:", initialData); // Kept for debugging
 
  const form = useForm<CardFormValues>({
    defaultValues: initialData ? {
      name: initialData.name,
      type: initialData.type === "artifact" ? "treasure" : initialData.type, // Handle artifact as treasure
      keywords: initialData.keywords || [],
      icons: initialData.icons || [],
      rules: initialData.rules || [],
      flavor: initialData.flavor || "",
      imagePrompt: initialData.imagePrompt || "",
      ...getCardFormTypeDefaults(initialData)
    } : {
      name: "",
      type: "treasure", // Default type
      keywords: [],
      icons: [],
      rules: [],
      flavor: "",
      imagePrompt: "",
      // Default empty values for type-specific fields
      value: undefined,
      consumable: false,
      passiveEffect: "",
      useEffect: "",
      subType: undefined,
      difficultyClasses: {
        fight: undefined,
        flee: undefined,
        negotiate: undefined,
        outsmart: undefined
      },
      onFailure: "",
      onSuccess: "",
      bossHazard: false,
      gearBonuses: [],
      biomeTags: [],
      onEnter: "",
      action: "",
      rest: "",
      bonusZone: "",
      checkDC: undefined,
      actions: [],
      category: undefined,
      uses: undefined,
      actionCost: undefined,
      passive: "",
      statBonus: {
        stat: undefined,
        value: undefined
      },
      heatEffect: undefined,
      globalEffect: "",
      duration: undefined,
      originalRole: "",
      chaosAction: "",
      specialAbility: "",
      alignment: undefined,
      winCondition: "",
      movement: "",
      combatBonus: undefined,
      specialEffect: "",
      // Player Character defaults
      role: "",
      stats: {
        brawn: 1,
        moxie: 1,
        charm: 1,
        grit: 1,
        weirdSense: 1
      },
      ability: {
        name: "",
        description: ""
      },
      health: 5,
      weirdness: 0,
      luck: 5,
      starterGear: []
    }
  });

  return form;
};
