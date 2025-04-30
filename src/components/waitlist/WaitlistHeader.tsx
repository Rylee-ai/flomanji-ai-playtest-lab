
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

interface WaitlistHeaderProps {
  onRefresh: () => void;
}

/**
 * Header component for the Waitlist Manager page
 */
export const WaitlistHeader = ({ onRefresh }: WaitlistHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold tracking-tight">Waitlist Manager</h1>
      <Button variant="outline" size="sm" onClick={onRefresh}>
        <RefreshCcw className="h-4 w-4 mr-2" /> Refresh
      </Button>
    </div>
  );
};
