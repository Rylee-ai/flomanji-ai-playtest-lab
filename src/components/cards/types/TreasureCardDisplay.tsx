
import React from 'react';
import { TreasureCard } from '@/types/cards/treasure';
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Coin, Shield, PocketKnife } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface TreasureCardDisplayProps {
  card: TreasureCard;
}

export const TreasureCardDisplay: React.FC<TreasureCardDisplayProps> = ({ card }) => {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={card.type === "artifact" ? "secondary" : "outline"}>
          {card.type === "artifact" ? "Artifact" : "Treasure"}
        </Badge>
        {card.value && <Badge variant="outline">Value: {card.value}</Badge>}
        {card.consumable && <Badge variant="outline">Consumable</Badge>}
      </div>

      <div className="rounded-md bg-primary/5 p-3">
        {card.passiveEffect && (
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-medium">Passive Effect:</h3>
            </div>
            <p className="text-sm">{card.passiveEffect}</p>
          </div>
        )}
        
        {card.useEffect && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <PocketKnife className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-medium">Use Effect:</h3>
            </div>
            <p className="text-sm">{card.useEffect}</p>
          </div>
        )}
      </div>
      
      <Collapsible className="w-full">
        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md p-2 text-sm font-medium hover:bg-accent/10">
          <div className="flex items-center gap-2">
            <Coin className="h-4 w-4" />
            <span>Detailed Rules</span>
          </div>
          <span className="text-xs text-muted-foreground">Click to expand</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 space-y-2">
          {card.rules.map((rule, index) => (
            <p key={index} className="text-sm">
              {rule}
            </p>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
