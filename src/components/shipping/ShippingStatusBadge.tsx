
import React from "react";
import { Badge } from "@/components/ui/badge";

interface ShippingStatusBadgeProps {
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
}

/**
 * Component for displaying shipping status badges with appropriate styling
 */
const ShippingStatusBadge = ({ status }: ShippingStatusBadgeProps) => {
  switch (status) {
    case 'pending':
      return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Pending</Badge>;
    case 'processing':
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Processing</Badge>;
    case 'shipped':
      return <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">Shipped</Badge>;
    case 'delivered':
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Delivered</Badge>;
  }
};

export default ShippingStatusBadge;
