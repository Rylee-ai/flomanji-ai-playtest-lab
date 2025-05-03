
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
      templateContent = `# Flomanji Gear Cards Import Template

*This template shows how to format your gear cards for import.*

**1. SHRIMP SAUCE REPELLENT**

* **Type:** GEAR – Consumable
* **Icon(s):** [Bug Icon] [Odor Icon]
* **Keywords:** One-Time Use, Insect Repellent, Grit Boost
* **Rules:** Discard this card to cancel the effects of any insect-based Hazard just announced by the Goblet. Gain +1 Grit for your next Stat Check. The Goblet might comment on the smell.
* **Flavor:** "Goblet: 'Phew! That stings the ol' sensors... but the bugs seem to hate it more. Grit +1.'"
* **Image Prompt:** A squeeze bottle labeled "Bayou Blend Shrimp Sauce" next to mosquito wings mid-fall.

**2. FLIP-FLOPS (REINFORCED)**

* **Type:** GEAR – Passive
* **Icon(s):** [Footwear Icon] [Terrain Icon]
* **Keywords:** Movement Buff, Heat Reduction, Fashion Penalty
* **Rules:** While equipped, ignore 1 movement penalty per round announced by the Goblet (e.g., difficult terrain). Suffer -1 Charm on all relevant Stat Checks (Goblet will factor this in).
* **Flavor:** "Goblet: 'Function over fashion... a bold choice. Movement penalties eased, social standing... compromised.'"
* **Image Prompt:** Heavy-duty flip-flops with duct tape reinforcements and airboat tread soles.

**3. ANOTHER GEAR CARD**

* **Type:** GEAR – Tool
* **Icon(s):** [Tool Icon] [Utility Icon]
* **Keywords:** utility, durable, versatile
* **Rules:** This item can be used to perform a specific task. Describe its function and any limitations.
* **Flavor:** "Goblet: 'A reliable tool for any adventurer. Just don't drop it in the swamp.'"
* **Image Prompt:** A well-crafted handheld tool with wooden handle and metal parts, slightly rusted from humidity.
`;
    } else if (cardType === "treasure") {
      templateContent = `# Flomanji Treasure Cards Import Template

*This template shows how to format your treasure cards for import.*

**1. MYSTERIOUS GOLDEN AMULET**

* **Type:** TREASURE 
* **Value:** 2
* **Icon(s):** [Valuable Icon] [Ancient Icon]
* **Keywords:** valuable, ancient, mystical
* **Rules:** This treasure can be exchanged for 2 resources or kept for its special properties. Once per game, reroll any one die.
* **Flavor:** "Goblet: 'It's worth more to collectors than its weight in gold, but there's something... unusual about it.'"
* **Image Prompt:** An ornate golden amulet with strange symbols and a central blue gemstone that seems to glow from within.

**2. VINTAGE FLOMANJI POSTCARD**

* **Type:** TREASURE
* **Value:** 1
* **Icon(s):** [Collectible Icon] [Historical Icon]
* **Keywords:** memorabilia, lightweight
* **Rules:** Worth 1 resource. If you collect 3 different postcards, gain +1 Charm permanently.
* **Flavor:** "Goblet: 'A glimpse of Flomanji's golden era. Someone might pay for this nostalgia.'"
* **Image Prompt:** A faded, dog-eared postcard showing a vibrant tourist attraction with "Greetings from Flomanji!" in neon lettering.
`;
    } else if (cardType === "hazard") {
      templateContent = `# Flomanji Hazard Cards Import Template

*This template shows how to format your hazard cards for import.*

**1. SINKHOLE SURPRISE**

* **Type:** HAZARD – Environmental
* **Icon(s):** [Terrain Icon] [Danger Icon]
* **Difficulty:** Fight 7, Flee 5
* **Keywords:** trap, terrain, underground
* **Rules:** Make a Grit check DC 6 to notice before stepping in. On failure, lose one item (player choice) and take 1 damage.
* **Flavor:** "Goblet: 'The ground wasn't quite as solid as it appeared. Mind your step!'"
* **Image Prompt:** A perfectly circular hole in muddy ground, with various debris suspended mid-fall into the murky depths.

**2. TERRITORIAL GATOR**

* **Type:** HAZARD – Creature
* **Icon(s):** [Animal Icon] [Water Icon]
* **Difficulty:** Fight 8, Flee 6
* **Keywords:** reptile, aggressive, territorial
* **Rules:** Must make a Brawn check DC 8 to fight or Moxie check DC 6 to flee. Success on fight: gain Gator Tooth trophy. Failure: take 2 damage.
* **Flavor:** "Goblet: 'Those teeth aren't just for show, folks. Neither are those powerful jaws or bad attitude!'"
* **Image Prompt:** A massive alligator lurking mostly submerged, with only eyes and snout visible above murky water, teeth partially visible.
`;
    } else if (cardType === "npc") {
      templateContent = `# Flomanji NPC Cards Import Template

*This template shows how to format your NPC cards for import.*

**1. SWAMP TOUR GUIDE BETTY**

* **Type:** NPC – Guide
* **Icon(s):** [Character Icon] [Knowledge Icon]
* **Interaction:** Charm 6, Bribe 4
* **Keywords:** local, knowledgeable, suspicious
* **Rules:** Can provide passage through one Swamp region without Hazard checks. Will join party temporarily for 2 resources.
* **Flavor:** "Goblet: 'Betty knows these waters better than most folks know their own living rooms. Just don't ask about her ex-husband.'"
* **Image Prompt:** An older woman with weathered skin, wearing a wide-brimmed hat and vest with many pockets, standing confidently in a small airboat.

**2. ROADSIDE SOUVENIR VENDOR**

* **Type:** NPC – Vendor
* **Icon(s):** [Character Icon] [Trade Icon]
* **Interaction:** Charm 5, Haggle 7
* **Keywords:** business, opportunistic, informed
* **Rules:** Sells basic supplies at inflated prices (2 resources for any Gear card). Has information about nearby regions for 1 resource.
* **Flavor:** "Goblet: 'Everything's a deal if you don't know the actual value, according to this entrepreneur!'"
* **Image Prompt:** A sunburned man behind a rickety roadside stand filled with tacky tourist trinkets, alligator heads, and questionable "authentic" Flomanji memorabilia.
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
