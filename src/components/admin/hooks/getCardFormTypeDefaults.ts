import { CardFormValues } from "../CardForm";
import { GameCard } from "@/types/cards";
import { TreasureCard } from "@/types/cards/treasure";
import { HazardCard } from "@/types/cards/hazard";
import { RegionCard } from "@/types/cards/region";
import { NPCCard } from "@/types/cards/npc";
import { GearCard } from "@/types/cards/gear";
import { ChaosCard } from "@/types/cards/chaos";
import { FlomanjifiedRoleCard } from "@/types/cards/flomanjified";
import { SecretObjectiveCard, AutomaCard } from "@/types/cards";
import { PlayerCharacterCard } from "@/types/cards/player-character";
import { MissionSheet } from "@/types/cards/mission";

/**
 * Extracts type-specific default values for the form
 * 
 * @param card The card to extract defaults from
 * @returns Defaults for CardFormValues matching the card type
 */
export const getCardFormTypeDefaults = (card: GameCard): Partial<CardFormValues> => {
  // Console log kept for debugging, as in the original
  console.log("Getting type-specific data for:", card.type);

  switch (card.type) {
    case "treasure":
    case "artifact": {
      const treasureCard = card as TreasureCard;
      return {
        value: treasureCard.value,
        consumable: treasureCard.consumable || false,
        passiveEffect: treasureCard.passiveEffect || "",
        useEffect: treasureCard.useEffect || ""
      };
    }
    case "hazard": {
      const hazardCard = card as HazardCard;
      return {
        subType: hazardCard.subType,
        difficultyClasses: {
          fight: hazardCard.difficultyClasses?.fight,
          flee: hazardCard.difficultyClasses?.flee,
          negotiate: hazardCard.difficultyClasses?.negotiate,
          outsmart: hazardCard.difficultyClasses?.outsmart,
          grit: hazardCard.difficultyClasses?.grit,
          moxie: hazardCard.difficultyClasses?.moxie,
          charm: hazardCard.difficultyClasses?.charm,
          weirdSense: hazardCard.difficultyClasses?.weirdSense
        },
        bossHazard: hazardCard.bossHazard || false,
        onFailure: hazardCard.onFailure || "",
        onSuccess: hazardCard.onSuccess || "",
        gearBonuses: hazardCard.gearBonuses || []
      };
    }
    case "region": {
      const regionCard = card as RegionCard;
      return {
        biomeTags: regionCard.biomeTags || [],
        onEnter: regionCard.onEnter || "",
        action: regionCard.action || "",
        rest: regionCard.rest || "",
        bonusZone: regionCard.bonusZone || ""
      };
    }
    case "npc": {
      const npcCard = card as NPCCard;
      return {
        checkDC: npcCard.checkDC,
        actions: npcCard.actions?.map(action => ({
          description: action.description || "",
          cost: action.cost || 1,
          effect: action.effect || ""
        })) || []
      };
    }
    case "gear": {
      const gearCard = card as GearCard;
      return {
        category: gearCard.category,
        consumable: gearCard.consumable || false,
        uses: gearCard.uses,
        actionCost: gearCard.actionCost,
        passive: gearCard.passive || "",
        statBonus: {
          stat: gearCard.statBonus?.stat,
          value: gearCard.statBonus?.value
        }
      };
    }
    case "chaos": {
      const chaosCard = card as ChaosCard;
      return {
        heatEffect: chaosCard.heatEffect,
        globalEffect: chaosCard.globalEffect || "",
        duration: chaosCard.duration
      };
    }
    case "flomanjified": {
      const flomanjifiedCard = card as FlomanjifiedRoleCard;
      return {
        originalRole: flomanjifiedCard.originalRole || "",
        chaosAction: flomanjifiedCard.chaosAction || "",
        specialAbility: flomanjifiedCard.specialAbility || ""
      };
    }
    case "secret": {
      const secretCard = card as SecretObjectiveCard;
      return {
        alignment: secretCard.alignment,
        winCondition: secretCard.winCondition || ""
      };
    }
    case "automa": {
      const automaCard = card as AutomaCard;
      return {
        movement: automaCard.movement || "",
        combatBonus: automaCard.combatBonus,
        specialEffect: automaCard.specialEffect || ""
      };
    }
    case "player-character": {
      const playerCharCard = card as PlayerCharacterCard;
      return {
        role: playerCharCard.role || "",
        stats: {
          brawn: playerCharCard.stats?.brawn || 1,
          moxie: playerCharCard.stats?.moxie || 1,
          charm: playerCharCard.stats?.charm || 1,
          grit: playerCharCard.stats?.grit || 1,
          weirdSense: playerCharCard.stats?.weirdSense || 1
        },
        ability: {
          name: playerCharCard.ability?.name || "",
          description: playerCharCard.ability?.description || ""
        },
        health: playerCharCard.health || 5,
        weirdness: playerCharCard.weirdness || 0,
        luck: playerCharCard.luck || 5,
        starterGear: playerCharCard.starterGear || []
      };
    }
    case "mission":
    case "exploration":
    case "escape":
    case "escort":
    case "collection":
    case "boss":
    case "solo": {
      // First, cast to unknown, then to MissionSheet to avoid direct cast error
      const missionCard = card as unknown as MissionSheet;
      return {
        hook: missionCard.hook || "",
        mapLayout: missionCard.mapLayout || "",
        startingHeat: missionCard.startingHeat || 0,
        extractionRegion: missionCard.extractionRegion || "",
        specialRules: missionCard.specialRules || [],
        objectives: missionCard.objectives?.map(objective => ({
          description: objective.description || "",
          required: objective.required || false,
          reward: objective.reward || "",
          difficultyLevel: objective.difficultyLevel || 1,
          completionCheck: objective.completionCheck || "",
          regionId: objective.regionId || ""
        })) || [],
        challenges: missionCard.challenges?.map(challenge => ({
          description: challenge.description || "",
          frequency: challenge.frequency || "once",
          trigger: challenge.trigger || "",
          heatEffect: challenge.heatEffect || 0,
          weirdnessEffect: challenge.weirdnessEffect || 0
        })) || [],
        scaling: {
          small: missionCard.scaling?.small || "",
          large: missionCard.scaling?.large || ""
        },
        recommendedPlayerCount: missionCard.recommendedPlayerCount || [],
        estimatedDuration: missionCard.estimatedDuration || 0,
        difficultyRating: missionCard.difficultyRating || 0
      };
    }
    default:
      return {};
  }
};
