
import { SimulationConfig } from "@/types";
import { RegionCard } from "@/types/cards/region";

/**
 * Handles game setup tasks including region initialization
 */
export class GameSetupManager {
  /**
   * Set up regions for the game based on mission type
   */
  public async setupRegions(gameState: any, config: SimulationConfig): Promise<void> {
    // Default regions as fallback
    const defaultRegions = [
      { id: "start", name: "Starting Area", connections: ["path1"], biome: "Residential" },
      { id: "path1", name: "Path 1", connections: ["start", "path2"], biome: "Highway" },
      { id: "path2", name: "Path 2", connections: ["path1", "exit"], biome: "Swamp" },
      { id: "exit", name: "Exit", connections: ["path2"], biome: "Coastal" }
    ];
    
    // Set up regions based on mission type
    switch (config.missionType) {
      case "exploration":
        gameState.regions = [
          { id: "start", name: "Research Camp", connections: ["jungle_path"], biome: "Residential" },
          { id: "jungle_path", name: "Dense Jungle Path", connections: ["start", "river_crossing", "ancient_ruins"], biome: "Swamp" },
          { id: "river_crossing", name: "River Crossing", connections: ["jungle_path", "temple_entrance"], biome: "Coastal" },
          { id: "ancient_ruins", name: "Ancient Ruins", connections: ["jungle_path", "temple_entrance"], biome: "Urban" },
          { id: "temple_entrance", name: "Temple Entrance", connections: ["river_crossing", "ancient_ruins", "inner_temple"], biome: "Urban" },
          { id: "inner_temple", name: "Inner Temple", connections: ["temple_entrance"], biome: "Underground" }
        ];
        gameState.currentRegion = "start";
        break;
        
      case "escape":
        gameState.regions = [
          { id: "start", name: "Treasure Chamber", connections: ["collapsing_hall"], biome: "Underground" },
          { id: "collapsing_hall", name: "Collapsing Hallway", connections: ["start", "flood_chamber"], biome: "Underground" },
          { id: "flood_chamber", name: "Flooding Chamber", connections: ["collapsing_hall", "jungle_exit"], biome: "Underground" },
          { id: "jungle_exit", name: "Temple Exit", connections: ["flood_chamber", "dense_jungle"], biome: "Urban" },
          { id: "dense_jungle", name: "Dense Jungle", connections: ["jungle_exit", "river_edge"], biome: "Swamp" },
          { id: "river_edge", name: "River's Edge", connections: ["dense_jungle", "extraction"], biome: "Coastal" },
          { id: "extraction", name: "Extraction Point", connections: ["river_edge"], biome: "Highway" }
        ];
        gameState.currentRegion = "start";
        break;
        
      case "escort":
        gameState.regions = [
          { id: "start", name: "Jungle Outpost", connections: ["trail_head"], biome: "Residential" },
          { id: "trail_head", name: "Trail Head", connections: ["start", "marsh_crossing"], biome: "Highway" },
          { id: "marsh_crossing", name: "Marsh Crossing", connections: ["trail_head", "village_ruins"], biome: "Swamp" },
          { id: "village_ruins", name: "Village Ruins", connections: ["marsh_crossing", "temple_road"], biome: "Urban" },
          { id: "temple_road", name: "Temple Road", connections: ["village_ruins", "extraction"], biome: "Highway" },
          { id: "extraction", name: "Extraction Helicopter", connections: ["temple_road"], biome: "Urban" }
        ];
        gameState.currentRegion = "start";
        break;
        
      case "collection":
        gameState.regions = [
          { id: "start", name: "Expedition Base", connections: ["north_jungle", "east_ruins"], biome: "Residential" },
          { id: "north_jungle", name: "Northern Jungle", connections: ["start", "hidden_temple", "ancient_tree"], biome: "Swamp" },
          { id: "east_ruins", name: "Eastern Ruins", connections: ["start", "submerged_city", "ancient_tree"], biome: "Urban" },
          { id: "hidden_temple", name: "Hidden Temple", connections: ["north_jungle"], biome: "Urban" },
          { id: "submerged_city", name: "Submerged City", connections: ["east_ruins"], biome: "Coastal" },
          { id: "ancient_tree", name: "Ancient Tree", connections: ["north_jungle", "east_ruins"], biome: "Swamp" }
        ];
        gameState.currentRegion = "start";
        break;
        
      case "boss":
        gameState.regions = [
          { id: "start", name: "Jungle Entrance", connections: ["outer_temple"], biome: "Swamp" },
          { id: "outer_temple", name: "Outer Temple", connections: ["start", "ritual_chamber"], biome: "Urban" },
          { id: "ritual_chamber", name: "Ritual Chamber", connections: ["outer_temple", "boss_lair"], biome: "Underground" },
          { id: "boss_lair", name: "Guardian's Lair", connections: ["ritual_chamber"], biome: "Underground" }
        ];
        gameState.currentRegion = "start";
        break;
        
      default:
        gameState.regions = defaultRegions;
        gameState.currentRegion = "start";
    }
    
    // Add region effects based on biome
    gameState.regions = gameState.regions.map((region: any) => {
      const regionEffects = this.getRegionEffects(region.biome);
      return {
        ...region,
        effects: regionEffects
      };
    });
  }
  
  /**
   * Get region effects based on biome type
   */
  private getRegionEffects(biome: string): {onEnter?: string, action?: string, rest?: string} {
    switch (biome) {
      case "Swamp":
        return {
          onEnter: "Characters must pass a Grit check or take 1 damage from the difficult terrain.",
          action: "Moxie checks suffer -1 penalty in this region.",
          rest: "When resting here, players may recover 1 health but risk gaining 1 heat."
        };
        
      case "Urban":
        return {
          onEnter: "Characters may find useful gear or information here.",
          action: "Charm checks gain +1 bonus in this region.",
          rest: "When resting here, players may recover gear or reduce heat."
        };
        
      case "Coastal":
        return {
          onEnter: "Players may find treasures washed ashore here.",
          action: "Movement is slower but hazard encounters are less likely.",
          rest: "When resting here, players may recover 2 health but must discard 1 gear."
        };
        
      case "Highway":
        return {
          onEnter: "Faster travel but higher chance of NPC encounters.",
          action: "Characters may move an extra region as part of a move action.",
          rest: "When resting here, players risk increasing heat."
        };
        
      case "Underground":
        return {
          onEnter: "Dark and dangerous. Weirdness checks on entry or gain 1 Weirdness.",
          action: "Weird Sense checks gain +1 bonus in this region.",
          rest: "When resting here, players may reduce weirdness but risk collapsing paths."
        };
        
      case "Residential":
        return {
          onEnter: "Safe haven with resources and rest opportunities.",
          action: "Trading and healing actions are more effective here.",
          rest: "When resting here, recover 2 health and reduce 1 heat."
        };
        
      default:
        return {
          onEnter: "Standard region with no special effects.",
          action: "No special action bonuses or penalties.",
          rest: "Standard rest effects apply."
        };
    }
  }
}
