
import React from "react";
import { CardType } from "@/types/cards";
import { UseFormReturn } from "react-hook-form";
import { CardFormValues, missionSubtypes } from "./CardForm";
import { TreasureCardForm } from "./forms/TreasureCardForm";
import { HazardCardForm } from "./forms/HazardCardForm";
import { RegionCardForm } from "./forms/RegionCardForm";
import { NPCCardForm } from "./forms/NPCCardForm";
import { MissionCardForm } from "./forms/MissionCardForm";
import { GearCardForm } from "./forms/GearCardForm";
import { ChaosCardForm } from "./forms/ChaosCardForm";
import { FlomanjifiedCardForm } from "./forms/FlomanjifiedCardForm";
import { SecretCardForm } from "./forms/SecretCardForm";
import { AutomaCardForm } from "./forms/AutomaCardForm";
import { PlayerCharacterForm } from "./forms/PlayerCharacterForm";

interface CardTypeFormSwitcherProps {
  type: CardType | undefined;
  form: UseFormReturn<CardFormValues>;
}

export const CardTypeFormSwitcher = ({ type, form }: CardTypeFormSwitcherProps) => {
  // Check if the type is a mission subtype
  const isMissionType = missionSubtypes.includes(type as any) || type === "mission";
  
  switch (true) {
    case type === "treasure" || type === "artifact":
      return <TreasureCardForm form={form} />;
    case type === "hazard":
      return <HazardCardForm form={form} />;
    case type === "region":
      return <RegionCardForm form={form} />;
    case type === "npc":
      return <NPCCardForm form={form} />;
    case isMissionType:
      return <MissionCardForm form={form} />;
    case type === "gear":
      return <GearCardForm form={form} />;
    case type === "chaos":
      return <ChaosCardForm form={form} />;
    case type === "flomanjified":
      return <FlomanjifiedCardForm form={form} />;
    case type === "secret":
      return <SecretCardForm form={form} />;
    case type === "automa":
      return <AutomaCardForm form={form} />;
    case type === "player-character":
      return <PlayerCharacterForm form={form} />;
    default:
      return null;
  }
};
