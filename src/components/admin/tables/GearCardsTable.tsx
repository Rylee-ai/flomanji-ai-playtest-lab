
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GearCard } from "@/types/cards/gear";

interface GearCardsTableProps {
  cards: GearCard[];
  onViewCard: (id: string) => void;
}

export const GearCardsTable = ({ cards, onViewCard }: GearCardsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Keywords</TableHead>
          <TableHead>Consumable</TableHead>
          <TableHead>Stat Bonus</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cards.map((card) => (
          <TableRow key={card.id}>
            <TableCell>{card.name}</TableCell>
            <TableCell>{card.keywords.join(", ")}</TableCell>
            <TableCell>{card.consumable ? "Yes" : "No"}</TableCell>
            <TableCell>
              {card.statBonus ? `${card.statBonus.stat} +${card.statBonus.value}` : "-"}
            </TableCell>
            <TableCell>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onViewCard(card.id)}
              >
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
