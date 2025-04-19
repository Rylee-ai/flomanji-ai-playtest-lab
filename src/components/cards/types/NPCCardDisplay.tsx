
import React from 'react';
import { NPCCard } from '@/types/cards/npc';
import { Badge } from "@/components/ui/badge";

interface NPCCardDisplayProps {
  card: NPCCard;
}

export const NPCCardDisplay: React.FC<NPCCardDisplayProps> = ({ card }) => {
  return (
    <div className="space-y-2">
      {card.checkDC && (
        <Badge variant="secondary">Check DC: {card.checkDC}</Badge>
      )}
      {card.actions && card.actions.length > 0 && (
        <div className="mt-2">
          <p className="text-sm font-medium">Actions:</p>
          <div className="space-y-1">
            {card.actions.map((action, i) => (
              <div key={i} className="text-sm">
                <p className="font-medium">{action.description} ({action.cost} Action)</p>
                <p className="text-xs">{action.effect}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
