
import React from "react";
import { CardType } from "@/types/cards";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { getMarkdownTemplateForType } from "@/utils/markdown-templates";
import { toast } from "sonner";

interface TemplateDownloaderProps {
  cardType: CardType;
  setCardType?: (type: CardType) => void;
}

export function TemplateDownloader({ cardType, setCardType }: TemplateDownloaderProps) {
  const handleDownload = () => {
    // Generate the template content based on card type
    const templateContent = getMarkdownTemplateForType(cardType);
    
    // Create a blob with the content
    const blob = new Blob([templateContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = `${cardType.toLowerCase()}-card-template.md`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    toast.success(`${cardType} template downloaded`);
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="gap-2"
      onClick={handleDownload}
    >
      <Download className="h-4 w-4" />
      <span>Download Template</span>
    </Button>
  );
}
