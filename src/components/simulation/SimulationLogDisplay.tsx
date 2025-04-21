
import React, { useState } from "react";
import { AgentMessage } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";

interface SimulationLogDisplayProps {
  messages: AgentMessage[];
  showPrompts: boolean;
}

const SimulationLogDisplay = ({ messages, showPrompts }: SimulationLogDisplayProps) => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (index: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "GM":
        return "default";
      case "Player":
        return "outline";
      case "Critic":
        return "secondary";
      default:
        return "outline";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Simulation Log</h3>
      <div className="space-y-2">
        {messages.map((message, index) => (
          <Collapsible 
            key={index} 
            open={expandedItems[index]} 
            onOpenChange={() => toggleItem(index)}
            className="border rounded-md"
          >
            <div className="flex items-center gap-2 p-3 cursor-pointer hover:bg-muted/50">
              <CollapsibleTrigger asChild>
                <button className="p-1 rounded-sm hover:bg-muted">
                  {expandedItems[index] ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              </CollapsibleTrigger>
              
              <Badge variant={getRoleBadgeVariant(message.role)}>
                {message.role}
                {message.role === "Player" && message.playerIndex !== undefined && ` ${message.playerIndex + 1}`}
              </Badge>
              
              {message.metadata?.phase && (
                <Badge variant="outline" className="text-xs">
                  {message.metadata.phase}
                </Badge>
              )}
              
              {message.metadata?.roundNumber && (
                <Badge variant="outline" className="text-xs">
                  Round {message.metadata.roundNumber}
                </Badge>
              )}
              
              <span className="text-xs text-muted-foreground">
                {formatTimestamp(message.timestamp)}
              </span>
            </div>
            
            <CollapsibleContent>
              <CardContent className="pt-0 pb-3">
                <div className="whitespace-pre-wrap text-sm mt-2">{message.content}</div>
                
                {showPrompts && message.metadata && (
                  <div className="mt-3 pt-2 border-t border-dashed">
                    <details className="text-xs">
                      <summary className="cursor-pointer text-muted-foreground font-medium">
                        Debug Information
                      </summary>
                      <div className="mt-2 p-2 bg-muted/50 rounded-md overflow-auto max-h-64">
                        <pre className="text-xs">{JSON.stringify(message.metadata, null, 2)}</pre>
                      </div>
                    </details>
                  </div>
                )}
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
};

export default SimulationLogDisplay;
