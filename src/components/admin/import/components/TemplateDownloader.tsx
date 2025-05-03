
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { CardType } from "@/types/cards";

export interface TemplateDownloaderProps {
  cardType: CardType;
}

export function TemplateDownloader({ cardType }: TemplateDownloaderProps) {
  const handleDownload = () => {
    // Generate a template for the current card type
    let templateContent = "";
    const fileName = `${cardType}-template.md`;

    if (cardType === "gear") {
      templateContent = `# Example Gear Card

* **Type:** GEAR – Tool
* **Keywords:** utility, durable
* **Rules:** This item can be used to perform a specific task.
* **Flavor:** "A reliable tool for any adventurer."
* **Image Prompt:** A well-crafted handheld tool with wooden handle and metal parts

# Second Example Card

* **Type:** GEAR – Consumable
* **Keywords:** healing, one-use
* **Rules:** Use this item to restore 1 health point to any character.
* **Flavor:** "Apply liberally to wounds."
* **Image Prompt:** A small vial with glowing green liquid inside
`;
    } else if (cardType === "treasure") {
      templateContent = `# Example Treasure Card

* **Type:** TREASURE 
* **Value:** 2
* **Keywords:** valuable, ancient
* **Rules:** This treasure can be exchanged for 2 resources.
* **Flavor:** "It's worth more to collectors than its weight in gold."
* **Image Prompt:** An ornate golden artifact with gemstones
`;
    }
    // More templates for other card types can be added

    const blob = new Blob([templateContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Button variant="outline" size="sm" className="gap-2" onClick={handleDownload}>
      <Download size={16} />
      <span>Template</span>
    </Button>
  );
}
