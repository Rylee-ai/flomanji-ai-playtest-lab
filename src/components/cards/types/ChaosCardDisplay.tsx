
import React from 'react';
import { ChaosCard } from '@/types/cards/chaos';
import { Badge } from "@/components/ui/badge";

interface ChaosCardDisplayProps {
  card: ChaosCard;
}

export const ChaosCardDisplay: React.FC<ChaosCardDisplayProps> = ({ card }) => {
  return (
    <div className="space-y-2">
      {card.heatEffect && (
        <Badge variant="destructive">Heat +{card.heatEffect}</Badge>
      )}
      {card.duration && (
        <Badge variant="outline">{card.duration}</Badge>
      )}
      <div className="mt-2">
        <p className="text-sm font-medium">Global Effect:</p>
        <p className="text-sm">{card.globalEffect}</p>
      </div>
    </div>
  );
};
