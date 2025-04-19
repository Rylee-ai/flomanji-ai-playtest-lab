
import React from 'react';
import { HazardCard } from '@/types/cards/hazard';
import { Badge } from "@/components/ui/badge";

interface HazardCardDisplayProps {
  card: HazardCard;
}

export const HazardCardDisplay: React.FC<HazardCardDisplayProps> = ({ card }) => {
  return (
    <div className="space-y-2">
      {card.bossHazard && (
        <Badge variant="destructive">BOSS HAZARD</Badge>
      )}
      <div className="grid grid-cols-2 gap-2 mt-2">
        {card.difficultyClasses.fight && (
          <Badge variant="secondary">Fight DC: {card.difficultyClasses.fight}</Badge>
        )}
        {card.difficultyClasses.flee && (
          <Badge variant="secondary">Flee DC: {card.difficultyClasses.flee}</Badge>
        )}
        {card.difficultyClasses.negotiate && (
          <Badge variant="secondary">Negotiate DC: {card.difficultyClasses.negotiate}</Badge>
        )}
        {card.difficultyClasses.outsmart && (
          <Badge variant="secondary">Outsmart DC: {card.difficultyClasses.outsmart}</Badge>
        )}
      </div>
      <div className="mt-2">
        <p className="text-sm font-medium">On Failure:</p>
        <p className="text-sm">{card.onFailure}</p>
      </div>
      {card.onSuccess && (
        <div className="mt-2">
          <p className="text-sm font-medium">On Success:</p>
          <p className="text-sm">{card.onSuccess}</p>
        </div>
      )}
    </div>
  );
};
