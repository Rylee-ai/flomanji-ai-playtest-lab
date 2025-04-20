
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { CardType } from '@/types/cards';
import { generateId } from '@/lib/cards/cardUtils';

// Card type options
const CARD_TYPES: CardType[] = [
  'treasure', 
  'artifact', 
  'hazard', 
  'gear', 
  'npc', 
  'region', 
  'chaos', 
  'mission',
  'flomanjified',
  'player-character',
  'secret'
];

export function CardCreator() {
  const [name, setName] = useState('');
  const [type, setType] = useState<CardType>('treasure');
  const [flavor, setFlavor] = useState('');
  const [rules, setRules] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');
  const [markdownContent, setMarkdownContent] = useState('');
  
  // Generate markdown
  const generateMarkdown = () => {
    if (!name) return;
    
    const id = generateId(name);
    const rulesArray = rules.split('\n').filter(rule => rule.trim());
    
    const frontMatter = [
      '---',
      `name: "${name}"`,
      `type: "${type}"`,
      'icons:',
      '  - symbol: "🔹"',
      '    meaning: "Generic"',
      'keywords:',
      '  - "Keyword1"',
      '  - "Keyword2"',
      `rules:`,
      ...rulesArray.map(rule => `  - "${rule}"`),
      `flavor: "${flavor}"`,
      `imagePrompt: "${imagePrompt}"`,
      '---',
      '',
      '# GM Notes',
      '',
      'Add GM notes here.',
      '',
      '# Effects',
      '',
      '- Effect 1',
      '- Effect 2',
      '- Effect 3'
    ].join('\n');
    
    setMarkdownContent(frontMatter);
  };
  
  // Copy to clipboard
  const copyToClipboard = () => {
    if (!markdownContent) {
      generateMarkdown();
    }
    navigator.clipboard.writeText(markdownContent)
      .then(() => alert('Markdown copied to clipboard!'))
      .catch(err => console.error('Failed to copy: ', err));
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create New Card</CardTitle>
        <CardDescription>
          Generate markdown for a new Flomanji card
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Card Name</Label>
          <Input 
            id="name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Mysterious Artifact"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="type">Card Type</Label>
          <Select value={type} onValueChange={(value) => setType(value as CardType)}>
            <SelectTrigger>
              <SelectValue placeholder="Select card type" />
            </SelectTrigger>
            <SelectContent>
              {CARD_TYPES.map((cardType) => (
                <SelectItem key={cardType} value={cardType}>
                  {cardType.charAt(0).toUpperCase() + cardType.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="rules">Rules (one per line)</Label>
          <Textarea 
            id="rules" 
            value={rules}
            onChange={(e) => setRules(e.target.value)}
            placeholder="Rule 1&#10;Rule 2&#10;Rule 3"
            className="min-h-[100px]"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="flavor">Flavor Text</Label>
          <Input 
            id="flavor" 
            value={flavor}
            onChange={(e) => setFlavor(e.target.value)}
            placeholder="Evocative description"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="imagePrompt">Image Prompt</Label>
          <Input 
            id="imagePrompt" 
            value={imagePrompt}
            onChange={(e) => setImagePrompt(e.target.value)}
            placeholder="Describe the card image"
          />
        </div>
        
        {markdownContent && (
          <div className="space-y-2">
            <Label htmlFor="markdown">Generated Markdown</Label>
            <Textarea 
              id="markdown" 
              value={markdownContent}
              readOnly
              className="min-h-[200px] font-mono text-sm"
            />
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button onClick={generateMarkdown}>Generate Markdown</Button>
        <Button onClick={copyToClipboard} variant="outline">Copy to Clipboard</Button>
      </CardFooter>
    </Card>
  );
}
