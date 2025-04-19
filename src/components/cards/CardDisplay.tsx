
import React from 'react';
import { GameCard } from '@/types/cards';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CardDisplayProps {
  card: GameCard;
  showDetails?: boolean;
}

export const CardDisplay = ({ card, showDetails = true }: CardDisplayProps) => {
  return (
    <Card className="w-[300px] h-[400px] relative">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{card.name}</CardTitle>
          <div className="flex gap-1">
            {card.icons.map((icon, i) => (
              <span key={i} title={icon.meaning}>{icon.symbol}</span>
            ))}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="text-sm font-medium">
          {card.keywords.join(' · ')}
        </div>
        
        {showDetails && (
          <>
            <div className="space-y-2">
              {card.rules.map((rule, i) => (
                <p key={i} className="text-sm">{rule}</p>
              ))}
            </div>
            
            <div className="absolute bottom-4 left-4 right-4 italic text-sm text-muted-foreground">
              {card.flavor}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
