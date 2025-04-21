
import React from "react";
import { CardType } from "@/types/cards";
import { UseFormReturn } from "react-hook-form";
import { CardFormValues } from "./CardForm";
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
  switch (type) {
    case "treasure":
      return <TreasureCardForm form={form} />;
    case "hazard":
      return <HazardCardForm form={form} />;
    case "region":
      return <RegionCardForm form={form} />;
    case "npc":
      return <NPCCardForm form={form} />;
    case "mission":
      return <MissionCardForm form={form} />;
    case "gear":
      return <GearCardForm form={form} />;
    case "chaos":
      return <ChaosCardForm form={form} />;
    case "flomanjified":
      return <FlomanjifiedCardForm form={form} />;
    case "secret":
      return <SecretCardForm form={form} />;
    case "automa":
      return <AutomaCardForm form={form} />;
    case "player-character":
      return <PlayerCharacterForm form={form} />;
    default:
      return null;
  }
};
