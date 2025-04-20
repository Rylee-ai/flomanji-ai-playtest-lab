
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { CardType, GameCard } from '@/types/cards';
import { HazardCard } from '@/types/cards/hazard';
import { TreasureCard } from '@/types/cards/treasure';
import { NPCCard } from '@/types/cards/npc';
import { FlomanjifiedRoleCard } from '@/types/cards/flomanjified';
import { PlayerCharacterCard } from '@/types/cards/player-character';
import { ChaosCard } from '@/types/cards/chaos';
import { RegionCard } from '@/types/cards/region';
import { MissionSheet } from '@/types/cards/mission';
import { SecretObjectiveCard } from '@/types/cards/secret';

const CONTENT_DIR = path.join(process.cwd(), 'content/cards');

/**
 * Load all cards of a specific type from markdown files
 */
export function loadCardsByType<T extends GameCard>(type: CardType): T[] {
  const typeDir = path.join(CONTENT_DIR, type === 'artifact' ? 'treasures/artifacts' : type + 's');
  
  if (!fs.existsSync(typeDir)) {
    console.warn(`Directory not found: ${typeDir}`);
    return [];
  }
  
  const cards: T[] = [];
  
  // Function to process a file
  const processFile = (filePath: string) => {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);
      
      // Skip if the file doesn't match the requested type
      if (data.type !== type && !(type === 'artifact' && data.type === 'treasure')) {
        return;
      }
      
      // Extract the id from the filename
      const id = path.basename(filePath, path.extname(filePath));
      
      // Create a card object with the frontmatter data
      const card = {
        id,
        ...data,
      } as T;
      
      cards.push(card);
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error);
    }
  };
  
  // Function to walk through directory recursively
  const walkDir = (dir: string) => {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkDir(filePath);
      } else if (file.endsWith('.md')) {
        processFile(filePath);
      }
    });
  };
  
  walkDir(typeDir);
  return cards;
}

/**
 * Load all cards from markdown files
 */
export function loadAllMarkdownCards() {
  const hazards = loadCardsByType<HazardCard>('hazard');
  const treasures = loadCardsByType<TreasureCard>('treasure');
  const artifacts = loadCardsByType<TreasureCard>('artifact');
  const npcs = loadCardsByType<NPCCard>('npc');
  const flomanjified = loadCardsByType<FlomanjifiedRoleCard>('flomanjified');
  const playerCharacters = loadCardsByType<PlayerCharacterCard>('player-character');
  const chaos = loadCardsByType<ChaosCard>('chaos');
  const regions = loadCardsByType<RegionCard>('region');
  const missions = loadCardsByType<MissionSheet>('mission');
  const secrets = loadCardsByType<SecretObjectiveCard>('secret');
  
  return {
    hazards,
    treasures: [...treasures, ...artifacts],
    npcs,
    flomanjified,
    playerCharacters,
    chaos,
    regions,
    missions,
    secrets
  };
}
