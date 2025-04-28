
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {cards.map((card) => (
        <Card key={card.id} className="overflow-hidden group relative">
          <CardContent className="p-4">
            <div className="relative aspect-[3/4] mb-4 bg-muted rounded-lg overflow-hidden">
              {card.imageUrl ? (
                <img 
                  src={card.imageUrl} 
                  alt={card.name}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <label 
                    htmlFor={`image-upload-${card.id}`}
                    className="cursor-pointer flex flex-col items-center justify-center"
                  >
                    <Upload className="w-8 h-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground mt-2">Upload Image</span>
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
            <h3 className="font-semibold text-lg mb-2">{card.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{card.type}</p>
          </CardContent>
          <CardFooter className="flex justify-between p-4 pt-0">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onViewCard(card.id)}
            >
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onEditCard(card)}
            >
              <Pencil className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onDeleteCard(card)}
              className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
