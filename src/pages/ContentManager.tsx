
import React from "react";
import GameContentManager from "@/components/admin/GameContentManager";

const ContentManager = () => {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight">Flomanji Content Manager</h1>
        <div className="text-sm text-muted-foreground mt-1">
          Create and manage game cards, characters, missions, and content
        </div>
        <p className="mt-2">
          Use the tabs below to view and edit different card types. The NPC tab contains 
          character cards like Swamp Witch, Airboat Guide, and other characters for your game.
        </p>
      </div>
      <GameContentManager />
    </div>
  );
};

export default ContentManager;
