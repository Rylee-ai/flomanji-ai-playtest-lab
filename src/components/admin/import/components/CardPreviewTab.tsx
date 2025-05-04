
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CardFormValues } from "@/types/forms/card-form";
import { CardPreview } from "./CardPreview";

export interface CardPreviewTabProps {
  cards: CardFormValues[];
  onSelectCard?: (card: CardFormValues) => void; // Make this prop optional
}

export function CardPreviewTab({ cards, onSelectCard = () => {} }: CardPreviewTabProps) {
  if (cards.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No cards to preview.</p>
      </div>
    );
  }
  
  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-4">
        {cards.map((card, index) => (
          <CardPreview 
            key={card.id || index} 
            card={card} 
            onSelect={onSelectCard} 
          />
        ))}
      </div>
    </ScrollArea>
  );
}
