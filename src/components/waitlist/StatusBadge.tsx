
import { Badge } from "@/components/ui/badge";

type StatusType = 'pending' | 'approved' | 'rejected';

interface StatusBadgeProps {
  status: StatusType;
}

/**
 * Renders a styled badge for waitlist entry status
 */
export const StatusBadge = ({ status }: StatusBadgeProps) => {
  switch (status) {
    case 'pending':
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
    case 'approved':
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approved</Badge>;
    case 'rejected':
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>;
  }
};
