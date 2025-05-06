
import React from "react";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash } from "lucide-react";
import { GameCard } from "@/types/cards";
import { CardFooter } from "@/components/ui/card";

interface CardActionsProps {
  card: GameCard;
  onViewCard: (id: string) => void;
  onEditCard: (card: GameCard) => void;
  onDeleteCard: (card: GameCard) => void;
}

export const CardActions = ({ 
  card, 
  onViewCard, 
  onEditCard, 
  onDeleteCard 
}: CardActionsProps) => {
  return (
    <CardFooter className="flex flex-col sm:flex-row gap-2 p-3 pt-0">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => onViewCard(card.id)}
        className="w-full sm:flex-1 h-8"
      >
        <Eye className="h-3.5 w-3.5 mr-1" />
        View
      </Button>
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onEditCard(card)}
        className="w-full sm:flex-1 h-8"
      >
        <Pencil className="h-3.5 w-3.5 mr-1" />
        Edit
      </Button>
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onDeleteCard(card)}
        className="w-full sm:flex-1 h-8 text-destructive hover:bg-destructive hover:text-destructive-foreground"
      >
        <Trash className="h-3.5 w-3.5 mr-1" />
        Delete
      </Button>
    </CardFooter>
  );
};
