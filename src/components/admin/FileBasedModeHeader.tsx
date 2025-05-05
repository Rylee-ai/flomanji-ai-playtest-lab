
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { FileBasedModeNotice } from "./FileBasedModeNotice";

export const FileBasedModeHeader: React.FC = () => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Content Manager</h1>
      <p className="text-muted-foreground mb-4">
        Manage your Flomanji game cards - create, edit, and organize all card types
      </p>
      <FileBasedModeNotice />
    </div>
  );
};
