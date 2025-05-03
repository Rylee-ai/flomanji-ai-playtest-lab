
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
import { Trash2 } from "lucide-react";

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
          <AlertDialogTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-destructive" />
            Delete {cardToDelete?.name}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this card? This action cannot be undone.
            <div className="mt-2 p-3 bg-muted rounded-md">
              <div className="font-medium">{cardToDelete?.name}</div>
              <div className="text-sm text-muted-foreground">Type: {cardToDelete?.type}</div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={confirmDelete} 
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
