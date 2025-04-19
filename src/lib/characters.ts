
import { FlomanjiCharacter, CharacterStats } from "@/types";

export const PREDEFINED_CHARACTERS: FlomanjiCharacter[] = [
  {
    id: "eddie",
    name: "Eddie \"Airboat\" Alvarez",
    role: "Everglades Tour Guide",
    stats: {
      brawn: 2,
      moxie: 4,
      charm: 1,
      grit: 2,
      weirdSense: 1
    },
    ability: {
      name: "Swamp Skimmer",
      description: "Once per turn when you enter a Swamp Region, ignore its swamp-movement cost."
    },
    health: 5,
    weirdness: 0,
    luck: 5,
    starterGear: [
      {
        name: "Airboat",
        type: "Vehicle",
        effect: "Special movement in swamp regions"
      },
      {
        name: "Machete",
        type: "Weapon",
        effect: "+2 Damage melee; 0 Actions to clear vines"
      }
    ]
  },
  {
    id: "sandy",
    name: "Sandy Dupree",
    role: "Retired Roller-Derby Champion",
    stats: {
      brawn: 2,
      moxie: 3,
      charm: 2,
      grit: 2,
      weirdSense: 1
    },
    ability: {
      name: "Roller Reflexes",
      description: "When you Move (1 Action), treat your Moxie as +2 for that Move."
    },
    health: 5,
    weirdness: 0,
    luck: 5,
    starterGear: [
      {
        name: "Baseball Bat",
        type: "Weapon",
        effect: "1 Damage; +1 Grit vs Creatures/Social"
      },
      {
        name: "First Aid Kit",
        type: "Item",
        effect: "heal 2"
      }
    ]
  }
  // Add more characters as needed
];

export const getCharacterById = (id: string): FlomanjiCharacter | undefined => {
  return PREDEFINED_CHARACTERS.find(char => char.id === id);
};

export const validateCharacterStats = (stats: CharacterStats): boolean => {
  const totalPoints = Object.values(stats).reduce((sum, stat) => sum + Number(stat), 0);
  return totalPoints <= 10 && Object.values(stats).every(stat => Number(stat) >= 0 && Number(stat) <= 5);
};
