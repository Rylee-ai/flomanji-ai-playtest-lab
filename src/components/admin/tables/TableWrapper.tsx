
import React, { useState } from "react";
import { GameCard, CardType } from "@/types/cards";
import { CardGrid } from "../cards/CardGrid";
import { ViewToggle } from "./components/ViewToggle";
import { DeleteCardDialog } from "./components/DeleteCardDialog";
import { TableSwitcher } from "./components/TableSwitcher";
import { useCardSelection } from "./hooks/useCardSelection";

interface TableWrapperProps {
  activeTab: CardType;
  cards: GameCard[];
  onViewCard: (id: string) => void;
  onEditCard: (card: GameCard) => void;
  onDeleteCard: (card: GameCard) => void;
}

export const TableWrapper = ({ activeTab, cards, onViewCard, onEditCard, onDeleteCard }: TableWrapperProps) => {
  const [view, setView] = useState<'table' | 'grid'>('grid');
  
  const {
    cardToDelete,
    setCardToDelete,
    selectedCards,
    handleDeleteCard,
    handleSelectCard,
    handleBulkEditComplete,
    handleImageUpload
  } = useCardSelection(cards);

  const closeDeleteDialog = () => setCardToDelete(null);

  return (
    <>
      <ViewToggle 
        view={view}
        setView={setView}
        selectedCards={selectedCards}
        activeTab={activeTab}
        onBulkEditComplete={handleBulkEditComplete}
      />
      
      {view === 'grid' ? (
        <CardGrid
          cards={cards}
          selectedCards={selectedCards}
          onSelectCard={handleSelectCard}
          onViewCard={onViewCard}
          onEditCard={onEditCard}
          onDeleteCard={handleDeleteCard}
          onImageUpload={handleImageUpload}
        />
      ) : (
        <TableSwitcher
          activeTab={activeTab}
          cards={cards}
          onViewCard={onViewCard}
          onEditCard={onEditCard}
          onDeleteCard={handleDeleteCard}
        />
      )}
      
      <DeleteCardDialog
        cardToDelete={cardToDelete}
        onClose={closeDeleteDialog}
        onConfirm={onDeleteCard}
      />
    </>
  );
};
