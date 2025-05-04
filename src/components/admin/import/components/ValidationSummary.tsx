
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, FileWarning, InfoIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  // If no errors or failed cards, don't render anything
  if (errors.length === 0 && failedCards.length === 0) return null;
  
  // Categorize errors for better organization
  const fileErrors = errors.filter(error => 
    error.toLowerCase().includes('file') || 
    error.toLowerCase().includes('format') ||
    error.toLowerCase().includes('parse')
  );
  
  const validationErrors = errors.filter(error => 
    !fileErrors.includes(error) &&
    !error.includes('Card #') &&
    !error.includes('Failed to process')
  );
    
  const cardSpecificErrors = errors.filter(error => 
    error.includes('Card #') || error.includes('Failed to process'));
    
  const hasFileErrors = fileErrors.length > 0;
  const hasValidationErrors = validationErrors.length > 0;
  const hasCardSpecificErrors = cardSpecificErrors.length > 0 || failedCards.length > 0;
  
  return (
    <div className="space-y-4">
      {/* File errors - critical issues */}
      {hasFileErrors && (
        <Alert variant="destructive">
          <FileWarning className="h-4 w-4" />
          <AlertTitle>File Processing Error</AlertTitle>
          <AlertDescription>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              {fileErrors.map((error, index) => (
                <li key={index} className="text-sm">{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
      
      {/* General validation errors */}
      {hasValidationErrors && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Validation Error</AlertTitle>
          <AlertDescription>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              {validationErrors.map((error, index) => (
                <li key={index} className="text-sm">{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
      
      {/* Card-specific validation errors */}
      {hasCardSpecificErrors && (
        <Alert variant={failedCards.length > 0 ? "default" : "destructive"} 
          className={failedCards.length > 0 ? "border-yellow-500" : "border-destructive"}
        >
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>
            Card Issues
            {cardCount > 0 && (
              <Badge variant="outline" className="ml-2 text-xs">
                {failedCards.length > 0 
                  ? `${failedCards.length} failed / ${cardCount} total` 
                  : `${cardSpecificErrors.length} issues`}
              </Badge>
            )}
          </AlertTitle>
          <AlertDescription>
            <Tabs defaultValue={failedCards.length > 0 ? "failed" : "validation"} className="mt-2">
              <TabsList className="mb-2">
                {cardSpecificErrors.length > 0 && (
                  <TabsTrigger value="validation">
                    Validation Errors
                    <Badge variant="secondary" className="ml-2 text-xs">{cardSpecificErrors.length}</Badge>
                  </TabsTrigger>
                )}
                
                {failedCards.length > 0 && (
                  <TabsTrigger value="failed">
                    Failed Cards
                    <Badge variant="secondary" className="ml-2 text-xs">{failedCards.length}</Badge>
                  </TabsTrigger>
                )}
              </TabsList>
              
              {/* Validation errors tab */}
              {cardSpecificErrors.length > 0 && (
                <TabsContent value="validation">
                  <ScrollArea className="h-[200px]">
                    <ul className="list-disc pl-5 space-y-1">
                      {cardSpecificErrors.map((error, index) => (
                        <li key={index} className="text-sm">{error}</li>
                      ))}
                    </ul>
                  </ScrollArea>
                </TabsContent>
              )}
              
              {/* Failed cards tab */}
              {failedCards.length > 0 && (
                <TabsContent value="failed">
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
                </TabsContent>
              )}
            </Tabs>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
