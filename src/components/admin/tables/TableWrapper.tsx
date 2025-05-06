
import React, { useState, useMemo } from "react";
import { GameCard, CardType } from "@/types/cards";
import { CardGrid } from "../cards/CardGrid";
import { ViewToggle } from "./components/ViewToggle";
import { DeleteCardDialog } from "./components/DeleteCardDialog";
import { TableSwitcher } from "./components/TableSwitcher";
import { useCardSelection } from "./hooks/useCardSelection";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Search } from "lucide-react";

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
    searchQuery,
    filteredCards,
    handleDeleteCard,
    handleSelectCard,
    handleBulkEditComplete,
    handleImageUpload,
    handleSearch
  } = useCardSelection(cards);

  const closeDeleteDialog = () => setCardToDelete(null);
  
  // Display filtered cards when search is active, otherwise show all cards
  const displayedCards = useMemo(() => {
    if (searchQuery && filteredCards.length > 0) {
      return filteredCards;
    }
    return cards;
  }, [cards, filteredCards, searchQuery]);

  // Determine if we're showing search results with no matches
  const isNoSearchResults = searchQuery && filteredCards.length === 0;

  return (
    <div className="bg-background rounded-md overflow-hidden">
      <ViewToggle 
        view={view}
        setView={setView}
        selectedCards={selectedCards}
        activeTab={activeTab}
        onBulkEditComplete={handleBulkEditComplete}
        onSearch={handleSearch}
      />
      
      {isNoSearchResults ? (
        <Alert className="bg-muted/50 mx-2 sm:mx-4 mb-4">
          <Search className="h-4 w-4" />
          <AlertDescription>
            No cards match your search for "{searchQuery}". Try a different search term.
          </AlertDescription>
        </Alert>
      ) : (
        displayedCards.length === 0 ? (
          <div className="py-16 text-center mx-2 sm:mx-4 mb-4">
            <h3 className="text-lg font-medium text-muted-foreground">No cards found</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Click "Add New Card" to create your first card in this category.
            </p>
          </div>
        ) : (
          view === 'grid' ? (
            <CardGrid
              cards={displayedCards}
              selectedCards={selectedCards}
              onSelectCard={handleSelectCard}
              onViewCard={onViewCard}
              onEditCard={onEditCard}
              onDeleteCard={handleDeleteCard}
              onImageUpload={handleImageUpload}
            />
          ) : (
            <div className="px-2 sm:px-4 pb-4">
              <TableSwitcher
                activeTab={activeTab}
                cards={displayedCards}
                onViewCard={onViewCard}
                onEditCard={onEditCard}
                onDeleteCard={handleDeleteCard}
              />
            </div>
          )
        )
      )}
      
      <DeleteCardDialog
        cardToDelete={cardToDelete}
        onClose={closeDeleteDialog}
        onConfirm={onDeleteCard}
      />
    </div>
  );
};
