
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

interface WaitlistHeaderProps {
  onRefresh: () => void;
  isRefreshing?: boolean;
}

/**
 * Header component for the Waitlist Manager page
 */
export const WaitlistHeader = ({ onRefresh, isRefreshing = false }: WaitlistHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold tracking-tight">Waitlist Manager</h1>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onRefresh} 
        disabled={isRefreshing}
      >
        <RefreshCcw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} /> 
        {isRefreshing ? 'Refreshing...' : 'Refresh'}
      </Button>
    </div>
  );
};
