import { useForm } from "react-hook-form";
import { CardFormValues, cardFormSchema } from "../CardForm";
import { GameCard, CardType } from "@/types/cards";
import { getCardFormTypeDefaults } from "./getCardFormTypeDefaults";
import { missionSubtypes } from "../CardForm";
import { zodResolver } from "@hookform/resolvers/zod";

const normalizeCardType = (type: CardType): CardType => {
  if (missionSubtypes.includes(type as any)) {
    return "mission";
  }
  if (type === "artifact") {
    return "treasure";
  }
  return type;
};

export const useCardForm = (initialData?: GameCard) => {
  console.log("Initial form data:", initialData); // Keep for debugging

  const form = useForm<CardFormValues>({
    resolver: zodResolver(cardFormSchema),
    defaultValues: initialData ? {
      // Base card fields
      name: initialData.name,
      type: normalizeCardType(initialData.type),
      keywords: initialData.keywords || [],
      icons: initialData.icons || [],
      rules: initialData.rules || [],
      flavor: initialData.flavor || "",
      imagePrompt: initialData.imagePrompt || "",
      // Get type-specific defaults based on the card type
      ...getCardFormTypeDefaults(initialData)
    } : {
      // Default empty values for new cards
      name: "",
      type: "treasure",
      keywords: [],
      icons: [],
      rules: [],
      flavor: "",
      imagePrompt: "",
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
