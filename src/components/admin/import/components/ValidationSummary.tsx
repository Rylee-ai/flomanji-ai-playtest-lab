
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";

export function ValidationSummary({ validationErrors, transformedCards, fileType }) {
  if (validationErrors.length === 0 && transformedCards.length === 0) {
    return null;
  }

  if (validationErrors.length > 0) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Validation Failed</AlertTitle>
        <AlertDescription>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </AlertDescription>
      </Alert>
    );
  }

  if (transformedCards.length > 0) {
    return (
      <Alert variant="success" className="bg-green-50 border-green-200">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-800">Success</AlertTitle>
        <AlertDescription className="text-green-700">
          {transformedCards.length} card{transformedCards.length !== 1 ? 's' : ''} ready to import.
          {fileType && <span className="block text-xs mt-1">File format: {fileType}</span>}
        </AlertDescription>
      </Alert>
    );
  }

  return null;
}
