
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface AccessDeniedProps {
  message?: string;
}

/**
 * Displayed when a user doesn't have access to a page
 */
export const AccessDenied = ({ message = "You don't have permission to access this page." }: AccessDeniedProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
      <div className="w-16 h-16 mb-4 text-red-500">
        <AlertCircle className="w-full h-full" />
      </div>
      <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
      <p className="text-muted-foreground mb-6">{message}</p>
      <div className="space-x-4">
        <Button variant="outline" onClick={() => navigate("/dashboard")}>
          Go to Dashboard
        </Button>
        <Button onClick={() => navigate("/")}>
          Go to Home
        </Button>
      </div>
    </div>
  );
};
