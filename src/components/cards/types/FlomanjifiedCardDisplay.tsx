
import React from 'react';
import { FlomanjifiedRoleCard } from '@/types/cards/flomanjified';
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Flag, Activity, Star, Shield } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface FlomanjifiedCardDisplayProps {
  card: FlomanjifiedRoleCard;
}

export const FlomanjifiedCardDisplay: React.FC<FlomanjifiedCardDisplayProps> = ({ card }) => {
  // Extract the first line of rules which usually contains the objective
  const objectiveText = card.rules.find(rule => rule.startsWith("Objective:"))?.replace("Objective:", "").trim();
  
  return (
    <div className="space-y-3">
      {card.originalRole && (
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">Was: {card.originalRole}</Badge>
        </div>
      )}

      <div className="rounded-md bg-secondary/10 p-3">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="objective" className="border-none">
            <AccordionTrigger className="py-2 hover:no-underline">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Flag className="h-4 w-4 text-primary" />
                <span>Objective</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm">
              {objectiveText || "No specific objective defined."}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <div className="rounded-md bg-primary/5 p-3">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-medium">Chaos Phase Action:</h3>
        </div>
        <p className="text-sm">{card.chaosAction}</p>
      </div>

      {card.specialAbility && (
        <div className="rounded-md bg-accent/10 p-3">
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium">Special Ability:</h3>
          </div>
          <p className="text-sm">{card.specialAbility}</p>
        </div>
      )}
      
      <Collapsible className="w-full">
        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md p-2 text-sm font-medium hover:bg-accent/10">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
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
