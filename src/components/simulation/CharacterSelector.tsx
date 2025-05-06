
import React from "react";
import { Check, Info } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PLAYER_CHARACTER_CARDS } from "@/lib/cards/player-character-cards";
import { PlayerCharacterCard } from "@/types/cards/player-character";

interface CharacterSelectorProps {
  selectedCharacters: string[];
  onCharacterSelect: (characterId: string) => void;
  onCharacterDeselect: (characterId: string) => void;
  maxCharacters?: number;
}

const CharacterSelector = ({
  selectedCharacters,
  onCharacterSelect,
  onCharacterDeselect,
  maxCharacters = 6,
}: CharacterSelectorProps) => {
  const handleCharacterToggle = (characterId: string) => {
    if (selectedCharacters.includes(characterId)) {
      onCharacterDeselect(characterId);
    } else {
      if (selectedCharacters.length < maxCharacters) {
        onCharacterSelect(characterId);
      }
    }
  };

  const renderCharacterStat = (label: string, value: number) => (
    <Badge variant="outline" className="text-xs">
      {label}: {value}
    </Badge>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Select Characters ({selectedCharacters.length}/{maxCharacters})</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm">
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">
                Select up to {maxCharacters} characters for this simulation. Each character's stats and abilities will influence their behavior during gameplay.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PLAYER_CHARACTER_CARDS.length > 0 ? (
          PLAYER_CHARACTER_CARDS.map((character: PlayerCharacterCard) => {
            const isSelected = selectedCharacters.includes(character.id);
            
            return (
              <Card 
                key={character.id} 
                className={`cursor-pointer hover:bg-accent/50 transition-colors ${
                  isSelected ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => handleCharacterToggle(character.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-md">{character.name}</CardTitle>
                      <CardDescription>{character.role}</CardDescription>
                    </div>
                    {isSelected && (
                      <div className="bg-primary text-primary-foreground rounded-full p-1">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {renderCharacterStat("B", character.stats.brawn)}
                      {renderCharacterStat("M", character.stats.moxie)}
                      {renderCharacterStat("C", character.stats.charm)}
                      {renderCharacterStat("G", character.stats.grit)}
                      {renderCharacterStat("W", character.stats.weirdSense)}
                    </div>
                    <div>
                      <p className="text-xs font-medium">{character.ability.name}</p>
                      <p className="text-xs line-clamp-2">{character.ability.description}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <div className="flex justify-between items-center w-full text-xs">
                    <span>Health: {character.health}</span>
                    <span>Weirdness: {character.weirdness}</span>
                    <span>Luck: {character.luck}</span>
                  </div>
                </CardFooter>
              </Card>
            );
          })
        ) : (
          <div className="col-span-3 text-center py-8 text-muted-foreground">
            No player characters available. Please add some characters to the library.
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterSelector;
