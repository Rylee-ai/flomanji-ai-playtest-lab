
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface ApiKeyMissingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ApiKeyMissingDialog = ({ open, onOpenChange }: ApiKeyMissingDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
            OpenRouter API Key Required
          </AlertDialogTitle>
          <AlertDialogDescription>
            <p className="mb-4">
              To use the AI Card Assistant, you need to set up your OpenRouter API key in the Settings page.
            </p>
            <p className="text-sm text-muted-foreground">
              An OpenRouter API key allows you to access various AI models for generating card content.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-end">
          <Button onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
