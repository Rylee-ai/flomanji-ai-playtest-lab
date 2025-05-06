
import React from "react";
import { Upload, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface CardImageUploadProps {
  cardId: string;
  imageUrl?: string;
  onImageUpload: (cardId: string, imageUrl: string) => void;
  isProtectedAsset?: boolean;
}

// Brand protection constant - this image URL should never be changed without approval
const FLOMANJI_CARD_BACK_IMAGE = "/lovable-uploads/e5635414-17a2-485e-86cb-feaf926b9af5.png";

export const CardImageUpload = ({ 
  cardId, 
  imageUrl, 
  onImageUpload,
  isProtectedAsset
}: CardImageUploadProps) => {
  const handleImageUpload = async (file: File) => {
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

      // Prevent overwriting of brand assets
      if (isProtectedAsset || cardId === 'brand-card-back') {
        toast.error('Cannot modify protected brand assets');
        return;
      }

      const fileExt = file.name.split('.').pop();
      const filePath = `${cardId}-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
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
    <div className="relative aspect-[3/4] mb-3 bg-gray-800 rounded-lg overflow-hidden">
      {imageUrl ? (
        <div className="relative w-full h-full">
          <img 
            src={imageUrl} 
            alt="Card image"
            className="object-cover w-full h-full transition-transform hover:scale-105"
            loading="lazy"
          />
          {isProtectedAsset && (
            <div className="absolute bottom-0 right-0 bg-amber-500 text-white text-xs p-1 rounded-tl-md">
              <AlertCircle className="w-3 h-3 inline mr-1" />
              Protected
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full hover:bg-gray-700 transition-colors">
          <label 
            htmlFor={`image-upload-${cardId}`}
            className="cursor-pointer flex flex-col items-center justify-center p-4 text-center"
          >
            <Upload className="w-6 h-6 text-gray-400 mb-2" />
            <span className="text-sm text-gray-400">Upload</span>
            <span className="text-xs text-gray-400">Image</span>
            <p className="text-xs text-gray-500 mt-1">Max 5MB</p>
          </label>
          <input
            type="file"
            id={`image-upload-${cardId}`}
            className="hidden"
            accept="image/png,image/jpeg,image/webp,image/gif"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(file);
            }}
          />
        </div>
      )}
    </div>
  );
};
