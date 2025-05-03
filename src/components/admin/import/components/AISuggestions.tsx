
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, Lightbulb } from "lucide-react";
import { CardSuggestion } from "@/utils/ai-processing/AICardProcessorService";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AISuggestionsProps {
  suggestions: CardSuggestion[];
  onApplySuggestion: (index: number) => void;
  onIgnoreSuggestion: (index: number) => void;
}

export function AISuggestions({
  suggestions,
  onApplySuggestion,
  onIgnoreSuggestion
}: AISuggestionsProps) {
  if (suggestions.length === 0) {
    return null;
  }

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
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-3 pl-6 pr-2">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="border rounded-md p-4 bg-muted/30">
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
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Ignore</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-primary"
                      onClick={() => onApplySuggestion(index)}
                    >
                      <Check className="h-4 w-4" />
                      <span className="sr-only">Apply</span>
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  <span className="font-medium">Suggestion:</span> {suggestion.suggestion}
                </div>
                <div className="text-xs text-muted-foreground">
                  <span className="font-medium">Reason:</span> {suggestion.reason}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <Button variant="outline" size="sm" className="text-xs" onClick={() => suggestions.forEach((_, i) => onIgnoreSuggestion(i))}>
          Ignore All
        </Button>
        <Button variant="default" size="sm" className="text-xs" onClick={() => suggestions.forEach((_, i) => onApplySuggestion(i))}>
          Apply All
        </Button>
      </CardFooter>
    </Card>
  );
}
