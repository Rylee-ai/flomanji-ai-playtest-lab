
import React from "react";
import { GameCard } from "@/types/cards";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { CardImageUpload } from "./components/CardImageUpload";
import { CardInfoDisplay } from "./components/CardInfoDisplay";
import { CardActions } from "./components/CardActions";

interface CardGridProps {
  cards: GameCard[];
  selectedCards?: GameCard[];
  onSelectCard?: (card: GameCard, isSelected: boolean) => void;
  onViewCard: (id: string) => void;
  onEditCard: (card: GameCard) => void;
  onDeleteCard: (card: GameCard) => void;
  onImageUpload: (cardId: string, imageUrl: string) => void;
}

// Brand protection constant - this image URL should never be changed without approval
const FLOMANJI_CARD_BACK_IMAGE = "/lovable-uploads/e5635414-17a2-485e-86cb-feaf926b9af5.png";

export const CardGrid = ({ 
  cards, 
  selectedCards = [], 
  onSelectCard,
  onViewCard, 
  onEditCard, 
  onDeleteCard, 
  onImageUpload 
}: CardGridProps) => {
  // Check if a card is selected
  const isSelected = (card: GameCard) => {
    return selectedCards.some(c => c.id === card.id);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-2 sm:p-4 bg-background">
      {cards.map((card) => (
        <Card key={card.id} className={cn(
          "overflow-hidden group relative hover:shadow-lg transition-shadow border-gray-700",
          isSelected(card) && "ring-2 ring-primary"
        )}>
          {onSelectCard && (
            <div className="absolute top-2 left-2 z-10">
              <Checkbox 
                checked={isSelected(card)}
                onCheckedChange={(checked) => onSelectCard(card, !!checked)}
                className="h-5 w-5 bg-background/80 backdrop-blur-sm"
              />
            </div>
          )}
          
          <CardContent className="p-3">
            <CardImageUpload
              cardId={card.id}
              imageUrl={card.imageUrl}
              onImageUpload={onImageUpload}
              isProtectedAsset={card.isProtectedAsset || card.imageUrl === FLOMANJI_CARD_BACK_IMAGE}
            />

            <h3 className="font-semibold text-base line-clamp-1 mb-1" title={card.name}>
              {card.name}
            </h3>
            <p className="text-xs text-muted-foreground">{card.type}</p>
            
            <CardInfoDisplay card={card} />
          </CardContent>
          
          <CardActions
            card={card}
            onViewCard={onViewCard}
            onEditCard={onEditCard}
            onDeleteCard={onDeleteCard}
          />
        </Card>
      ))}
    </div>
  );
};
