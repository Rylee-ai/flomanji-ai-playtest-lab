
import React from "react";
import { Badge } from "@/components/ui/badge";
import { PlayerCharacterCard } from "@/types/cards/player-character";

interface CharacterInfoDisplayProps {
  card: PlayerCharacterCard;
}

export const CharacterInfoDisplay = ({ card }: CharacterInfoDisplayProps) => {
  return (
    <div className="space-y-2 mt-2">
      <div className="flex flex-wrap items-center justify-between gap-1">
        <Badge variant="secondary" className="font-medium text-xs">
          {card.role}
        </Badge>
        <Badge variant="outline" className="font-medium text-xs whitespace-nowrap">
          HP: {card.health}
        </Badge>
      </div>
      
      <div className="grid grid-cols-5 gap-1">
        <Badge variant="outline" className="text-xs px-1.5" title="Brawn">
          B:{card.stats.brawn}
        </Badge>
        <Badge variant="outline" className="text-xs px-1.5" title="Moxie">
          M:{card.stats.moxie}
        </Badge>
        <Badge variant="outline" className="text-xs px-1.5" title="Charm">
          C:{card.stats.charm}
        </Badge>
        <Badge variant="outline" className="text-xs px-1.5" title="Grit">
          G:{card.stats.grit}
        </Badge>
        <Badge variant="outline" className="text-xs px-1.5" title="Weird Sense">
          W:{card.stats.weirdSense}
        </Badge>
      </div>
      
      <div className="border-t border-muted pt-1 mt-1">
        <p className="text-xs font-semibold line-clamp-1" title={card.ability.name}>
          {card.ability.name}
        </p>
      </div>
    </div>
  );
};
