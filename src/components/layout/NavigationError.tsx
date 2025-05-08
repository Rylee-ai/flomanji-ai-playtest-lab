
import React from "react";
import { AlertCircle } from "lucide-react";

interface NavigationErrorProps {
  errorMessage: string | null;
}

const NavigationError: React.FC<NavigationErrorProps> = ({ errorMessage }) => {
  if (!errorMessage) return null;
  
  return (
    <div className="bg-red-900/20 border border-red-500/50 text-white p-4 flex gap-2">
      <AlertCircle className="h-5 w-5 text-red-500" />
      <div className="flex-1">
        <h3 className="font-medium">Navigation error</h3>
        <p className="text-sm">{errorMessage}</p>
        <p className="text-xs text-red-300 mt-1">
          Current path: {window.location.pathname}
        </p>
      </div>
    </div>
  );
};

export default NavigationError;
