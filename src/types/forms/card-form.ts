import { CardType, GameCard } from "@/types/cards";

export interface CardFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CardFormValues) => void;
  initialData?: GameCard;
  activeTab: string;
}

export type CardFormValues = {
  name: string;
  type: CardType;
  keywords?: string[];
  icons?: { symbol: string; meaning: string; }[];
  rules?: string[];
  flavor?: string;
  imagePrompt?: string;
  value?: number;
  consumable?: boolean;
  passiveEffect?: string;
  useEffect?: string;
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
  gearBonuses?: {
    itemName: string;
    effect: 'autoSuccess' | 'bonus';
    bonusValue?: number;
  }[];
  biomeTags?: string[];
  onEnter?: string;
  action?: string;
  rest?: string;
  bonusZone?: string;
  checkDC?: number;
  actions?: {
    description: string;
    cost: number;
    effect: string;
  }[];
  category?: 'consumable' | 'tool' | 'weapon' | 'vehicle' | 'supply';
  uses?: number;
  actionCost?: number;
  passive?: string;
  statBonus?: {
    stat?: 'brawn' | 'moxie' | 'charm' | 'grit' | 'weirdSense';
    value?: number;
  };
  ability?: {
    name?: string;
    description?: string;
  };
  health?: number;
  weirdness?: number;
  luck?: number;
  starterGear?: { name: string; type: string; effect: string; }[];
  role?: string;
  stats?: {
    brawn: number;
    moxie: number;
    charm: number;
    grit: number;
    weirdSense: number;
  };
};

export { missionSubtypes } from "@/schemas/card-form-schema";
