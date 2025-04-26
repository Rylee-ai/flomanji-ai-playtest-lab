
import React from "react";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChaosCard } from "@/types/cards/chaos";

interface ChaosCardsTableProps {
  cards: ChaosCard[];
  onViewCard: (id: string) => void;
  onEditCard: (card: ChaosCard) => void;
  onDeleteCard: (card: ChaosCard) => void;
}

export const ChaosCardsTable = ({ cards, onViewCard, onEditCard, onDeleteCard }: ChaosCardsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Keywords</TableHead>
          <TableHead>Heat Effect</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cards.map((card) => (
          <TableRow key={card.id}>
            <TableCell>{card.name}</TableCell>
            <TableCell>{card.keywords.join(", ")}</TableCell>
            <TableCell>{card.heatEffect ? `+${card.heatEffect}` : "-"}</TableCell>
            <TableCell>{card.duration || "immediate"}</TableCell>
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
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onDeleteCard(card)}
                className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <Trash className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
