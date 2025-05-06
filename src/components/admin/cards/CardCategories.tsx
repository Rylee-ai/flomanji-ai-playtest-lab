
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CardType } from "@/types/cards";

interface CardCategoryProps {
  activeTab: CardType;
  cardCounts: Record<CardType, number>;
}

export const CharacterCards: React.FC<CardCategoryProps> = ({ activeTab, cardCounts }) => {
  return (
    <div>
      <h3 className="text-sm font-medium mb-2 text-muted-foreground">Characters</h3>
      <TabsList className="flex flex-col space-y-1 h-auto bg-transparent p-0">
        <TabsTrigger value="player-character" className="w-full justify-between">
          Player Characters
          <Badge 
            variant={activeTab === "player-character" ? "default" : "secondary"} 
            className="ml-2">
            {cardCounts["player-character"]}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="npc" className="w-full justify-between">
          NPC Characters
          <Badge 
            variant={activeTab === "npc" ? "default" : "secondary"} 
            className="ml-2">
            {cardCounts["npc"]}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="flomanjified" className="w-full justify-between">
          Flomanjified Roles
          <Badge 
            variant={activeTab === "flomanjified" ? "default" : "secondary"} 
            className="ml-2">
            {cardCounts["flomanjified"]}
          </Badge>
        </TabsTrigger>
      </TabsList>
    </div>
  );
};

export const ItemsAndEncounterCards: React.FC<CardCategoryProps> = ({ activeTab, cardCounts }) => {
  return (
    <div>
      <h3 className="text-sm font-medium mb-2 text-muted-foreground">Items & Encounters</h3>
      <TabsList className="flex flex-col space-y-1 h-auto bg-transparent p-0">
        <TabsTrigger value="treasure" className="w-full justify-between">
          Treasure Cards
          <Badge 
            variant={activeTab === "treasure" ? "default" : "secondary"} 
            className="ml-2">
            {cardCounts["treasure"]}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="gear" className="w-full justify-between">
          Gear Cards
          <Badge 
            variant={activeTab === "gear" ? "default" : "secondary"} 
            className="ml-2">
            {cardCounts["gear"]}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="hazard" className="w-full justify-between">
          Hazard Cards
          <Badge 
            variant={activeTab === "hazard" ? "default" : "secondary"} 
            className="ml-2">
            {cardCounts["hazard"]}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="chaos" className="w-full justify-between">
          Chaos Cards
          <Badge 
            variant={activeTab === "chaos" ? "default" : "secondary"} 
            className="ml-2">
            {cardCounts["chaos"]}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="region" className="w-full justify-between">
          Region Cards
          <Badge 
            variant={activeTab === "region" ? "default" : "secondary"} 
            className="ml-2">
            {cardCounts["region"]}
          </Badge>
        </TabsTrigger>
      </TabsList>
    </div>
  );
};

export const GameStructureCards: React.FC<CardCategoryProps> = ({ activeTab, cardCounts }) => {
  return (
    <div>
      <h3 className="text-sm font-medium mb-2 text-muted-foreground">Game Structure</h3>
      <TabsList className="flex flex-col space-y-1 h-auto bg-transparent p-0">
        <TabsTrigger value="mission" className="w-full justify-between">
          Mission Sheets
          <Badge 
            variant={activeTab === "mission" ? "default" : "secondary"} 
            className="ml-2">
            {cardCounts["mission"]}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="secret" className="w-full justify-between">
          Secret Objectives
          <Badge 
            variant={activeTab === "secret" ? "default" : "secondary"} 
            className="ml-2">
            {cardCounts["secret"]}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="automa" className="w-full justify-between">
          Automa Cards
          <Badge 
            variant={activeTab === "automa" ? "default" : "secondary"} 
            className="ml-2">
            {cardCounts["automa"]}
          </Badge>
        </TabsTrigger>
      </TabsList>
    </div>
  );
};
