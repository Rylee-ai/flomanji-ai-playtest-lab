
import { CardType } from "@/types/cards";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CardTypeSelectorProps {
  cardType: CardType;
  setCardType: (value: CardType) => void;
  defaultCardType: CardType;
}

export function CardTypeSelector({
  cardType,
  setCardType,
  defaultCardType
}: CardTypeSelectorProps) {
  const cardTypes: { value: CardType; label: string }[] = [
    { value: "gear", label: "Gear Cards" },
    { value: "treasure", label: "Treasure Cards" },
    { value: "hazard", label: "Hazard Cards" },
    { value: "npc", label: "NPC Cards" },
    { value: "region", label: "Region Cards" },
    { value: "chaos", label: "Chaos Cards" },
    { value: "flomanjified", label: "Flomanjified Cards" },
    { value: "player-character", label: "Player Character Cards" },
    { value: "secret", label: "Secret Objective Cards" },
    { value: "mission", label: "Mission Cards" },
    { value: "automa", label: "Automa Cards" },
  ];

  return (
    <div className="space-y-2">
      <label htmlFor="card-type" className="text-sm font-medium">
        Card Type
      </label>
      <Select 
        value={cardType} 
        onValueChange={value => setCardType(value as CardType)}
      >
        <SelectTrigger id="card-type">
          <SelectValue placeholder="Select card type" />
        </SelectTrigger>
        <SelectContent>
          {cardTypes.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-xs text-muted-foreground mt-1">
        Select the type of cards you're importing
      </p>
    </div>
  );
}
