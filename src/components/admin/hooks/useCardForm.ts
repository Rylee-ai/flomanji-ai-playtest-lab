
import { useForm } from "react-hook-form";
import { CardFormValues } from "@/types/forms/card-form";
import { GameCard, CardType } from "@/types/cards";
import { getCardFormTypeDefaults } from "./getCardFormTypeDefaults";
import { missionSubtypes, cardFormSchema } from "@/schemas/card-form-schema";
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
  // Fix for undefined form data issue
  const defaultValues: CardFormValues = initialData ? {
    // Base card fields with fallbacks
    name: initialData.name || "",
    type: normalizeCardType(initialData.type) || "treasure",
    keywords: initialData.keywords || [],
    icons: initialData.icons || [],
    rules: initialData.rules || [],
    flavor: initialData.flavor || "",
    imagePrompt: initialData.imagePrompt || "",
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
    
    // Default fields for all card types
    // Treasure card fields
    value: undefined,
    consumable: false,
    passiveEffect: "",
    useEffect: "",
    
    // Hazard card fields
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
    
    // Region card fields
    biomeTags: [],
    onEnter: "",
    action: "",
    rest: "",
    bonusZone: "",
    
    // NPC card fields
    checkDC: undefined,
    actions: [],
    
    // Gear card fields
    category: undefined,
    uses: undefined,
    actionCost: undefined,
    passive: "",
    statBonus: {
      stat: undefined,
      value: undefined
    },
    
    // Chaos card fields
    heatEffect: undefined,
    globalEffect: "",
    duration: undefined,
    
    // Flomanjified card fields
    originalRole: "",
    chaosAction: "",
    specialAbility: "",
    
    // Secret card fields
    alignment: undefined,
    winCondition: "",
    
    // Automa card fields
    movement: "",
    combatBonus: undefined,
    specialEffect: "",
    
    // Player Character fields
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
    starterGear: [],
    
    // Mission card fields
    hook: "",
    mapLayout: "",
    startingHeat: undefined,
    objectives: [],
    extractionRegion: "",
    scaling: {
      small: "",
      large: ""
    },
    recommendedPlayerCount: "",
    estimatedDuration: undefined,
    difficultyRating: undefined
  };

  const form = useForm<CardFormValues>({
    resolver: zodResolver(cardFormSchema),
    defaultValues
  });

  return form;
};
