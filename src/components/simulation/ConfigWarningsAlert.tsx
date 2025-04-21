
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface ConfigWarningsAlertProps {
  validationErrors: string[];
}

const ConfigWarningsAlert: React.FC<ConfigWarningsAlertProps> = ({ validationErrors }) => {
  if (validationErrors.length === 0) return null;
  return (
    <Alert variant="warning">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Configuration Warnings</AlertTitle>
      <AlertDescription>
        <ul className="list-disc pl-5 mt-2">
          {validationErrors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
};

export default ConfigWarningsAlert;
