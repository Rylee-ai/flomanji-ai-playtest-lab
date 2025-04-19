
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
          <TableHead>Icons</TableHead>
          <TableHead>Keywords</TableHead>
          <TableHead>Check DC</TableHead>
          <TableHead>Actions Count</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cards.map((card) => (
          <TableRow key={card.id}>
            <TableCell>{card.name}</TableCell>
            <TableCell>{card.icons.map(icon => icon.symbol).join(" ")}</TableCell>
            <TableCell>{card.keywords.join(", ")}</TableCell>
            <TableCell>{card.checkDC || "-"}</TableCell>
            <TableCell>{card.actions.length}</TableCell>
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
      </TableBody>
    </Table>
  );
};
