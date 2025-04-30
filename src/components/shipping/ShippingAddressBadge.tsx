
import React from "react";
import { Badge } from "@/components/ui/badge";
import { MapPinIcon } from "lucide-react";
import { ShippingEntry } from "@/hooks/shipping/types";

interface ShippingAddressBadgeProps {
  entry: ShippingEntry;
  onView: (entry: ShippingEntry) => void;
}

/**
 * Component for displaying address availability badge
 */
const ShippingAddressBadge = ({ entry, onView }: ShippingAddressBadgeProps) => {
  const hasAddress = !!entry.address;

  if (hasAddress) {
    return (
      <Badge 
        variant="outline" 
        className="bg-green-50 text-green-700 border-green-200 cursor-pointer"
        onClick={() => onView(entry)}
      >
        <MapPinIcon className="h-3 w-3 mr-1" /> Address on file
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
      No address
    </Badge>
  );
};

export default ShippingAddressBadge;
