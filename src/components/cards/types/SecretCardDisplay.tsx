
import React from 'react';
import { SecretObjectiveCard } from '@/types/cards';
import { Badge } from "@/components/ui/badge";

interface SecretCardDisplayProps {
  card: SecretObjectiveCard;
}

export const SecretCardDisplay: React.FC<SecretCardDisplayProps> = ({ card }) => {
  return (
    <div className="space-y-2">
      <Badge variant={card.alignment === 'saboteur' ? 'destructive' : 'secondary'}>
        {card.alignment}
      </Badge>
      <div className="mt-2">
        <p className="text-sm font-medium">Win Condition:</p>
        <p className="text-sm">{card.winCondition}</p>
      </div>
    </div>
  );
};
