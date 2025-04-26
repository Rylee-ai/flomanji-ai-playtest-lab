
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
import { RegionCard } from "@/types/cards/region";

interface RegionCardsTableProps {
  cards: RegionCard[];
  onViewCard: (id: string) => void;
  onEditCard: (card: RegionCard) => void;
  onDeleteCard: (card: RegionCard) => void;
}

export const RegionCardsTable = ({ cards, onViewCard, onEditCard, onDeleteCard }: RegionCardsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Biome Tags</TableHead>
          <TableHead>Icons</TableHead>
          <TableHead>Keywords</TableHead>
          <TableHead>Has Action?</TableHead>
          <TableHead>Has Rest?</TableHead>
          <TableHead>Has Bonus?</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cards.map((card) => (
          <TableRow key={card.id}>
            <TableCell>{card.name}</TableCell>
            <TableCell>{card.biomeTags.join(" ")}</TableCell>
            <TableCell>{card.icons.map(icon => icon.symbol).join(" ")}</TableCell>
            <TableCell>{card.keywords.join(", ")}</TableCell>
            <TableCell>{card.action ? "Yes" : "No"}</TableCell>
            <TableCell>{card.rest ? "Yes" : "No"}</TableCell>
            <TableCell>{card.bonusZone ? "Yes" : "No"}</TableCell>
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
