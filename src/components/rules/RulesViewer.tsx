
import React from "react";
import { parseMarkdown } from "@/lib/utils";

interface RulesViewerProps {
  rules: string;
}

const RulesViewer = ({ rules }: RulesViewerProps) => {
  const rulesHtml = parseMarkdown(rules);
  
  return (
    <div className="prose prose-sm max-w-none dark:prose-invert py-6">
      <div dangerouslySetInnerHTML={{ __html: rulesHtml }} />
    </div>
  );
};

export default RulesViewer;
