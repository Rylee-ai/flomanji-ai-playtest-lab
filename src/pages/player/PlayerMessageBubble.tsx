
import React from "react";
import { parseMarkdown } from "@/lib/utils";

interface PlayerMessageBubbleProps {
  content: string;
  timestamp: string;
  role: "ai" | "human" | "system";
}

const PlayerMessageBubble: React.FC<PlayerMessageBubbleProps> = ({ content, timestamp, role }) => (
  <div className={`mb-4 ${role === "human" ? "text-right" : ""}`}>
    <div
      className={`inline-block p-3 rounded-lg max-w-[80%] ${
        role === "human"
          ? "bg-primary text-primary-foreground rounded-tr-none"
          : "bg-muted rounded-tl-none dark:bg-slate-800"
      }`}
    >
      {role === "ai" || role === "system" ? (
        <div
          className="prose prose-sm dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
        />
      ) : (
        content
      )}
    </div>
    <div className="text-xs text-muted-foreground mt-1 px-2">
      {new Date(timestamp).toLocaleTimeString()}
    </div>
  </div>
);

export default PlayerMessageBubble;
