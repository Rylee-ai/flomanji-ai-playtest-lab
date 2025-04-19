
import React from 'react';
import { GameCard, SecretObjectiveCard, TreasureCard, AutomaCard } from '@/types/cards';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { RegionCard } from '@/types/cards/region';
import { NPCCard } from '@/types/cards/npc';
import { MissionSheet } from '@/types/cards/mission';
import { HazardCard } from '@/types/cards/hazard';
import { GearCard } from '@/types/cards/gear';
import { ChaosCard } from '@/types/cards/chaos';
import { FlomanjifiedRoleCard } from '@/types/cards/flomanjified';

interface CardDisplayProps {
  card: GameCard;
  showDetails?: boolean;
}

export const CardDisplay = ({ card, showDetails = true }: CardDisplayProps) => {
  const renderCardTypeSpecificDetails = () => {
    if (!showDetails) return null;

    switch (card.type) {
      case 'treasure':
        const treasureCard = card as TreasureCard;
        return (
          <div className="mt-2">
            {treasureCard.value && <p className="text-sm">Value: {treasureCard.value}</p>}
            {treasureCard.consumable && <p className="text-sm">Consumable: Yes</p>}
          </div>
        );
      
      case 'secret':
        const secretCard = card as SecretObjectiveCard;
        return (
          <div className="mt-2">
            <p className="text-sm">Alignment: {secretCard.alignment}</p>
            <p className="text-sm">Win Condition: {secretCard.winCondition}</p>
          </div>
        );
      
      case 'automa':
        const automaCard = card as AutomaCard;
        return (
          <div className="mt-2">
            {automaCard.combatBonus && <p className="text-sm">Combat Bonus: +{automaCard.combatBonus}</p>}
            {automaCard.movement && <p className="text-sm">Movement: {automaCard.movement}</p>}
            {automaCard.specialEffect && <p className="text-sm">Special Effect: {automaCard.specialEffect}</p>}
          </div>
        );

      case 'region':
        const regionCard = card as RegionCard;
        return (
          <div className="mt-2">
            <p className="text-sm">On Enter: {regionCard.onEnter}</p>
            {regionCard.rest && <p className="text-sm">Rest: {regionCard.rest}</p>}
            {regionCard.bonusZone && <p className="text-sm">Bonus Zone: {regionCard.bonusZone}</p>}
          </div>
        );

      case 'npc':
        const npcCard = card as NPCCard;
        return (
          <div className="mt-2">
            {npcCard.checkDC && <p className="text-sm">Check DC: {npcCard.checkDC}</p>}
            {npcCard.actions && npcCard.actions.length > 0 && (
              <div>
                <p className="text-sm font-medium mt-2">Actions:</p>
                <ul className="text-xs space-y-1 list-disc list-inside">
                  {npcCard.actions.map((action, i) => (
                    <li key={i}>{action.description} ({action.cost} Action): {action.effect}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );

      case 'mission':
        const missionCard = card as MissionSheet;
        return (
          <div className="mt-2">
            <p className="text-sm">Hook: {missionCard.hook}</p>
            <p className="text-sm">Heat: {missionCard.startingHeat}</p>
            <p className="text-sm">Extract: {missionCard.extractionRegion}</p>
            {missionCard.objectives && missionCard.objectives.length > 0 && (
              <div>
                <p className="text-sm font-medium mt-2">Objectives:</p>
                <ul className="text-xs space-y-1 list-disc list-inside">
                  {missionCard.objectives.map((obj, i) => (
                    <li key={i}>{obj.description} {obj.required ? '(Required)' : '(Optional)'}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );

      case 'hazard':
        const hazardCard = card as HazardCard;
        return (
          <div className="mt-2">
            {hazardCard.difficultyClasses && (
              <div className="grid grid-cols-2 gap-1 text-xs">
                {hazardCard.difficultyClasses.fight && <p>Fight DC: {hazardCard.difficultyClasses.fight}</p>}
                {hazardCard.difficultyClasses.flee && <p>Flee DC: {hazardCard.difficultyClasses.flee}</p>}
                {hazardCard.difficultyClasses.negotiate && <p>Negotiate DC: {hazardCard.difficultyClasses.negotiate}</p>}
                {hazardCard.difficultyClasses.outsmart && <p>Outsmart DC: {hazardCard.difficultyClasses.outsmart}</p>}
              </div>
            )}
            <p className="text-sm mt-1">On Failure: {hazardCard.onFailure}</p>
            {hazardCard.bossHazard && <p className="text-sm font-medium text-red-500">BOSS HAZARD</p>}
          </div>
        );

      case 'gear':
        const gearCard = card as GearCard;
        return (
          <div className="mt-2">
            {gearCard.actionCost !== undefined && <p className="text-sm">Action Cost: {gearCard.actionCost}</p>}
            {gearCard.consumable && <p className="text-sm">Consumable: Yes</p>}
            {gearCard.statBonus && (
              <p className="text-sm">Bonus: +{gearCard.statBonus.value} {gearCard.statBonus.stat}</p>
            )}
          </div>
        );

      case 'chaos':
        const chaosCard = card as ChaosCard;
        return (
          <div className="mt-2">
            <p className="text-sm">Global Effect: {chaosCard.globalEffect}</p>
            {chaosCard.heatEffect && <p className="text-sm">Heat: +{chaosCard.heatEffect}</p>}
            {chaosCard.duration && <p className="text-sm">Duration: {chaosCard.duration}</p>}
          </div>
        );

      case 'flomanjified':
        const flomanjifiedCard = card as FlomanjifiedRoleCard;
        return (
          <div className="mt-2">
            <p className="text-sm">Chaos Action: {flomanjifiedCard.chaosAction}</p>
            {flomanjifiedCard.specialAbility && <p className="text-sm">Special: {flomanjifiedCard.specialAbility}</p>}
            {flomanjifiedCard.originalRole && <p className="text-sm">Original: {flomanjifiedCard.originalRole}</p>}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-[300px] h-[450px] relative overflow-y-auto">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{card.name}</CardTitle>
          <div className="flex gap-1">
            {card.icons.map((icon, i) => (
              <span key={i} title={icon.meaning}>{icon.symbol}</span>
            ))}
          </div>
        </div>
        <div className="text-sm font-medium mt-1">
          {card.keywords.join(' · ')}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-2">
        {renderCardTypeSpecificDetails()}
        
        {showDetails && (
          <div className="space-y-2 mt-3">
            <p className="text-sm font-medium">Rules:</p>
            {card.rules.map((rule, i) => (
              <p key={i} className="text-xs">{rule}</p>
            ))}
          </div>
        )}
      </CardContent>
      
      {showDetails && (
        <CardFooter className="absolute bottom-0 left-0 right-0 p-4 bg-background/80">
          <p className="italic text-sm text-muted-foreground">
            {card.flavor}
          </p>
        </CardFooter>
      )}
    </Card>
  );
};
