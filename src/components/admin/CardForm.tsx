
import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CardType, GameCard } from '@/types/cards';
import { generateId } from '@/lib/cards/cardUtils';

// Common schema for all cards
const baseCardSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  type: z.string(),
  flavor: z.string().optional(),
  imagePrompt: z.string().optional(),
  keywords: z.string(),
  rules: z.string(),
  markdownContent: z.string().optional(),
});

export type CardFormData = z.infer<typeof baseCardSchema>;

// Export the comprehensive CardFormValues type that includes all possible card properties
export interface CardFormValues {
  // Base properties
  name: string;
  type: CardType;
  keywords: string[];
  icons: { symbol: string; meaning: string; }[];
  rules: string[];
  flavor?: string;
  imagePrompt?: string;
  
  // Treasure/Artifact properties
  value?: number;
  consumable?: boolean;
  passiveEffect?: string;
  useEffect?: string;
  
  // Hazard properties
  subType?: 'environmental' | 'creature' | 'social' | 'weird';
  difficultyClasses?: {
    fight?: number;
    flee?: number;
    negotiate?: number;
    outsmart?: number;
    grit?: number;
    moxie?: number;
    charm?: number;
    weirdSense?: number;
  };
  onFailure?: string;
  onSuccess?: string;
  bossHazard?: boolean;
  gearBonuses?: {
    itemName: string;
    effect: 'autoSuccess' | 'bonus';
    bonusValue?: number;
  }[];
  
  // Region properties
  biomeTags?: string[];
  onEnter?: string;
  action?: string;
  rest?: string;
  bonusZone?: string;
  
  // NPC properties
  checkDC?: number;
  actions?: {
    description: string;
    cost: number;
    effect: string;
  }[];
  
  // Gear properties
  category?: 'consumable' | 'tool' | 'weapon' | 'vehicle' | 'supply';
  uses?: number;
  actionCost?: number;
  passive?: string;
  statBonus?: {
    stat?: 'brawn' | 'moxie' | 'charm' | 'grit' | 'weirdSense';
    value?: number;
  };
  
  // Chaos properties
  heatEffect?: number;
  globalEffect?: string;
  duration?: 'immediate' | 'ongoing' | 'end-of-round';
  
  // Flomanjified properties
  originalRole?: string;
  chaosAction?: string;
  specialAbility?: string;
  
  // Secret objective properties
  alignment?: 'saboteur' | 'innocent';
  winCondition?: string;
  
  // Automa properties
  movement?: string;
  combatBonus?: number;
  specialEffect?: string;
  
  // Player Character properties
  role?: string;
  stats?: {
    brawn: number;
    moxie: number;
    charm: number;
    grit: number;
    weirdSense: number;
  };
  ability?: {
    name: string;
    description: string;
  };
  health?: number;
  weirdness?: number;
  luck?: number;
  starterGear?: {
    name: string;
    type: string;
    effect: string;
  }[];
}

interface CardFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CardFormValues) => void;
  initialData?: GameCard;
  activeTab: CardType;
}

export function CardForm({ 
  open, 
  onClose, 
  onSubmit, 
  initialData,
  activeTab 
}: CardFormProps) {
  const [formTab, setFormTab] = useState('basic');
  
  // Create form with validation
  const form = useForm<CardFormData>({
    resolver: zodResolver(baseCardSchema),
    defaultValues: {
      name: initialData?.name || '',
      type: initialData?.type || activeTab,
      flavor: initialData?.flavor || '',
      imagePrompt: initialData?.imagePrompt || '',
      keywords: initialData?.keywords.join(', ') || '',
      rules: initialData?.rules.join('\n') || '',
      markdownContent: '',
    }
  });
  
  // Reset form when initialData changes
  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        type: initialData.type,
        flavor: initialData.flavor || '',
        imagePrompt: initialData.imagePrompt || '',
        keywords: initialData.keywords.join(', '),
        rules: initialData.rules.join('\n'),
        markdownContent: '',
      });
    } else {
      form.reset({
        name: '',
        type: activeTab,
        flavor: '',
        imagePrompt: '',
        keywords: '',
        rules: '',
        markdownContent: '',
      });
    }
  }, [initialData, activeTab, form]);
  
  // Generate markdown preview
  const generateMarkdown = () => {
    const { name, type, flavor, imagePrompt } = form.getValues();
    const keywords = form.getValues().keywords.split(',').map(k => k.trim());
    const rules = form.getValues().rules.split('\n').filter(r => r.trim());
    
    const frontMatter = [
      '---',
      `name: "${name}"`,
      `type: "${type}"`,
      'icons:',
      '  - symbol: "🔹"',
      '    meaning: "Generic"',
      'keywords:',
      ...keywords.map(k => `  - "${k}"`),
      'rules:',
      ...rules.map(r => `  - "${r}"`),
      flavor ? `flavor: "${flavor}"` : '',
      imagePrompt ? `imagePrompt: "${imagePrompt}"` : '',
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
    ].filter(Boolean).join('\n');
    
    form.setValue('markdownContent', frontMatter);
    setFormTab('markdown');
  };
  
  // Submit handler
  const onFormSubmit = (data: CardFormData) => {
    // Process data before submission
    const processedData: CardFormValues = {
      ...data,
      keywords: data.keywords.split(',').map(k => k.trim()),
      rules: data.rules.split('\n').filter(r => r.trim()),
      id: initialData?.id || generateId(data.name),
      // Add the required icons property that's missing
      icons: initialData?.icons || [{ symbol: "🔹", meaning: "Generic" }],
      // Set the correct type
      type: (data.type || activeTab) as CardType,
    };
    
    // Pass the properly formatted data to onSubmit
    onSubmit(processedData);
    onClose();
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit' : 'Create'} {activeTab} Card</DialogTitle>
          <DialogDescription>
            {initialData 
              ? `Editing ${initialData.name}` 
              : `Create a new ${activeTab} card for Flomanji`}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={formTab} onValueChange={setFormTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="markdown">Markdown Preview</TabsTrigger>
          </TabsList>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6">
              <TabsContent value="basic" className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Card name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="keywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Keywords (comma separated)</FormLabel>
                      <FormControl>
                        <Input placeholder="Keyword1, Keyword2" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="rules"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rules (one per line)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter rules, one per line" 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="flavor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Flavor Text</FormLabel>
                      <FormControl>
                        <Input placeholder="Flavor text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="imagePrompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image Prompt</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the image for this card" 
                          className="min-h-[80px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="button" onClick={generateMarkdown}>
                  Generate Markdown
                </Button>
              </TabsContent>
              
              <TabsContent value="markdown">
                <FormField
                  control={form.control}
                  name="markdownContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Markdown Content</FormLabel>
                      <FormControl>
                        <Textarea 
                          className="font-mono text-sm min-h-[400px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">
                  {initialData ? 'Update' : 'Create'} Card
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
