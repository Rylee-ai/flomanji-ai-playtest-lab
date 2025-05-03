
import React from "react";
import { CardFormValues } from "@/types/forms/card-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface CardPreviewTabProps {
  cards: CardFormValues[];
  selectedCard?: CardFormValues;
  onSelectCard: (card: CardFormValues) => void;
}

export function CardPreviewTab({ cards, selectedCard, onSelectCard }: CardPreviewTabProps) {
  // If no cards yet, show a placeholder
  if (cards.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        No cards imported yet. Upload a file to see a preview.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="col-span-1 border rounded-md">
        <ScrollArea className="h-[400px] p-2">
          <h3 className="text-sm font-medium px-2 py-1 sticky top-0 bg-background z-10">
            Imported Cards ({cards.length})
          </h3>
          <ul className="space-y-1 p-2">
            {cards.map((card, index) => (
              <li 
                key={card.id || index}
                className={`text-sm p-2 cursor-pointer rounded-md ${selectedCard?.id === card.id ? 'bg-primary/10 font-medium' : 'hover:bg-muted'}`}
                onClick={() => onSelectCard(card)}
              >
                {card.name || `Card #${index + 1}`}
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>

      <div className="col-span-1 md:col-span-2 border rounded-md p-4">
        {selectedCard ? (
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-xl font-bold">{selectedCard.name}</h3>
              <div className="flex items-center gap-2">
                <Badge>{selectedCard.type}</Badge>
                {selectedCard.category && <Badge variant="outline">{selectedCard.category}</Badge>}
              </div>
            </div>

            {selectedCard.icons && selectedCard.icons.length > 0 && (
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Icons</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedCard.icons.map((icon, i) => (
                    <Badge variant="secondary" key={i}>
                      {icon.symbol}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {selectedCard.keywords && selectedCard.keywords.length > 0 && (
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Keywords</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedCard.keywords.map((keyword, i) => (
                    <Badge variant="outline" key={i}>
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {selectedCard.rules && selectedCard.rules.length > 0 && (
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Rules</h4>
                <div className="bg-muted/50 p-2 rounded-md text-sm">
                  {selectedCard.rules[0]}
                </div>
              </div>
            )}

            {selectedCard.flavor && (
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Flavor Text</h4>
                <div className="italic text-sm">{selectedCard.flavor}</div>
              </div>
            )}

            {selectedCard.imagePrompt && (
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Image Prompt</h4>
                <div className="text-sm text-muted-foreground">{selectedCard.imagePrompt}</div>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-muted-foreground">Select a card to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
