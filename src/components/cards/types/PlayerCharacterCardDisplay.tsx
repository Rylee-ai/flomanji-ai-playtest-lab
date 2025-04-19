
import React from 'react';
import { PlayerCharacterCard } from '@/types/cards/player-character';
import { Badge } from "@/components/ui/badge";

interface PlayerCharacterCardDisplayProps {
  card: PlayerCharacterCard;
}

export const PlayerCharacterCardDisplay: React.FC<PlayerCharacterCardDisplayProps> = ({ card }) => {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm font-medium">Role:</p>
        <p className="text-sm">{card.role}</p>
      </div>
      
      <div>
        <p className="text-sm font-medium">Stats:</p>
        <div className="flex flex-wrap gap-2 mt-1">
          <Badge variant="outline">Brawn {card.stats.brawn}</Badge>
          <Badge variant="outline">Moxie {card.stats.moxie}</Badge>
          <Badge variant="outline">Charm {card.stats.charm}</Badge>
          <Badge variant="outline">Grit {card.stats.grit}</Badge>
          <Badge variant="outline">Weird {card.stats.weirdSense}</Badge>
        </div>
      </div>
      
      <div>
        <p className="text-sm font-medium">Ability:</p>
        <p className="text-sm font-semibold">{card.ability.name}</p>
        <p className="text-sm">{card.ability.description}</p>
      </div>
      
      <div className="flex gap-6">
        <div>
          <p className="text-sm font-medium">Health: {card.health}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Weirdness: {card.weirdness}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Luck: {card.luck}</p>
        </div>
      </div>
      
      {card.starterGear && card.starterGear.length > 0 && (
        <div>
          <p className="text-sm font-medium">Starter Gear:</p>
          <div className="space-y-1 mt-1">
            {card.starterGear.map((gear, i) => (
              <div key={i} className="text-sm">
                <p><span className="font-medium">{gear.name}</span> ({gear.type})</p>
                <p className="text-xs">{gear.effect}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
