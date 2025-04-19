
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
import { FlomanjifiedRoleCard } from "@/types/cards/flomanjified";

interface FlomanjifiedCardsTableProps {
  cards: FlomanjifiedRoleCard[];
  onViewCard: (id: string) => void;
  onEditCard: (card: FlomanjifiedRoleCard) => void;
}

export const FlomanjifiedCardsTable = ({ cards, onViewCard, onEditCard }: FlomanjifiedCardsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Original Role</TableHead>
          <TableHead>Icons</TableHead>
          <TableHead>Keywords</TableHead>
          <TableHead>Special Ability</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cards.map((card) => (
          <TableRow key={card.id}>
            <TableCell>{card.name}</TableCell>
            <TableCell>{card.originalRole || "-"}</TableCell>
            <TableCell>{card.icons.map(icon => icon.symbol).join(" ")}</TableCell>
            <TableCell>{card.keywords.join(", ")}</TableCell>
            <TableCell>{card.specialAbility || "-"}</TableCell>
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
