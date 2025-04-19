
import { useForm } from "react-hook-form";
import { CardFormValues } from "../CardForm";
import { GameCard } from "@/types/cards";
import { TreasureCard } from "@/types/cards/treasure";
import { HazardCard } from "@/types/cards/hazard";
import { RegionCard } from "@/types/cards/region";
import { NPCCard } from "@/types/cards/npc";
import { GearCard } from "@/types/cards/gear";
import { ChaosCard } from "@/types/cards/chaos";
import { FlomanjifiedRoleCard } from "@/types/cards/flomanjified";
import { SecretObjectiveCard } from "@/types/cards";
import { AutomaCard } from "@/types/cards";

export const useCardForm = (initialData?: GameCard) => {
  const form = useForm<CardFormValues>({
    defaultValues: initialData ? {
      name: initialData.name,
      type: initialData.type === "artifact" ? "treasure" : initialData.type, // Handle artifact as treasure
      keywords: initialData.keywords || [],
      icons: initialData.icons || [],
      rules: initialData.rules || [],
      flavor: initialData.flavor || "",
      // Type-specific fields are handled based on the card type
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
    case "region": {
      const regionCard = card as RegionCard;
      return {
        biomeTags: regionCard.biomeTags?.map(tag => tag) || [],
        onEnter: regionCard.onEnter,
        bonusZone: regionCard.bonusZone
      };
    }
    case "npc": {
      const npcCard = card as NPCCard;
      return {
        checkDC: npcCard.checkDC,
        actions: npcCard.actions ? JSON.stringify(npcCard.actions) : ""
      };
    }
    case "gear": {
      const gearCard = card as GearCard;
      return {
        category: gearCard.category,
        consumable: gearCard.consumable,
        uses: gearCard.uses
      };
    }
    case "chaos": {
      const chaosCard = card as ChaosCard;
      return {
        heatEffect: chaosCard.heatEffect,
        globalEffect: chaosCard.globalEffect
      };
    }
    case "flomanjified": {
      const flomanjifiedCard = card as FlomanjifiedRoleCard;
      return {
        originalRole: flomanjifiedCard.originalRole,
        chaosAction: flomanjifiedCard.chaosAction,
        specialAbility: flomanjifiedCard.specialAbility
      };
    }
    case "secret": {
      const secretCard = card as SecretObjectiveCard;
      return {
        alignment: secretCard.alignment,
        winCondition: secretCard.winCondition
      };
    }
    case "automa": {
      const automaCard = card as AutomaCard;
      return {
        // Include automa specific fields
        movement: automaCard.movement,
        combatBonus: automaCard.combatBonus,
        specialEffect: automaCard.specialEffect
      };
    }
    default:
      return {};
  }
};
