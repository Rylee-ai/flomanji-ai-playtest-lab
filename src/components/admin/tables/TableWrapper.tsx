
import React from "react";
import { GameCard } from "@/types/cards";
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
import { CardType } from "@/types/cards";
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
}

export const TableWrapper = ({ activeTab, cards, onViewCard, onEditCard }: TableWrapperProps) => {
  const [cardToDelete, setCardToDelete] = React.useState<GameCard | null>(null);

  const handleDeleteCard = (card: GameCard) => {
    setCardToDelete(card);
  };

  const confirmDelete = () => {
    if (cardToDelete) {
      // Here you would typically delete the card from your database
      toast.success(`Deleted ${cardToDelete.name}`);
      setCardToDelete(null);
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

    switch (activeTab) {
      case "automa":
        return <AutomaCardsTable cards={cards} {...commonProps} />;
      case "chaos":
        return <ChaosCardsTable cards={cards} {...commonProps} />;
      case "flomanjified":
        return <FlomanjifiedCardsTable cards={cards} {...commonProps} />;
      case "gear":
        return <GearCardsTable cards={cards} {...commonProps} />;
      case "hazard":
        return <HazardCardsTable cards={cards} {...commonProps} />;
      case "mission":
        return <MissionCardsTable cards={cards} {...commonProps} />;
      case "npc":
        return <NPCCardsTable cards={cards} {...commonProps} />;
      case "player-character":
        return <PlayerCharacterCardsTable cards={cards} {...commonProps} />;
      case "region":
        return <RegionCardsTable cards={cards} {...commonProps} />;
      case "secret":
        return <SecretCardsTable cards={cards} {...commonProps} />;
      case "treasure":
        return <TreasureCardsTable cards={cards} {...commonProps} />;
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
