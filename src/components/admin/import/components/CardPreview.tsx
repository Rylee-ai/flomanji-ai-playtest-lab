
import React from "react";
import { CardFormValues } from "@/types/forms/card-form";
import { Badge } from "@/components/ui/badge";

interface CardPreviewProps {
  card: CardFormValues;
  onSelect?: (card: CardFormValues) => void;
}

export function CardPreview({ card, onSelect = () => {} }: CardPreviewProps) {
  return (
    <div 
      className="border rounded-md p-4 hover:border-primary/50 cursor-pointer transition-colors"
      onClick={() => onSelect(card)}
    >
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-xl font-bold">{card.name}</h3>
          <div className="flex items-center gap-2">
            <Badge>{card.type}</Badge>
            {card.category && <Badge variant="outline">{card.category}</Badge>}
          </div>
        </div>

        {card.icons && card.icons.length > 0 && (
          <div className="space-y-1">
            <h4 className="text-sm font-medium">Icons</h4>
            <div className="flex flex-wrap gap-1">
              {card.icons.map((icon, i) => (
                <Badge variant="secondary" key={i}>
                  {icon.symbol}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {card.keywords && card.keywords.length > 0 && (
          <div className="space-y-1">
            <h4 className="text-sm font-medium">Keywords</h4>
            <div className="flex flex-wrap gap-1">
              {card.keywords.map((keyword, i) => (
                <Badge variant="outline" key={i}>
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {card.rules && card.rules.length > 0 && (
          <div className="space-y-1">
            <h4 className="text-sm font-medium">Rules</h4>
            <div className="bg-muted/50 p-2 rounded-md text-sm">
              {card.rules[0]}
            </div>
          </div>
        )}

        {card.flavor && (
          <div className="space-y-1">
            <h4 className="text-sm font-medium">Flavor Text</h4>
            <div className="italic text-sm">{card.flavor}</div>
          </div>
        )}

        {card.imagePrompt && (
          <div className="space-y-1">
            <h4 className="text-sm font-medium">Image Prompt</h4>
            <div className="text-sm text-muted-foreground">{card.imagePrompt}</div>
          </div>
        )}
      </div>
    </div>
  );
}
