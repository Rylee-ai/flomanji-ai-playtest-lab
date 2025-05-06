
import React, { memo } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { TableWrapper } from "../tables/TableWrapper";
import { CardType, GameCard } from "@/types/cards";

interface CardContentDisplayProps {
  activeTab: CardType;
  loading: boolean;
  cards: GameCard[];
  onViewCard: (id: string) => void;
  onEditCard: (card: GameCard) => void;
  onDeleteCard: (card: GameCard) => void;
}

export const CardContentDisplay: React.FC<CardContentDisplayProps> = memo(({
  activeTab,
  loading,
  cards,
  onViewCard,
  onEditCard,
  onDeleteCard
}) => {
  return (
    <TabsContent value={activeTab} className="pt-4 border-t">
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-sm text-muted-foreground">Loading cards...</p>
          </div>
        </div>
      ) : (
        <TableWrapper 
          activeTab={activeTab} 
          cards={cards} 
          onViewCard={onViewCard} 
          onEditCard={onEditCard} 
          onDeleteCard={onDeleteCard} 
        />
      )}
    </TabsContent>
  );
});

CardContentDisplay.displayName = "CardContentDisplay";
