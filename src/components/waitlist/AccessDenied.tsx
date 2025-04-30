
import { AlertCircle } from "lucide-react";

/**
 * Component displayed when a non-admin user tries to access the waitlist manager
 */
export const AccessDenied = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
      <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
      <p className="text-center text-muted-foreground mb-4">
        You don't have permission to access the Waitlist Manager.
      </p>
    </div>
  );
};
