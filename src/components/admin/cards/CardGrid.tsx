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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 p-2 sm:p-4">
      {cards.map((card) => (
        <Card key={card.id} className={cn(
          "overflow-hidden group relative hover:shadow-lg transition-shadow",
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
          
          <CardContent className="p-3 sm:p-4">
            <div className="relative aspect-[3/4] mb-3 sm:mb-4 bg-muted rounded-lg overflow-hidden">
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
                <div className="flex items-center justify-center w-full h-full hover:bg-muted/80 transition-colors">
                  <label 
                    htmlFor={`image-upload-${card.id}`}
                    className="cursor-pointer flex flex-col items-center justify-center p-4 text-center"
                  >
                    <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground mb-2" />
                    <span className="text-xs sm:text-sm text-muted-foreground">Upload Image</span>
                    <p className="text-xs text-muted-foreground mt-1">Max 5MB</p>
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
            <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2 truncate">{card.name}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{card.type}</p>
          </CardContent>
          <CardFooter className="flex flex-wrap gap-2 p-3 sm:p-4 pt-0">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onViewCard(card.id)}
              className="flex-1 min-w-[70px] text-xs sm:text-sm"
            >
              <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              View
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onEditCard(card)}
              className="flex-1 min-w-[70px] text-xs sm:text-sm"
            >
              <Pencil className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              Edit
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onDeleteCard(card)}
              className="flex-1 min-w-[70px] text-xs sm:text-sm text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
