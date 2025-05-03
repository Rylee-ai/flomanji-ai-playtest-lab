
import React from "react";
import { CardType, GameCard } from "@/types/cards";
import { AutomaCardsTable } from "../AutomaCardsTable";
import { ChaosCardsTable } from "../ChaosCardsTable";
import { FlomanjifiedCardsTable } from "../FlomanjifiedCardsTable";
import { GearCardsTable } from "../GearCardsTable";
import { HazardCardsTable } from "../HazardCardsTable";
import { MissionCardsTable } from "../MissionCardsTable";
import { NPCCardsTable } from "../NPCCardsTable";
import { PlayerCharacterCardsTable } from "../PlayerCharacterCardsTable";
import { RegionCardsTable } from "../RegionCardsTable";
import { SecretCardsTable } from "../SecretCardsTable";
import { TreasureCardsTable } from "../TreasureCardsTable";
import { AutomaCard } from "@/types/cards";
import { ChaosCard } from "@/types/cards/chaos";
import { FlomanjifiedRoleCard } from "@/types/cards/flomanjified";
import { GearCard } from "@/types/cards/gear";
import { HazardCard } from "@/types/cards/hazard";
import { MissionSheet } from "@/types/cards/mission";
import { NPCCard } from "@/types/cards/npc";
import { PlayerCharacterCard } from "@/types/cards/player-character";
import { RegionCard } from "@/types/cards/region";
import { SecretObjectiveCard } from "@/types/cards";
import { TreasureCard } from "@/types/cards/treasure";

interface TableSwitcherProps {
  activeTab: CardType;
  cards: GameCard[];
  onViewCard: (id: string) => void;
  onEditCard: (card: GameCard) => void;
  onDeleteCard: (card: GameCard) => void;
}

export const TableSwitcher = ({ activeTab, cards, onViewCard, onEditCard, onDeleteCard }: TableSwitcherProps) => {
  const commonProps = {
    onViewCard,
    onEditCard,
    onDeleteCard,
  };

  switch (activeTab) {
    case "automa":
      return <AutomaCardsTable cards={cards as unknown as AutomaCard[]} {...commonProps} />;
    case "chaos":
      return <ChaosCardsTable cards={cards as unknown as ChaosCard[]} {...commonProps} />;
    case "flomanjified":
      return <FlomanjifiedCardsTable cards={cards as unknown as FlomanjifiedRoleCard[]} {...commonProps} />;
    case "gear":
      return <GearCardsTable cards={cards as unknown as GearCard[]} {...commonProps} />;
    case "hazard":
      return <HazardCardsTable cards={cards as unknown as HazardCard[]} {...commonProps} />;
    case "mission":
      return <MissionCardsTable cards={cards as unknown as MissionSheet[]} {...commonProps} />;
    case "npc":
      return <NPCCardsTable cards={cards as unknown as NPCCard[]} {...commonProps} />;
    case "player-character":
      return <PlayerCharacterCardsTable cards={cards as unknown as PlayerCharacterCard[]} {...commonProps} />;
    case "region":
      return <RegionCardsTable cards={cards as unknown as RegionCard[]} {...commonProps} />;
    case "secret":
      return <SecretCardsTable cards={cards as unknown as SecretObjectiveCard[]} {...commonProps} />;
    case "treasure":
    case "artifact":
      return <TreasureCardsTable cards={cards as unknown as TreasureCard[]} {...commonProps} />;
    default:
      return null;
  }
};
