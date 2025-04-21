
import { useForm } from "react-hook-form";
import { CardFormValues } from "../CardForm";
import { GameCard, CardType } from "@/types/cards";
import { getCardFormTypeDefaults } from "./getCardFormTypeDefaults";
import { missionSubtypes } from "../CardForm";

// Helper to map mission subtypes to "mission" for form consistency
const normalizeCardType = (type: CardType): "treasure" | "artifact" | "automa" | "secret" | "hazard" | "gear" | "npc" | "region" | "chaos" | "mission" | "flomanjified" | "player-character" => {
  // If type is a mission subtype, return "mission"
  if (missionSubtypes.includes(type as any)) {
    return "mission";
  }
  
  // Handle artifact as treasure
  if (type === "artifact") {
    return "treasure";
  }
  
  // Return as is for other valid form types
  return type as any;
};

export const useCardForm = (initialData?: GameCard) => {
  console.log("Initial form data:", initialData); // Kept for debugging
 
  const form = useForm<CardFormValues>({
    defaultValues: initialData ? {
      name: initialData.name,
      type: normalizeCardType(initialData.type), // Normalize type for the form
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
