
import React, { useState, useEffect } from 'react';
import { GameCard } from '@/types/cards';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MarkdownRenderer } from '@/components/MarkdownRenderer';

interface CardWithMarkdownDisplayProps {
  card: GameCard;
  markdown?: string;
}

export const CardWithMarkdownDisplay = ({ 
  card, 
  markdown = "" 
}: CardWithMarkdownDisplayProps) => {
  const [activeTab, setActiveTab] = useState('preview');
  const [markdownContent, setMarkdownContent] = useState('');
  
  useEffect(() => {
    // In a real implementation, we would fetch the markdown content
    // for the card from the file system or API
    if (markdown) {
      setMarkdownContent(markdown);
    }
  }, [card.id, markdown]);
  
  return (
    <Card className="w-full max-w-2xl">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preview">Card Preview</TabsTrigger>
          <TabsTrigger value="markdown">Markdown Content</TabsTrigger>
        </TabsList>
        
        <TabsContent value="preview">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl font-bold">{card.name}</CardTitle>
              <div className="flex gap-1">
                {card.icons.map((icon, i) => (
                  <span key={i} title={icon.meaning} className="text-lg">{icon.symbol}</span>
                ))}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 mt-1">
              {card.keywords.map((keyword, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {keyword}
                </Badge>
              ))}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {card.rules.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Rules:</p>
                {card.rules.map((rule, i) => (
                  <p key={i} className="text-sm">{rule}</p>
                ))}
              </div>
            )}
          </CardContent>
          
          {card.flavor && (
            <CardFooter className="border-t p-4">
              <p className="italic text-sm text-muted-foreground">
                {card.flavor}
              </p>
            </CardFooter>
          )}
        </TabsContent>
        
        <TabsContent value="markdown">
          <CardContent>
            {markdownContent ? (
              <MarkdownRenderer content={markdownContent} />
            ) : (
              <div className="p-4 text-center">
                <p className="text-muted-foreground">No markdown content available</p>
              </div>
            )}
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
