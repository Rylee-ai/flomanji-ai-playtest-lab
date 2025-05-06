
import React from "react";
import { GameCard } from "@/types/cards";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash, Upload, AlertCircle } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CardDisplay } from "@/components/cards/CardDisplay";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { PlayerCharacterCard } from "@/types/cards/player-character";
import { Badge } from "@/components/ui/badge";

interface CardGridProps {
  cards: GameCard[];
  selectedCards?: GameCard[];
  onSelectCard?: (card: GameCard, isSelected: boolean) => void;
  onViewCard: (id: string) => void;
  onEditCard: (card: GameCard) => void;
  onDeleteCard: (card: GameCard) => void;
  onImageUpload: (cardId: string, imageUrl: string) => void;
}

// Brand protection constant - this image URL should never be changed without approval
const FLOMANJI_CARD_BACK_IMAGE = "/lovable-uploads/e5635414-17a2-485e-86cb-feaf926b9af5.png";

export const CardGrid = ({ 
  cards, 
  selectedCards = [], 
  onSelectCard,
  onViewCard, 
  onEditCard, 
  onDeleteCard, 
  onImageUpload 
}: CardGridProps) => {
  const handleImageUpload = async (cardId: string, file: File) => {
    try {
      // Image validation
      const validImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      if (!validImageTypes.includes(file.type)) {
        toast.error('Invalid file type. Please upload a JPG, PNG, WEBP, or GIF image.');
        return;
      }
      
      if (file.size > 5000000) { // 5MB limit
        toast.error('Image is too large. Maximum size is 5MB.');
        return;
      }

      const fileExt = file.name.split('.').pop();
      const filePath = `${cardId}-${Date.now()}.${fileExt}`;
      
      const { error: uploadError, data } = await supabase.storage
        .from('card-images')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('card-images')
        .getPublicUrl(filePath);

      // Prevent overwriting of brand assets
      if (cardId === 'brand-card-back') {
        toast.error('Cannot modify protected brand assets');
        return;
      }

      onImageUpload(cardId, publicUrl);
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    }
  };

  // Check if a card is selected
  const isSelected = (card: GameCard) => {
    return selectedCards.some(c => c.id === card.id);
  };

  // Render character stats badges if it's a player character card
  const renderCharacterInfo = (card: GameCard) => {
    if (card.type === 'player-character') {
      const characterCard = card as PlayerCharacterCard;
      return (
        <div className="space-y-2 mt-2">
          <div className="flex flex-wrap items-center justify-between gap-1">
            <Badge variant="secondary" className="font-medium text-xs">
              {characterCard.role}
            </Badge>
            <Badge variant="outline" className="font-medium text-xs whitespace-nowrap">
              HP: {characterCard.health}
            </Badge>
          </div>
          
          <div className="grid grid-cols-5 gap-1">
            <Badge variant="outline" className="text-xs px-1.5" title="Brawn">
              B:{characterCard.stats.brawn}
            </Badge>
            <Badge variant="outline" className="text-xs px-1.5" title="Moxie">
              M:{characterCard.stats.moxie}
            </Badge>
            <Badge variant="outline" className="text-xs px-1.5" title="Charm">
              C:{characterCard.stats.charm}
            </Badge>
            <Badge variant="outline" className="text-xs px-1.5" title="Grit">
              G:{characterCard.stats.grit}
            </Badge>
            <Badge variant="outline" className="text-xs px-1.5" title="Weird Sense">
              W:{characterCard.stats.weirdSense}
            </Badge>
          </div>
          
          <div className="border-t border-muted pt-1 mt-1">
            <p className="text-xs font-semibold line-clamp-1" title={characterCard.ability.name}>
              {characterCard.ability.name}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-2 sm:p-4 bg-background">
      {cards.map((card) => (
        <Card key={card.id} className={cn(
          "overflow-hidden group relative hover:shadow-lg transition-shadow border-gray-700",
          isSelected(card) && "ring-2 ring-primary"
        )}>
          {onSelectCard && (
            <div className="absolute top-2 left-2 z-10">
              <Checkbox 
                checked={isSelected(card)}
                onCheckedChange={(checked) => onSelectCard(card, !!checked)}
                className="h-5 w-5 bg-background/80 backdrop-blur-sm"
              />
            </div>
          )}
          
          <CardContent className="p-3">
            <div className="relative aspect-[3/4] mb-3 bg-gray-800 rounded-lg overflow-hidden">
              {card.imageUrl ? (
                <div className="relative w-full h-full">
                  <img 
                    src={card.imageUrl} 
                    alt={card.name}
                    className="object-cover w-full h-full transition-transform hover:scale-105"
                    loading="lazy"
                  />
                  {card.imageUrl === FLOMANJI_CARD_BACK_IMAGE && (
                    <div className="absolute bottom-0 right-0 bg-amber-500 text-white text-xs p-1 rounded-tl-md">
                      <AlertCircle className="w-3 h-3 inline mr-1" />
                      Protected
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center w-full h-full hover:bg-gray-700 transition-colors">
                  <label 
                    htmlFor={`image-upload-${card.id}`}
                    className="cursor-pointer flex flex-col items-center justify-center p-4 text-center"
                  >
                    <Upload className="w-6 h-6 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-400">Upload</span>
                    <span className="text-xs text-gray-400">Image</span>
                    <p className="text-xs text-gray-500 mt-1">Max 5MB</p>
                  </label>
                  <input
                    type="file"
                    id={`image-upload-${card.id}`}
                    className="hidden"
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(card.id, file);
                    }}
                  />
                </div>
              )}
            </div>
            <h3 className="font-semibold text-base line-clamp-1 mb-1" title={card.name}>{card.name}</h3>
            <p className="text-xs text-muted-foreground">{card.type}</p>
            
            {renderCharacterInfo(card)}
          </CardContent>
          
          <CardFooter className="flex flex-col sm:flex-row gap-2 p-3 pt-0">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onViewCard(card.id)}
              className="w-full sm:flex-1 h-8"
            >
              <Eye className="h-3.5 w-3.5 mr-1" />
              View
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onEditCard(card)}
              className="w-full sm:flex-1 h-8"
            >
              <Pencil className="h-3.5 w-3.5 mr-1" />
              Edit
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onDeleteCard(card)}
              className="w-full sm:flex-1 h-8 text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash className="h-3.5 w-3.5 mr-1" />
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
