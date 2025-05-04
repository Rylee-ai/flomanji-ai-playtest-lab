
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Ban, FileWarning } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ValidationSummaryProps {
  errors: string[];
  failedCards?: {index: number, name?: string, error: string}[];
  cardCount?: number;
}

export function ValidationSummary({ 
  errors, 
  failedCards = [],
  cardCount = 0
}: ValidationSummaryProps) {
  if (errors.length === 0 && failedCards.length === 0) return null;
  
  const generalErrors = errors.filter(error => 
    !error.includes('Card #') && !error.includes('Failed to process'));
    
  const cardSpecificErrors = errors.filter(error => 
    error.includes('Card #') || error.includes('Failed to process'));
    
  const hasGeneralErrors = generalErrors.length > 0;
  const hasCardSpecificErrors = cardSpecificErrors.length > 0 || failedCards.length > 0;
  
  return (
    <div className="space-y-4">
      {/* File/General validation errors */}
      {hasGeneralErrors && (
        <Alert variant="destructive">
          <FileWarning className="h-4 w-4" />
          <AlertTitle>File Validation Error</AlertTitle>
          <AlertDescription>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              {generalErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
      
      {/* Card-specific validation errors */}
      {hasCardSpecificErrors && (
        <Alert variant="default" className={failedCards.length > 0 ? "border-yellow-500" : "border-destructive"}>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>
            Card Validation Issues
            {cardCount > 0 && (
              <Badge variant="outline" className="ml-2 text-xs">
                {failedCards.length > 0 
                  ? `${failedCards.length} failed / ${cardCount} total` 
                  : `${cardSpecificErrors.length} issues`}
              </Badge>
            )}
          </AlertTitle>
          <AlertDescription>
            <Accordion type="single" collapsible className="mt-2">
              {/* Standard validation errors */}
              {cardSpecificErrors.length > 0 && (
                <AccordionItem value="card-errors">
                  <AccordionTrigger>
                    <span className="text-sm font-medium">Validation Errors</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ScrollArea className="h-[200px]">
                      <ul className="list-disc pl-5 space-y-1">
                        {cardSpecificErrors.map((error, index) => (
                          <li key={index} className="text-sm">{error}</li>
                        ))}
                      </ul>
                    </ScrollArea>
                  </AccordionContent>
                </AccordionItem>
              )}
              
              {/* Failed cards with detailed information */}
              {failedCards.length > 0 && (
                <AccordionItem value="failed-cards">
                  <AccordionTrigger>
                    <span className="text-sm font-medium">Failed Cards</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ScrollArea className="h-[200px]">
                      <ul className="list-disc pl-5 space-y-2">
                        {failedCards.map((card, index) => (
                          <li key={index} className="text-sm">
                            <div className="font-medium">
                              {card.name ? card.name : `Card #${card.index + 1}`}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">{card.error}</div>
                          </li>
                        ))}
                      </ul>
                    </ScrollArea>
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
