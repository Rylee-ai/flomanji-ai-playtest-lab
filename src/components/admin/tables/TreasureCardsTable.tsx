
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GameCard } from "@/types/cards";
import { TreasureCard } from "@/types/cards/treasure";
import { Badge } from "@/components/ui/badge";
import { CardActions } from "@/components/admin/cards/components/CardActions";

interface TreasureCardsTableProps {
  cards: GameCard[];
  onViewCard: (id: string) => void;
  onEditCard: (card: GameCard) => void;
  onDeleteCard: (card: GameCard) => void;
}

export const TreasureCardsTable = ({
  cards,
  onViewCard,
  onEditCard,
  onDeleteCard,
}: TreasureCardsTableProps) => {
  return (
    <div className="overflow-auto border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Consumable</TableHead>
            <TableHead className="w-[300px]">Effect</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cards.map((card) => {
            const treasureCard = card as TreasureCard;
            return (
              <TableRow key={card.id}>
                <TableCell className="font-medium">{card.name}</TableCell>
                <TableCell>
                  <Badge variant={treasureCard.type === "artifact" ? "secondary" : "outline"}>
                    {treasureCard.type === "artifact" ? "Artifact" : "Treasure"}
                  </Badge>
                </TableCell>
                <TableCell>{treasureCard.value || "-"}</TableCell>
                <TableCell>
                  {treasureCard.consumable ? (
                    <Badge variant="default">Consumable</Badge>
                  ) : (
                    "No"
                  )}
                </TableCell>
                <TableCell className="text-sm max-w-[300px] truncate">
                  {treasureCard.passiveEffect || treasureCard.useEffect || "-"}
                </TableCell>
                <TableCell className="text-right">
                  <CardActions
                    card={card}
                    onViewCard={onViewCard}
                    onEditCard={onEditCard}
                    onDeleteCard={onDeleteCard}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
