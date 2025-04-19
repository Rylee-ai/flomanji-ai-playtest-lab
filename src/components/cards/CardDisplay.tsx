
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
import { Badge } from "@/components/ui/badge";

interface CardDisplayProps {
  card: GameCard;
  showDetails?: boolean;
}

export const CardDisplay = ({ card, showDetails = true }: CardDisplayProps) => {
  const renderCardTypeSpecificDetails = () => {
    if (!showDetails) return null;

    switch (card.type) {
      case 'treasure':
      case 'artifact':
        const treasureCard = card as TreasureCard;
        return (
          <div className="space-y-2">
            {treasureCard.value && <Badge variant="secondary">Value: {treasureCard.value}</Badge>}
            {treasureCard.consumable && <Badge variant="outline">Consumable</Badge>}
            {treasureCard.useEffect && (
              <div className="mt-2">
                <p className="text-sm font-medium">Use Effect:</p>
                <p className="text-sm">{treasureCard.useEffect}</p>
              </div>
            )}
            {treasureCard.passiveEffect && (
              <div className="mt-2">
                <p className="text-sm font-medium">Passive Effect:</p>
                <p className="text-sm">{treasureCard.passiveEffect}</p>
              </div>
            )}
          </div>
        );
      
      case 'secret':
        const secretCard = card as SecretObjectiveCard;
        return (
          <div className="space-y-2">
            <Badge variant={secretCard.alignment === 'saboteur' ? 'destructive' : 'secondary'}>
              {secretCard.alignment}
            </Badge>
            <div className="mt-2">
              <p className="text-sm font-medium">Win Condition:</p>
              <p className="text-sm">{secretCard.winCondition}</p>
            </div>
          </div>
        );
      
      case 'automa':
        const automaCard = card as AutomaCard;
        return (
          <div className="space-y-2">
            {automaCard.combatBonus && (
              <Badge variant="secondary">Combat: +{automaCard.combatBonus}</Badge>
            )}
            {automaCard.movement && (
              <div className="mt-2">
                <p className="text-sm font-medium">Movement:</p>
                <p className="text-sm">{automaCard.movement}</p>
              </div>
            )}
            {automaCard.specialEffect && (
              <div className="mt-2">
                <p className="text-sm font-medium">Special Effect:</p>
                <p className="text-sm">{automaCard.specialEffect}</p>
              </div>
            )}
          </div>
        );

      case 'region':
        const regionCard = card as RegionCard;
        return (
          <div className="space-y-2">
            <div className="flex gap-1 mb-2">
              {regionCard.biomeTags.map((tag, i) => (
                <Badge key={i} variant="outline">{tag}</Badge>
              ))}
            </div>
            <div>
              <p className="text-sm font-medium">On Enter:</p>
              <p className="text-sm">{regionCard.onEnter}</p>
            </div>
            {regionCard.rest && (
              <div>
                <p className="text-sm font-medium">Rest:</p>
                <p className="text-sm">{regionCard.rest}</p>
              </div>
            )}
            {regionCard.bonusZone && (
              <div>
                <p className="text-sm font-medium">Bonus Zone:</p>
                <p className="text-sm">{regionCard.bonusZone}</p>
              </div>
            )}
          </div>
        );

      case 'hazard':
        const hazardCard = card as HazardCard;
        return (
          <div className="space-y-2">
            {hazardCard.bossHazard && (
              <Badge variant="destructive">BOSS HAZARD</Badge>
            )}
            <div className="grid grid-cols-2 gap-2 mt-2">
              {hazardCard.difficultyClasses.fight && (
                <Badge variant="secondary">Fight DC: {hazardCard.difficultyClasses.fight}</Badge>
              )}
              {hazardCard.difficultyClasses.flee && (
                <Badge variant="secondary">Flee DC: {hazardCard.difficultyClasses.flee}</Badge>
              )}
              {hazardCard.difficultyClasses.negotiate && (
                <Badge variant="secondary">Negotiate DC: {hazardCard.difficultyClasses.negotiate}</Badge>
              )}
              {hazardCard.difficultyClasses.outsmart && (
                <Badge variant="secondary">Outsmart DC: {hazardCard.difficultyClasses.outsmart}</Badge>
              )}
            </div>
            <div className="mt-2">
              <p className="text-sm font-medium">On Failure:</p>
              <p className="text-sm">{hazardCard.onFailure}</p>
            </div>
            {hazardCard.onSuccess && (
              <div className="mt-2">
                <p className="text-sm font-medium">On Success:</p>
                <p className="text-sm">{hazardCard.onSuccess}</p>
              </div>
            )}
          </div>
        );

      case 'gear':
        const gearCard = card as GearCard;
        return (
          <div className="space-y-2">
            <div className="flex gap-2">
              {gearCard.consumable && <Badge variant="outline">Consumable</Badge>}
              {gearCard.category && <Badge variant="secondary">{gearCard.category}</Badge>}
            </div>
            {gearCard.statBonus && (
              <Badge variant="secondary">
                +{gearCard.statBonus.value} {gearCard.statBonus.stat}
              </Badge>
            )}
            {gearCard.passive && (
              <div className="mt-2">
                <p className="text-sm font-medium">Passive Effect:</p>
                <p className="text-sm">{gearCard.passive}</p>
              </div>
            )}
          </div>
        );

      case 'npc':
        const npcCard = card as NPCCard;
        return (
          <div className="space-y-2">
            {npcCard.checkDC && (
              <Badge variant="secondary">Check DC: {npcCard.checkDC}</Badge>
            )}
            {npcCard.actions && npcCard.actions.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium">Actions:</p>
                <div className="space-y-1">
                  {npcCard.actions.map((action, i) => (
                    <div key={i} className="text-sm">
                      <p className="font-medium">{action.description} ({action.cost} Action)</p>
                      <p className="text-xs">{action.effect}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'chaos':
        const chaosCard = card as ChaosCard;
        return (
          <div className="space-y-2">
            {chaosCard.heatEffect && (
              <Badge variant="destructive">Heat +{chaosCard.heatEffect}</Badge>
            )}
            {chaosCard.duration && (
              <Badge variant="outline">{chaosCard.duration}</Badge>
            )}
            <div className="mt-2">
              <p className="text-sm font-medium">Global Effect:</p>
              <p className="text-sm">{chaosCard.globalEffect}</p>
            </div>
          </div>
        );

      case 'flomanjified':
        const flomanjifiedCard = card as FlomanjifiedRoleCard;
        return (
          <div className="space-y-2">
            {flomanjifiedCard.originalRole && (
              <Badge variant="outline">Was: {flomanjifiedCard.originalRole}</Badge>
            )}
            <div className="mt-2">
              <p className="text-sm font-medium">Chaos Action:</p>
              <p className="text-sm">{flomanjifiedCard.chaosAction}</p>
            </div>
            {flomanjifiedCard.specialAbility && (
              <div className="mt-2">
                <p className="text-sm font-medium">Special Ability:</p>
                <p className="text-sm">{flomanjifiedCard.specialAbility}</p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-[350px] h-[500px] relative overflow-y-auto">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{card.name}</CardTitle>
          <div className="flex gap-1">
            {card.icons.map((icon, i) => (
              <span key={i} title={icon.meaning} className="text-lg">{icon.symbol}</span>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mt-1">
          {card.keywords.map((keyword, i) => (
            <Badge key={i} variant="outline" className="text-xs">
              {keyword}
            </Badge>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {renderCardTypeSpecificDetails()}
        
        {showDetails && card.rules.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Rules:</p>
            {card.rules.map((rule, i) => (
              <p key={i} className="text-sm">{rule}</p>
            ))}
          </div>
        )}
      </CardContent>
      
      {showDetails && card.flavor && (
        <CardFooter className="absolute bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t">
          <p className="italic text-sm text-muted-foreground">
            {card.flavor}
          </p>
        </CardFooter>
      )}
    </Card>
  );
};
