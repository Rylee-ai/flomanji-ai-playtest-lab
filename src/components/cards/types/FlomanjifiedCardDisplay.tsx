
import React from 'react';
import { FlomanjifiedRoleCard } from '@/types/cards/flomanjified';
import { Badge } from "@/components/ui/badge";

interface FlomanjifiedCardDisplayProps {
  card: FlomanjifiedRoleCard;
}

export const FlomanjifiedCardDisplay: React.FC<FlomanjifiedCardDisplayProps> = ({ card }) => {
  return (
    <div className="space-y-2">
      {card.originalRole && (
        <Badge variant="outline">Was: {card.originalRole}</Badge>
      )}
      <div className="mt-2">
        <p className="text-sm font-medium">Chaos Action:</p>
        <p className="text-sm">{card.chaosAction}</p>
      </div>
      {card.specialAbility && (
        <div className="mt-2">
          <p className="text-sm font-medium">Special Ability:</p>
          <p className="text-sm">{card.specialAbility}</p>
        </div>
      )}
    </div>
  );
};
