
import React from 'react';
import { AutomaCard } from '@/types/cards';
import { Badge } from "@/components/ui/badge";

interface AutomaCardDisplayProps {
  card: AutomaCard;
}

export const AutomaCardDisplay: React.FC<AutomaCardDisplayProps> = ({ card }) => {
  return (
    <div className="space-y-2">
      {card.combatBonus && (
        <Badge variant="secondary">Combat: +{card.combatBonus}</Badge>
      )}
      {card.movement && (
        <div className="mt-2">
          <p className="text-sm font-medium">Movement:</p>
          <p className="text-sm">{card.movement}</p>
        </div>
      )}
      {card.specialEffect && (
        <div className="mt-2">
          <p className="text-sm font-medium">Special Effect:</p>
          <p className="text-sm">{card.specialEffect}</p>
        </div>
      )}
    </div>
  );
};
