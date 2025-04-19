
import React from "react";
import { Button } from "@/components/ui/button";
import { Eye, Pencil } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NPCCard } from "@/types/cards/npc";
import { Badge } from "@/components/ui/badge";

interface NPCCardsTableProps {
  cards: NPCCard[];
  onViewCard: (id: string) => void;
  onEditCard: (card: NPCCard) => void;
}

export const NPCCardsTable = ({ cards, onViewCard, onEditCard }: NPCCardsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Stats</TableHead>
          <TableHead>Actions</TableHead>
          <TableHead>Keywords</TableHead>
          <TableHead>Operations</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cards.map((card) => (
          <TableRow key={card.id}>
            <TableCell className="font-medium">{card.name}</TableCell>
            <TableCell>
              {card.icons.map(icon => (
                <span key={icon.symbol} title={icon.meaning} className="mr-1">
                  {icon.symbol}
                </span>
              ))}
            </TableCell>
            <TableCell>
              {card.checkDC ? `DC ${card.checkDC}` : "No check"}
            </TableCell>
            <TableCell>
              {card.actions && card.actions.length > 0 ? (
                <div className="flex flex-col gap-1">
                  {card.actions.map((action, idx) => (
                    <Badge key={idx} variant="outline" className="whitespace-nowrap">
                      {action.cost}🎲 - {action.description.substring(0, 15)}...
                    </Badge>
                  ))}
                </div>
              ) : (
                "No actions"
              )}
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {card.keywords.map((keyword, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell className="space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onViewCard(card.id)}
              >
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onEditCard(card)}
              >
                <Pencil className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </TableCell>
          </TableRow>
        ))}
        {cards.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
              No NPC character cards found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
