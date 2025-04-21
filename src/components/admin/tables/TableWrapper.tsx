import React from "react";
import { GameCard } from "@/types/cards";
import { TreasureCard } from "@/types/cards/treasure";
import { AutomaCard } from "@/types/cards";
import { MissionSheet } from "@/types/cards/mission";
import { GearCard } from "@/types/cards/gear";
import { ChaosCard } from "@/types/cards/chaos";
import { HazardCard } from "@/types/cards/hazard";
import { RegionCard } from "@/types/cards/region";
import { NPCCard } from "@/types/cards/npc";
import { FlomanjifiedRoleCard } from "@/types/cards/flomanjified";
import { PlayerCharacterCard } from "@/types/cards/player-character";
import { TreasureCardsTable } from "./TreasureCardsTable";
import { AutomaCardsTable } from "./AutomaCardsTable";
import { MissionCardsTable } from "./MissionCardsTable";
import { GearCardsTable } from "./GearCardsTable";
import { ChaosCardsTable } from "./ChaosCardsTable";
import { HazardCardsTable } from "./HazardCardsTable";
import { RegionCardsTable } from "./RegionCardsTable";
import { NPCCardsTable } from "./NPCCardsTable";
import { FlomanjifiedCardsTable } from "./FlomanjifiedCardsTable";
import { PlayerCharacterCardsTable } from "./PlayerCharacterCardsTable";
import { SecretObjectiveCard } from "@/types/cards";
import { SecretCardsTable } from "./SecretCardsTable";

interface TableWrapperProps {
  activeTab: string;
  cards: GameCard[];
  onViewCard: (id: string) => void;
  onEditCard: (card: GameCard) => void;
}

export const TableWrapper = ({ activeTab, cards, onViewCard, onEditCard }: TableWrapperProps) => {
  switch (activeTab) {
    case "treasure":
      return (
        <TreasureCardsTable
          cards={cards as TreasureCard[]}
          onViewCard={onViewCard}
          onEditCard={onEditCard}
        />
      );
    case "automa":
      return (
        <AutomaCardsTable
          cards={cards as AutomaCard[]}
          onViewCard={onViewCard}
          onEditCard={onEditCard}
        />
      );
    case "mission":
    case "exploration":
    case "escape":
    case "escort":
    case "collection":
    case "boss":
    case "solo":
      return (
        <MissionCardsTable
          cards={cards as unknown as MissionSheet[]}
          onViewCard={onViewCard}
          onEditCard={(card) => onEditCard(card as unknown as GameCard)}
        />
      );
    case "gear":
      return (
        <GearCardsTable
          cards={cards as GearCard[]}
          onViewCard={onViewCard}
          onEditCard={onEditCard}
        />
      );
    case "chaos":
      return (
        <ChaosCardsTable
          cards={cards as ChaosCard[]}
          onViewCard={onViewCard}
          onEditCard={onEditCard}
        />
      );
    case "hazard":
      return (
        <HazardCardsTable
          cards={cards as HazardCard[]}
          onViewCard={onViewCard}
          onEditCard={onEditCard}
        />
      );
    case "region":
      return (
        <RegionCardsTable
          cards={cards as RegionCard[]}
          onViewCard={onViewCard}
          onEditCard={onEditCard}
        />
      );
    case "npc":
      return (
        <NPCCardsTable
          cards={cards as NPCCard[]}
          onViewCard={onViewCard}
          onEditCard={onEditCard}
        />
      );
    case "flomanjified":
      return (
        <FlomanjifiedCardsTable
          cards={cards as FlomanjifiedRoleCard[]}
          onViewCard={onViewCard}
          onEditCard={onEditCard}
        />
      );
    case "player-character":
      return (
        <PlayerCharacterCardsTable
          cards={cards as PlayerCharacterCard[]}
          onViewCard={onViewCard}
          onEditCard={onEditCard}
        />
      );
    case "secret":
      return (
        <SecretCardsTable
          cards={cards as SecretObjectiveCard[]}
          onViewCard={onViewCard}
          onEditCard={onEditCard}
        />
      );
    default:
      return null;
  }
};
