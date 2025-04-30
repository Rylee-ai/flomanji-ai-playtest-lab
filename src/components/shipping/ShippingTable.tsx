
import React from "react";
import { format } from "date-fns";
import { TruckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import ShippingStatusBadge from "./ShippingStatusBadge";
import ShippingAddressBadge from "./ShippingAddressBadge";
import { ShippingEntry } from "@/hooks/shipping/types";

interface ShippingTableProps {
  entries: ShippingEntry[];
  onViewAddress: (entry: ShippingEntry) => void;
  onUpdateStatus: (entry: ShippingEntry) => void;
  hasAddress: (entry: ShippingEntry) => boolean;
}

/**
 * Component for displaying shipping entries in a table
 */
const ShippingTable = ({ 
  entries, 
  onViewAddress,
  onUpdateStatus,
  hasAddress
}: ShippingTableProps) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Shipping Address</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell className="font-medium">
                {entry.firstName} {entry.lastName}
              </TableCell>
              <TableCell>{entry.email}</TableCell>
              <TableCell>
                <ShippingStatusBadge status={entry.status} />
              </TableCell>
              <TableCell>
                <ShippingAddressBadge 
                  entry={entry} 
                  onView={onViewAddress}
                />
              </TableCell>
              <TableCell>{format(new Date(entry.updatedAt), 'MMM d, yyyy')}</TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onUpdateStatus(entry)}
                  disabled={!hasAddress(entry)}
                  className={!hasAddress(entry) ? "opacity-50 cursor-not-allowed" : ""}
                >
                  <TruckIcon className="h-4 w-4 mr-2" />
                  Update Status
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ShippingTable;
