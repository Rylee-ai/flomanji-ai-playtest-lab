
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CardFormDialogHeader } from "./CardFormDialogHeader";
import { GameCard } from "@/types/cards";

interface CardFormDialogProps {
  open: boolean;
  onClose: () => void;
  isEditing: boolean;
  initialData?: GameCard;
  children: React.ReactNode;
}

export const CardFormDialog = ({
  open,
  onClose,
  isEditing,
  initialData,
  children,
}: CardFormDialogProps) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
      <CardFormDialogHeader isEditing={isEditing} initialData={initialData} />
      {children}
    </DialogContent>
  </Dialog>
);
