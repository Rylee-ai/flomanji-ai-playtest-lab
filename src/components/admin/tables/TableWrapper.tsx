
import React from "react";
import { GameCard, CardType } from "@/types/cards";
import { AutomaCardsTable } from "./AutomaCardsTable";
import { ChaosCardsTable } from "./ChaosCardsTable";
import { FlomanjifiedCardsTable } from "./FlomanjifiedCardsTable";
import { GearCardsTable } from "./GearCardsTable";
import { HazardCardsTable } from "./HazardCardsTable";
import { MissionCardsTable } from "./MissionCardsTable";
import { NPCCardsTable } from "./NPCCardsTable";
import { PlayerCharacterCardsTable } from "./PlayerCharacterCardsTable";
import { RegionCardsTable } from "./RegionCardsTable";
import { SecretCardsTable } from "./SecretCardsTable";
import { TreasureCardsTable } from "./TreasureCardsTable";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface TableWrapperProps {
  activeTab: CardType;
  cards: GameCard[];
  onViewCard: (id: string) => void;
  onEditCard: (card: GameCard) => void;
  onDeleteCard: (card: GameCard) => void;
}

export const TableWrapper = ({ activeTab, cards, onViewCard, onEditCard, onDeleteCard }: TableWrapperProps) => {
  const [cardToDelete, setCardToDelete] = React.useState<GameCard | null>(null);

  const handleDeleteCard = (card: GameCard) => {
    setCardToDelete(card);
  };

  const confirmDelete = () => {
    if (cardToDelete) {
      // Here you would typically delete the card from your database
      onDeleteCard(cardToDelete);
      setCardToDelete(null);
      toast.success(`Deleted ${cardToDelete.name} successfully`);
    }
  };

  const cancelDelete = () => {
    setCardToDelete(null);
  };

  const getTable = () => {
    const commonProps = {
      onViewCard,
      onEditCard,
      onDeleteCard: handleDeleteCard,
    };

    // Type casting cards to the appropriate type based on activeTab
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

  return (
    <>
      {getTable()}
      <AlertDialog open={!!cardToDelete} onOpenChange={() => setCardToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Card</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {cardToDelete?.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
