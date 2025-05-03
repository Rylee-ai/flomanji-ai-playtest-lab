
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { GameCard } from "@/types/cards";
import { CardService } from "@/services/CardService";
import { CardChangeSet } from "@/types/cards/card-version";
import { toast } from "sonner";
import { Edit, Search, Save, AlertTriangle } from "lucide-react";

interface CardBulkEditorProps {
  selectedCards: GameCard[];
  onEditComplete: (updatedCards: GameCard[]) => void;
}

export const CardBulkEditor = ({ selectedCards, onEditComplete }: CardBulkEditorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [field, setField] = useState<string>("keywords");
  const [findValue, setFindValue] = useState("");
  const [replaceValue, setReplaceValue] = useState("");
  const [isPreview, setIsPreview] = useState(true);
  const [affectedCards, setAffectedCards] = useState<GameCard[]>([]);
  const [changeSet, setChangeSet] = useState<CardChangeSet>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [notes, setNotes] = useState("");
  
  const handleFindReplace = () => {
    if (!field || (!findValue && !isPreview)) return;
    
    const affected: GameCard[] = [];
    const changes: CardChangeSet = {};
    
    selectedCards.forEach(card => {
      // Handle different field types
      if (field === "keywords") {
        const keywords = [...card.keywords];
        let changed = false;
        
        // Find and replace in keywords
        if (findValue) {
          const index = keywords.indexOf(findValue);
          if (index >= 0) {
            if (!isPreview) {
              keywords.splice(index, 1, replaceValue);
            }
            changed = true;
          }
        } else if (!isPreview) {
          // Add keyword if it doesn't exist
          if (!keywords.includes(replaceValue)) {
            keywords.push(replaceValue);
            changed = true;
          }
        }
        
        if (changed) {
          affected.push(card);
          changes[card.id] = {
            keywords: {
              oldValue: card.keywords,
              newValue: keywords
            }
          };
        }
      } else if (field === "icons") {
        // Future implementation
      } else if (field === "rules") {
        const rules = Array.isArray(card.rules) ? [...card.rules] : [card.rules];
        let changed = false;
        
        // Find and replace in rules
        for (let i = 0; i < rules.length; i++) {
          if (typeof rules[i] === 'string' && rules[i].includes(findValue)) {
            if (!isPreview) {
              rules[i] = rules[i].replace(
                new RegExp(findValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
                replaceValue
              );
            }
            changed = true;
          }
        }
        
        if (changed) {
          affected.push(card);
          changes[card.id] = {
            rules: {
              oldValue: card.rules,
              newValue: rules
            }
          };
        }
      } else if (field === "flavor") {
        if (card.flavor.includes(findValue)) {
          affected.push(card);
          changes[card.id] = {
            flavor: {
              oldValue: card.flavor,
              newValue: !isPreview ? card.flavor.replace(
                new RegExp(findValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
                replaceValue
              ) : card.flavor
            }
          };
        }
      }
    });
    
    setAffectedCards(affected);
    setChangeSet(changes);
  };
  
  const applyChanges = async () => {
    if (Object.keys(changeSet).length === 0) {
      toast.info("No changes to apply");
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Record the bulk edit operation
      const operationId = await CardService.recordBulkEditOperation({
        affectedCards: affectedCards.map(card => card.id),
        changes: changeSet,
        notes,
        status: 'applied'
      });
      
      // Apply changes to each card
      const updatedCards = affectedCards.map(card => {
        const cardChanges = changeSet[card.id];
        let updatedCard = { ...card };
        
        Object.entries(cardChanges).forEach(([key, change]) => {
          updatedCard = { 
            ...updatedCard,
            [key]: change.newValue
          };
        });
        
        return updatedCard;
      });
      
      // Save changes to database
      // await CardService.saveCards(updatedCards);
      
      toast.success(`Successfully updated ${updatedCards.length} cards`);
      onEditComplete(updatedCards);
      setIsOpen(false);
    } catch (error) {
      console.error("Error applying changes:", error);
      toast.error("Failed to apply changes");
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline"
          className="flex items-center gap-2"
          disabled={selectedCards.length === 0}
        >
          <Edit className="h-4 w-4" />
          Bulk Edit ({selectedCards.length})
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Bulk Edit Cards</DialogTitle>
          <DialogDescription>
            Edit {selectedCards.length} cards in bulk. Changes will be applied to all selected cards.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="field">Field to Edit</Label>
              <Select
                value={field}
                onValueChange={setField}
              >
                <SelectTrigger className="w-full" id="field">
                  <SelectValue placeholder="Select a field" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="keywords">Keywords</SelectItem>
                  <SelectItem value="rules">Rules Text</SelectItem>
                  <SelectItem value="flavor">Flavor Text</SelectItem>
                  <SelectItem value="icons" disabled>Icons (coming soon)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="find">Find Text</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="find"
                    value={findValue}
                    onChange={(e) => setFindValue(e.target.value)}
                    placeholder="Text to find"
                    className="pl-8"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {field === "keywords" ? "Enter exact keyword or leave blank to add new" : "Enter text to find and replace"}
                </p>
              </div>
              
              <div>
                <Label htmlFor="replace">Replace With</Label>
                <Input
                  id="replace"
                  value={replaceValue}
                  onChange={(e) => setReplaceValue(e.target.value)}
                  placeholder="Replacement text"
                />
              </div>
            </div>
            
            <Button 
              onClick={handleFindReplace}
              variant={isPreview ? "secondary" : "default"}
              className="mt-2"
            >
              {isPreview ? "Preview Changes" : "Find & Replace"}
            </Button>
            
            {affectedCards.length > 0 && (
              <Card className="p-4 mt-2">
                <h4 className="text-sm font-medium mb-2">
                  {isPreview 
                    ? `${affectedCards.length} cards will be affected` 
                    : `${affectedCards.length} cards affected`}
                </h4>
                
                <ul className="text-sm max-h-40 overflow-y-auto">
                  {affectedCards.slice(0, 10).map(card => (
                    <li key={card.id} className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{card.name}</span>
                      <span className="text-muted-foreground">({card.type})</span>
                    </li>
                  ))}
                  {affectedCards.length > 10 && (
                    <li className="text-muted-foreground">...and {affectedCards.length - 10} more</li>
                  )}
                </ul>
              </Card>
            )}
            
            {Object.keys(changeSet).length > 0 && (
              <div>
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea 
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Notes about these changes"
                  className="h-20"
                />
              </div>
            )}
            
            {isPreview && Object.keys(changeSet).length > 0 && (
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm">This is a preview. Click 'Apply Changes' to make these changes.</span>
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button
            variant="secondary"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={applyChanges}
            disabled={isPreview || isProcessing || Object.keys(changeSet).length === 0}
            className="gap-2"
          >
            {isProcessing ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Apply Changes</span>
              </>
            )}
          </Button>
          {isPreview && Object.keys(changeSet).length > 0 && (
            <Button
              onClick={() => setIsPreview(false)}
            >
              Confirm Changes
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
