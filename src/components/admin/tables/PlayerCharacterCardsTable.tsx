
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
import { PlayerCharacterCard } from "@/types/cards/player-character";
import { Badge } from "@/components/ui/badge";

interface PlayerCharacterCardsTableProps {
  cards: PlayerCharacterCard[];
  onViewCard: (id: string) => void;
  onEditCard: (card: PlayerCharacterCard) => void;
}

export const PlayerCharacterCardsTable = ({ cards, onViewCard, onEditCard }: PlayerCharacterCardsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Stats</TableHead>
          <TableHead>Ability</TableHead>
          <TableHead>Starter Gear</TableHead>
          <TableHead>Operations</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cards.map((card) => (
          <TableRow key={card.id}>
            <TableCell className="font-medium">{card.name}</TableCell>
            <TableCell>{card.role}</TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline" className="text-xs">B:{card.stats.brawn}</Badge>
                <Badge variant="outline" className="text-xs">M:{card.stats.moxie}</Badge>
                <Badge variant="outline" className="text-xs">C:{card.stats.charm}</Badge>
                <Badge variant="outline" className="text-xs">G:{card.stats.grit}</Badge>
                <Badge variant="outline" className="text-xs">W:{card.stats.weirdSense}</Badge>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="secondary">{card.ability.name}</Badge>
            </TableCell>
            <TableCell>
              {card.starterGear.slice(0, 2).map((gear, idx) => (
                <Badge key={idx} variant="outline" className="mr-1 text-xs">
                  {gear.name}
                </Badge>
              ))}
              {card.starterGear.length > 2 && <span>+{card.starterGear.length - 2} more</span>}
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
              No player character cards found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
