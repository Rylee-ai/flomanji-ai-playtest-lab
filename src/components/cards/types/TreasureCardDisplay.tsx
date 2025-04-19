
import React from 'react';
import { TreasureCard } from '@/types/cards';
import { Badge } from "@/components/ui/badge";

interface TreasureCardDisplayProps {
  card: TreasureCard;
}

export const TreasureCardDisplay: React.FC<TreasureCardDisplayProps> = ({ card }) => {
  return (
    <div className="space-y-2">
      {card.value && <Badge variant="secondary">Value: {card.value}</Badge>}
      {card.consumable && <Badge variant="outline">Consumable</Badge>}
      {card.useEffect && (
        <div className="mt-2">
          <p className="text-sm font-medium">Use Effect:</p>
          <p className="text-sm">{card.useEffect}</p>
        </div>
      )}
      {card.passiveEffect && (
        <div className="mt-2">
          <p className="text-sm font-medium">Passive Effect:</p>
          <p className="text-sm">{card.passiveEffect}</p>
        </div>
      )}
    </div>
  );
};
