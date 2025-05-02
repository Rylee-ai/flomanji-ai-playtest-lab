
import React, { useState } from "react";
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
import { CardGrid } from "../cards/CardGrid";
import { LayoutGrid, Table as TableIcon, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { showSuccessToast, showErrorToast } from "@/lib/toast";

interface TableWrapperProps {
  activeTab: CardType;
  cards: GameCard[];
  onViewCard: (id: string) => void;
  onEditCard: (card: GameCard) => void;
  onDeleteCard: (card: GameCard) => void;
}

// Protected brand assets - MUST NOT be modified without explicit permission
const PROTECTED_BRAND_ASSETS = [
  "/lovable-uploads/e5635414-17a2-485e-86cb-feaf926b9af5.png", // Flomanji card back
];

export const TableWrapper = ({ activeTab, cards, onViewCard, onEditCard, onDeleteCard }: TableWrapperProps) => {
  const [view, setView] = useState<'table' | 'grid'>('grid');
  const [cardToDelete, setCardToDelete] = useState<GameCard | null>(null);

  const handleDeleteCard = (card: GameCard) => {
    // Prevent deletion of cards with protected brand assets
    if (card.imageUrl && PROTECTED_BRAND_ASSETS.includes(card.imageUrl)) {
      showErrorToast('Cannot delete cards with protected brand assets');
      return;
    }
    setCardToDelete(card);
  };

  const confirmDelete = () => {
    if (cardToDelete) {
      onDeleteCard(cardToDelete);
      setCardToDelete(null);
      showSuccessToast(`Deleted ${cardToDelete.name} successfully`);
    }
  };

  const cancelDelete = () => {
    setCardToDelete(null);
  };

  const handleImageUpload = async (cardId: string, imageUrl: string) => {
    // Brand protection check - prevent modifications to brand assets
    const cardToUpdate = cards.find(card => card.id === cardId);
    if (cardToUpdate && cardToUpdate.imageUrl && PROTECTED_BRAND_ASSETS.includes(cardToUpdate.imageUrl)) {
      showErrorToast('Cannot modify protected brand assets');
      return;
    }
    
    // Find the card and update its image
    const updatedCards = cards.map(card => {
      if (card.id === cardId) {
        return {...card, imageUrl};
      }
      return card;
    });
    
    // This is just logging - the actual update would happen in the parent component
    console.log('Image uploaded for card:', cardId, imageUrl);
  };

  const ViewToggle = () => (
    <div className="flex justify-end mb-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setView(view === 'table' ? 'grid' : 'table')}
      >
        {view === 'table' ? (
          <>
            <LayoutGrid className="h-4 w-4 mr-2" />
            Grid View
          </>
        ) : (
          <>
            <TableIcon className="h-4 w-4 mr-2" />
            Table View
          </>
        )}
      </Button>
    </div>
  );

  const getTable = () => {
    const commonProps = {
      onViewCard,
      onEditCard,
      onDeleteCard: handleDeleteCard,
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

  return (
    <>
      <ViewToggle />
      {view === 'grid' ? (
        <CardGrid
          cards={cards}
          onViewCard={onViewCard}
          onEditCard={onEditCard}
          onDeleteCard={handleDeleteCard}
          onImageUpload={handleImageUpload}
        />
      ) : (
        getTable()
      )}
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
