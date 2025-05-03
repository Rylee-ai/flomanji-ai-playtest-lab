
import React from "react";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const CardImportDialogHeader = () => {
  return (
    <DialogHeader>
      <DialogTitle>Import Cards</DialogTitle>
      <DialogDescription>
        Import cards from JSON files or transform external card data.
      </DialogDescription>
    </DialogHeader>
  );
};
