
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, Lightbulb, ChevronDown, ChevronUp, Diff } from "lucide-react";
import { CardSuggestion } from "@/utils/ai-processing/AICardProcessorService";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface AISuggestionsProps {
  suggestions: CardSuggestion[];
  onApplySuggestion: (index: number) => void;
  onIgnoreSuggestion: (index: number) => void;
  processingError?: string | null;
}

export function AISuggestions({
  suggestions,
  onApplySuggestion,
  onIgnoreSuggestion,
  processingError
}: AISuggestionsProps) {
  const [expandedSuggestion, setExpandedSuggestion] = useState<number | null>(null);
  
  if (processingError) {
    return (
      <Card className="border border-destructive/50 shadow-sm bg-destructive/5">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <X className="h-4 w-4 text-destructive" />
            <CardTitle className="text-lg">AI Processing Error</CardTitle>
          </div>
          <CardDescription>
            There was an error during AI processing of your cards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{processingError}</p>
        </CardContent>
      </Card>
    );
  }

  if (suggestions.length === 0) {
    return null;
  }

  const toggleExpand = (index: number) => {
    setExpandedSuggestion(expandedSuggestion === index ? null : index);
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-amber-500" />
          <CardTitle className="text-lg">AI Suggestions</CardTitle>
        </div>
        <CardDescription>
          The AI has found {suggestions.length} potential improvements for your cards
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3 pl-6 pr-2">
            {suggestions.map((suggestion, index) => (
              <Collapsible 
                key={index} 
                className="border rounded-md p-3 bg-muted/30"
                open={expandedSuggestion === index}
                onOpenChange={() => toggleExpand(index)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-sm">{suggestion.cardName}</h4>
                    <Badge variant="outline" className="text-xs">
                      {suggestion.field}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-destructive"
                      onClick={() => onIgnoreSuggestion(index)}
                      title="Ignore suggestion"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Ignore</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-primary"
                      onClick={() => onApplySuggestion(index)}
                      title="Apply suggestion"
                    >
                      <Check className="h-4 w-4" />
                      <span className="sr-only">Apply</span>
                    </Button>
                    <CollapsibleTrigger asChild>
                      <Button
                        size="sm" 
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        title="Show details"
                      >
                        {expandedSuggestion === index ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                        <span className="sr-only">Toggle details</span>
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  <span className="font-medium">Suggestion:</span> {suggestion.suggestion}
                </div>
                <CollapsibleContent>
                  <div className="text-xs text-muted-foreground mt-2 pt-2 border-t">
                    <span className="font-medium">Reason:</span> {suggestion.reason}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs" 
          onClick={() => suggestions.forEach((_, i) => onIgnoreSuggestion(i))}
        >
          Ignore All
        </Button>
        <Button 
          variant="default" 
          size="sm" 
          className="text-xs" 
          onClick={() => suggestions.forEach((_, i) => onApplySuggestion(i))}
        >
          Apply All
        </Button>
      </CardFooter>
    </Card>
  );
}
