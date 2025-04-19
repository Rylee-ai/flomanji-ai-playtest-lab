
import React from 'react';
import { GearCard } from '@/types/cards/gear';
import { Badge } from "@/components/ui/badge";

interface GearCardDisplayProps {
  card: GearCard;
}

export const GearCardDisplay: React.FC<GearCardDisplayProps> = ({ card }) => {
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        {card.consumable && <Badge variant="outline">Consumable</Badge>}
        {card.category && <Badge variant="secondary">{card.category}</Badge>}
      </div>
      {card.statBonus && (
        <Badge variant="secondary">
          +{card.statBonus.value} {card.statBonus.stat}
        </Badge>
      )}
      {card.passive && (
        <div className="mt-2">
          <p className="text-sm font-medium">Passive Effect:</p>
          <p className="text-sm">{card.passive}</p>
        </div>
      )}
    </div>
  );
};
