
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { InfoCircle } from "lucide-react";

export const FileBasedModeNotice: React.FC = () => {
  return (
    <Alert className="mb-4">
      <InfoCircle className="h-4 w-4" />
      <AlertTitle>File-Based Mode Active</AlertTitle>
      <AlertDescription>
        The content manager is running in file-based mode. Cards are loaded from 
        static files in the codebase. Edit operations will be simulated but won't
        persist changes. For real updates, modify the card files directly in the code.
      </AlertDescription>
    </Alert>
  );
};
