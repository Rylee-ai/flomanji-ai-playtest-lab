
import React from "react";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { GameCard } from "@/types/cards";

interface CardFormDialogHeaderProps {
  isEditing: boolean;
  initialData?: GameCard;
}

export const CardFormDialogHeader = ({ isEditing, initialData }: CardFormDialogHeaderProps) => (
  <DialogHeader>
    <DialogTitle>{isEditing ? `Edit ${initialData?.name}` : "Create Card"}</DialogTitle>
    <DialogDescription>
      {isEditing ? "Update the card's properties." : "Add a new card to the game."}
    </DialogDescription>
  </DialogHeader>
);
