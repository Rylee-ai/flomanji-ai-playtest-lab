
export interface CharacterStats {
  brawn: number;
  moxie: number;
  charm: number;
  grit: number;
  weirdSense: number;
}

export interface CharacterAbility {
  name: string;
  description: string;
}

export interface FlomanjiCharacter {
  id: string;
  name: string;
  role: string;
  stats: CharacterStats;
  ability: CharacterAbility;
  health: number;
  weirdness: number;
  luck: number;
  starterGear?: string[];
  position?: string;
}
