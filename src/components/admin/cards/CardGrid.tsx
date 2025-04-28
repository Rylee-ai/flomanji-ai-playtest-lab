
import React from "react";
import { GameCard } from "@/types/cards";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash, Upload } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CardDisplay } from "@/components/cards/CardDisplay";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CardGridProps {
  cards: GameCard[];
  onViewCard: (id: string) => void;
  onEditCard: (card: GameCard) => void;
  onDeleteCard: (card: GameCard) => void;
  onImageUpload: (cardId: string, imageUrl: string) => void;
}

export const CardGrid = ({ cards, onViewCard, onEditCard, onDeleteCard, onImageUpload }: CardGridProps) => {
  const handleImageUpload = async (cardId: string, file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${cardId}.${fileExt}`;
      
      const { error: uploadError, data } = await supabase.storage
        .from('card-images')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('card-images')
        .getPublicUrl(filePath);

      onImageUpload(cardId, publicUrl);
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4 p-2 sm:p-4">
      {cards.map((card) => (
        <Card key={card.id} className="overflow-hidden group relative hover:shadow-lg transition-shadow">
          <CardContent className="p-3 sm:p-4">
            <div className="relative aspect-[3/4] mb-3 sm:mb-4 bg-muted rounded-lg overflow-hidden">
              {card.imageUrl ? (
                <img 
                  src={card.imageUrl} 
                  alt={card.name}
                  className="object-cover w-full h-full transition-transform hover:scale-105"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full hover:bg-muted/80 transition-colors">
                  <label 
                    htmlFor={`image-upload-${card.id}`}
                    className="cursor-pointer flex flex-col items-center justify-center p-4 text-center"
                  >
                    <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground mb-2" />
                    <span className="text-xs sm:text-sm text-muted-foreground">Upload Image</span>
                  </label>
                  <input
                    type="file"
                    id={`image-upload-${card.id}`}
                    className="hidden"
                    accept="image/*"
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
              className="flex-1 min-w-[80px]"
            >
              <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              View
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onEditCard(card)}
              className="flex-1 min-w-[80px]"
            >
              <Pencil className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              Edit
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onDeleteCard(card)}
              className="flex-1 min-w-[80px] text-destructive hover:bg-destructive hover:text-destructive-foreground"
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
