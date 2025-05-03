import { CardType } from "@/types/cards";

export interface CardFormValues {
  id?: string;
  name: string;
  type: CardType;
  icons?: Array<{ symbol: string; meaning: string; }>;
  keywords?: string[];
  rules?: string[];
  flavor?: string;
  imagePrompt?: string;
  imageUrl?: string;
  adminNotes?: string;
  isProtectedAsset?: boolean;

  // Treasure card fields
  value?: number;
  consumable?: boolean;
  passiveEffect?: string;
  useEffect?: string;

  // Hazard card fields
  subType?: 'environmental' | 'creature' | 'social' | 'weird';
  difficultyClasses?: {
    fight?: number;
    flee?: number;
    negotiate?: number;
    outsmart?: number;
    grit?: number;
    moxie?: number;
    charm?: number;
    weirdSense?: number;
  };
  onFailure?: string;
  onSuccess?: string;
  bossHazard?: boolean;
  gearBonuses?: Array<{
    itemName: string;
    effect: 'autoSuccess' | 'bonus';
    bonusValue?: number;
  }>;

  // Region card fields
  biomeTags?: string[];
  onEnter?: string;
  action?: string;
  rest?: string;
  bonusZone?: string;

  // NPC card fields
  checkDC?: number;
  actions?: Array<{
    description: string;
    cost: number;
    effect: string;
  }>;

  // Gear card fields
  category?: 'consumable' | 'tool' | 'weapon' | 'vehicle' | 'supply';
  uses?: number;
  actionCost?: number;
  passive?: string;
  statBonus?: {
    stat?: 'brawn' | 'moxie' | 'charm' | 'grit' | 'weirdSense';
    value?: number;
  };

  // Chaos card fields
  heatEffect?: number;
  globalEffect?: string;
  duration?: 'immediate' | 'ongoing' | 'end-of-round';

  // Flomanjified card fields
  originalRole?: string;
  chaosAction?: string;
  specialAbility?: string;

  // Secret card fields
  alignment?: 'saboteur' | 'innocent';
  winCondition?: string;

  // Automa card fields
  movement?: string;
  combatBonus?: number;
  specialEffect?: string;

  // Player Character fields
  role?: string;
  stats?: {
    brawn?: number;
    moxie?: number;
    charm?: number;
    grit?: number;
    weirdSense?: number;
  };
  ability?: {
    name?: string;
    description?: string;
  };
  health?: number;
  weirdness?: number;
  luck?: number;
  starterGear?: Array<{
    name: string;
    type: string;
    effect: string;
  }>;

  // Mission card fields
  hook?: string;
  mapLayout?: string;
  startingHeat?: number;
  extractionRegion?: string;
  objectives?: Array<{
    description: string;
    required: boolean;
    reward?: string;
    completionCheck?: string;
    difficultyLevel?: number;
  }>;
  scaling?: {
    small?: string;
    large?: string;
  };
  recommendedPlayerCount?: string;
  estimatedDuration?: number;
  difficultyRating?: number;
}
