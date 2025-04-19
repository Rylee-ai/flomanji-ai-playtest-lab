
import React from 'react';
import { RegionCard } from '@/types/cards/region';
import { Badge } from "@/components/ui/badge";

interface RegionCardDisplayProps {
  card: RegionCard;
}

export const RegionCardDisplay: React.FC<RegionCardDisplayProps> = ({ card }) => {
  return (
    <div className="space-y-2">
      <div className="flex gap-1 mb-2">
        {card.biomeTags.map((tag, i) => (
          <Badge key={i} variant="outline">{tag}</Badge>
        ))}
      </div>
      <div>
        <p className="text-sm font-medium">On Enter:</p>
        <p className="text-sm">{card.onEnter}</p>
      </div>
      {card.rest && (
        <div>
          <p className="text-sm font-medium">Rest:</p>
          <p className="text-sm">{card.rest}</p>
        </div>
      )}
      {card.bonusZone && (
        <div>
          <p className="text-sm font-medium">Bonus Zone:</p>
          <p className="text-sm">{card.bonusZone}</p>
        </div>
      )}
    </div>
  );
};
