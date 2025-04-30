
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShippingEntry } from "@/hooks/shipping/types";

interface ShippingStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedEntry: ShippingEntry | null;
  status: "pending" | "processing" | "shipped" | "delivered";
  setStatus: (status: "pending" | "processing" | "shipped" | "delivered") => void;
  trackingNumber: string;
  setTrackingNumber: (trackingNumber: string) => void;
  trackingUrl: string;
  setTrackingUrl: (trackingUrl: string) => void;
  onSave: () => Promise<void>;
}

/**
 * Dialog component for updating shipping status
 */
const ShippingStatusDialog = ({
  open,
  onOpenChange,
  selectedEntry,
  status,
  setStatus,
  trackingNumber,
  setTrackingNumber,
  trackingUrl,
  setTrackingUrl,
  onSave,
}: ShippingStatusDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Update Shipping Status</DialogTitle>
          <DialogDescription>
            Update the shipping status for {selectedEntry?.firstName} {selectedEntry?.lastName}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="status">Shipping Status</Label>
            <Select 
              value={status} 
              onValueChange={(value: "pending" | "processing" | "shipped" | "delivered") => setStatus(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {status === "shipped" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="trackingNumber">Tracking Number</Label>
                <Input
                  id="trackingNumber"
                  placeholder="e.g., 1Z999AA10123456784"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trackingUrl">Tracking URL (Optional)</Label>
                <Input
                  id="trackingUrl"
                  placeholder="https://tracking.carrier.com/track?number=123456789"
                  value={trackingUrl}
                  onChange={(e) => setTrackingUrl(e.target.value)}
                />
              </div>
            </>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShippingStatusDialog;
