
import React from "react";
import { GameCard } from "@/types/cards";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { showSuccessToast } from "@/lib/toast";

interface DeleteCardDialogProps {
  cardToDelete: GameCard | null;
  onClose: () => void;
  onConfirm: (card: GameCard) => void;
}

export const DeleteCardDialog = ({
  cardToDelete,
  onClose,
  onConfirm,
}: DeleteCardDialogProps) => {
  const confirmDelete = () => {
    if (cardToDelete) {
      onConfirm(cardToDelete);
      showSuccessToast(`Deleted ${cardToDelete.name} successfully`);
    }
  };

  return (
    <AlertDialog open={!!cardToDelete} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Card</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete {cardToDelete?.name}? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
