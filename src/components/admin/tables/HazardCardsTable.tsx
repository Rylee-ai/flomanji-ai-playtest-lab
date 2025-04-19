
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
import { HazardCard } from "@/types/cards/hazard";

interface HazardCardsTableProps {
  cards: HazardCard[];
  onViewCard: (id: string) => void;
  onEditCard: (card: HazardCard) => void;
}

export const HazardCardsTable = ({ cards, onViewCard, onEditCard }: HazardCardsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Subtype</TableHead>
          <TableHead>Icons</TableHead>
          <TableHead>Keywords</TableHead>
          <TableHead>Fight DC</TableHead>
          <TableHead>Flee DC</TableHead>
          <TableHead>Boss?</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cards.map((card) => (
          <TableRow key={card.id}>
            <TableCell>{card.name}</TableCell>
            <TableCell>{card.subType}</TableCell>
            <TableCell>{card.icons.map(icon => icon.symbol).join(" ")}</TableCell>
            <TableCell>{card.keywords.join(", ")}</TableCell>
            <TableCell>{card.difficultyClasses.fight || "-"}</TableCell>
            <TableCell>{card.difficultyClasses.flee || "-"}</TableCell>
            <TableCell>{card.bossHazard ? "Yes" : "No"}</TableCell>
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
