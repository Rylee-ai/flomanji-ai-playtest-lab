
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";

interface RulesEditorProps {
  editedRules: string;
  setEditedRules: (rules: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

const RulesEditor = ({ editedRules, setEditedRules, onSave, onCancel }: RulesEditorProps) => {
  return (
    <div className="space-y-4">
      <Textarea 
        value={editedRules}
        onChange={(e) => setEditedRules(e.target.value)}
        className="min-h-[600px] font-mono"
      />
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSave}>
          Save Rules
        </Button>
      </div>
    </div>
  );
};

export default RulesEditor;
