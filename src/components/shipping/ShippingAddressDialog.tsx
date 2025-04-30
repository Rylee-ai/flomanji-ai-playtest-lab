
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShippingEntry } from "@/hooks/shipping/types";

interface ShippingAddressDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedEntry: ShippingEntry | null;
}

/**
 * Dialog component for viewing a shipping address
 */
const ShippingAddressDialog = ({ open, onOpenChange, selectedEntry }: ShippingAddressDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Shipping Address</DialogTitle>
          <DialogDescription>
            Address for {selectedEntry?.firstName} {selectedEntry?.lastName}
          </DialogDescription>
        </DialogHeader>
        {selectedEntry?.address && (
          <div className="p-4 border rounded-md bg-gray-50">
            <p className="mb-1">{selectedEntry.firstName} {selectedEntry.lastName}</p>
            <p className="mb-1">{selectedEntry.address.street}</p>
            {selectedEntry.address.apartment && <p className="mb-1">{selectedEntry.address.apartment}</p>}
            <p className="mb-1">{selectedEntry.address.city}, {selectedEntry.address.state} {selectedEntry.address.postalCode}</p>
            <p>{selectedEntry.address.country}</p>
          </div>
        )}
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShippingAddressDialog;
