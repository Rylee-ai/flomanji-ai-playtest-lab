
import React from 'react';
import { GameCard } from '@/types/cards';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { TreasureCardDisplay } from './types/TreasureCardDisplay';
import { SecretCardDisplay } from './types/SecretCardDisplay';
import { AutomaCardDisplay } from './types/AutomaCardDisplay';
import { RegionCardDisplay } from './types/RegionCardDisplay';
import { HazardCardDisplay } from './types/HazardCardDisplay';
import { GearCardDisplay } from './types/GearCardDisplay';
import { NPCCardDisplay } from './types/NPCCardDisplay';
import { ChaosCardDisplay } from './types/ChaosCardDisplay';
import { FlomanjifiedCardDisplay } from './types/FlomanjifiedCardDisplay';

interface CardDisplayProps {
  card: GameCard;
  showDetails?: boolean;
}

export const CardDisplay = ({ card, showDetails = true }: CardDisplayProps) => {
  const renderCardTypeSpecificDetails = () => {
    if (!showDetails) return null;

    switch (card.type) {
      case 'treasure':
      case 'artifact':
        return <TreasureCardDisplay card={card} />;
      case 'secret':
        return <SecretCardDisplay card={card} />;
      case 'automa':
        return <AutomaCardDisplay card={card} />;
      case 'region':
        return <RegionCardDisplay card={card} />;
      case 'hazard':
        return <HazardCardDisplay card={card} />;
      case 'gear':
        return <GearCardDisplay card={card} />;
      case 'npc':
        return <NPCCardDisplay card={card} />;
      case 'chaos':
        return <ChaosCardDisplay card={card} />;
      case 'flomanjified':
        return <FlomanjifiedCardDisplay card={card} />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-[350px] h-[500px] relative overflow-y-auto">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{card.name}</CardTitle>
          <div className="flex gap-1">
            {card.icons.map((icon, i) => (
              <span key={i} title={icon.meaning} className="text-lg">{icon.symbol}</span>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mt-1">
          {card.keywords.map((keyword, i) => (
            <Badge key={i} variant="outline" className="text-xs">
              {keyword}
            </Badge>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {renderCardTypeSpecificDetails()}
        
        {showDetails && card.rules.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Rules:</p>
            {card.rules.map((rule, i) => (
              <p key={i} className="text-sm">{rule}</p>
            ))}
          </div>
        )}
      </CardContent>
      
      {showDetails && card.flavor && (
        <CardFooter className="absolute bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t">
          <p className="italic text-sm text-muted-foreground">
            {card.flavor}
          </p>
        </CardFooter>
      )}
    </Card>
  );
};
