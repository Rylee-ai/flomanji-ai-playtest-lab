
import React from "react";
import { GameCard, CardType } from "@/types/cards";
import { Badge } from "@/components/ui/badge";
import { CharacterInfoDisplay } from "./CharacterInfoDisplay";
import { PlayerCharacterCard } from "@/types/cards/player-character";
import { GearCard } from "@/types/cards/gear";
import { NPCCard } from "@/types/cards/npc";
import { TreasureCard } from "@/types/cards";
import { HazardCard } from "@/types/cards/hazard";
import { ChaosCard } from "@/types/cards/chaos";
import { FlomanjifiedRoleCard } from "@/types/cards/flomanjified";
import { RegionCard } from "@/types/cards/region";
import { SecretObjectiveCard, AutomaCard } from "@/types/cards";

interface CardInfoDisplayProps {
  card: GameCard;
}

export const CardInfoDisplay = ({ card }: CardInfoDisplayProps) => {
  // Generic card type-specific info display selector
  switch (card.type) {
    case 'player-character':
      return <CharacterInfoDisplay card={card as PlayerCharacterCard} />;
    
    case 'gear':
      return <GearCardInfoPreview card={card as GearCard} />;
    
    case 'npc':
      return <NPCCardInfoPreview card={card as NPCCard} />;
      
    case 'treasure':
    case 'artifact':
      return <TreasureCardInfoPreview card={card as TreasureCard} />;
    
    case 'hazard':
      return <HazardCardInfoPreview card={card as HazardCard} />;
    
    case 'chaos':
      return <ChaosCardInfoPreview card={card as ChaosCard} />;
    
    case 'flomanjified':
      return <FlomanjifiedCardInfoPreview card={card as FlomanjifiedRoleCard} />;
    
    case 'region':
      return <RegionCardInfoPreview card={card as RegionCard} />;
      
    case 'secret':
      return <SecretCardInfoPreview card={card as SecretObjectiveCard} />;
      
    case 'automa':
      return <AutomaCardInfoPreview card={card as AutomaCard} />;
      
    default:
      // For card types without specific displays, just show card type
      return (
        <div className="mt-2">
          <Badge variant="outline">{card.type}</Badge>
        </div>
      );
  }
};

// Preview components for each card type
const GearCardInfoPreview = ({ card }: { card: GearCard }) => (
  <div className="space-y-2 mt-2">
    <div className="flex gap-2 flex-wrap">
      {card.consumable && <Badge variant="outline">Consumable</Badge>}
      {card.category && <Badge variant="secondary">{card.category}</Badge>}
    </div>
    {card.statBonus && (
      <Badge variant="secondary">
        +{card.statBonus.value} {card.statBonus.stat}
      </Badge>
    )}
  </div>
);

const NPCCardInfoPreview = ({ card }: { card: NPCCard }) => (
  <div className="space-y-2 mt-2">
    {card.checkDC && (
      <Badge variant="secondary">Check DC: {card.checkDC}</Badge>
    )}
    {card.actions && card.actions.length > 0 && (
      <p className="text-xs text-muted-foreground mt-1">
        {card.actions.length} Action{card.actions.length !== 1 ? 's' : ''}
      </p>
    )}
  </div>
);

const TreasureCardInfoPreview = ({ card }: { card: TreasureCard }) => (
  <div className="space-y-2 mt-2">
    <div className="flex gap-2 flex-wrap">
      {card.value && <Badge variant="secondary">Value: {card.value}</Badge>}
      {card.consumable && <Badge variant="outline">Consumable</Badge>}
    </div>
  </div>
);

const HazardCardInfoPreview = ({ card }: { card: HazardCard }) => (
  <div className="space-y-2 mt-2">
    {card.bossHazard && (
      <Badge variant="destructive">BOSS</Badge>
    )}
    <div className="flex flex-wrap gap-1 mt-1">
      {card.difficultyClasses.fight && (
        <Badge variant="outline" className="text-xs">Fight: {card.difficultyClasses.fight}</Badge>
      )}
      {card.difficultyClasses.flee && (
        <Badge variant="outline" className="text-xs">Flee: {card.difficultyClasses.flee}</Badge>
      )}
    </div>
  </div>
);

const ChaosCardInfoPreview = ({ card }: { card: ChaosCard }) => (
  <div className="space-y-2 mt-2">
    {card.heatEffect && (
      <Badge variant="destructive">Heat +{card.heatEffect}</Badge>
    )}
    {card.duration && (
      <Badge variant="outline">{card.duration}</Badge>
    )}
  </div>
);

const FlomanjifiedCardInfoPreview = ({ card }: { card: FlomanjifiedRoleCard }) => (
  <div className="space-y-2 mt-2">
    {card.originalRole && (
      <Badge variant="outline">Was: {card.originalRole}</Badge>
    )}
  </div>
);

const RegionCardInfoPreview = ({ card }: { card: RegionCard }) => (
  <div className="space-y-2 mt-2">
    <div className="flex gap-1 flex-wrap">
      {card.biomeTags.slice(0, 2).map((tag, i) => (
        <Badge key={i} variant="outline">{tag}</Badge>
      ))}
      {card.biomeTags.length > 2 && (
        <Badge variant="outline">+{card.biomeTags.length - 2}</Badge>
      )}
    </div>
  </div>
);

const SecretCardInfoPreview = ({ card }: { card: SecretObjectiveCard }) => (
  <div className="space-y-2 mt-2">
    <Badge variant={card.alignment === 'saboteur' ? 'destructive' : 'secondary'}>
      {card.alignment}
    </Badge>
  </div>
);

const AutomaCardInfoPreview = ({ card }: { card: AutomaCard }) => (
  <div className="space-y-2 mt-2">
    {card.combatBonus && (
      <Badge variant="secondary">Combat: +{card.combatBonus}</Badge>
    )}
  </div>
);
