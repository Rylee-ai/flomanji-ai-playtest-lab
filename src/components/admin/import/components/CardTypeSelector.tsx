
import React from "react";
import { CardType } from "@/types/cards";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CardTypeSelectorProps {
  cardType: CardType;
  setCardType: (type: CardType) => void;
  defaultValue?: CardType;
}

export const CardTypeSelector = ({
  cardType,
  setCardType,
  defaultValue,
}: CardTypeSelectorProps) => {
  return (
    <Select 
      value={cardType} 
      onValueChange={(value: CardType) => setCardType(value)}
      defaultValue={defaultValue || cardType}
    >
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Select Card Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="player-character">Player Characters</SelectItem>
        <SelectItem value="npc">NPC Characters</SelectItem>
        <SelectItem value="flomanjified">Flomanjified Roles</SelectItem>
        <SelectItem value="treasure">Treasure Cards</SelectItem>
        <SelectItem value="gear">Gear Cards</SelectItem>
        <SelectItem value="hazard">Hazard Cards</SelectItem>
        <SelectItem value="chaos">Chaos Cards</SelectItem>
        <SelectItem value="region">Region Cards</SelectItem>
        <SelectItem value="mission">Mission Sheets</SelectItem>
        <SelectItem value="secret">Secret Objectives</SelectItem>
        <SelectItem value="automa">Automa Cards</SelectItem>
      </SelectContent>
    </Select>
  );
};
