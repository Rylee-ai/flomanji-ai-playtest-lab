
# Flomanji: The AI Playtest Lab

![Flomanji Card Back](/lovable-uploads/e5635414-17a2-485e-86cb-feaf926b9af5.png)

An AI-powered simulation tool for playtesting the Flomanji tabletop role-playing game - a semi-cooperative survival horror adventure set in an alternate 1987 Florida overrun with supernatural threats.

## 🌴 Welcome to Flomanji

> *"The Goblet trembles in your hand. The heat rises. Something watches from the swamp's edge. Welcome to Florida, 1987 - but not as you remember it. Welcome to Flomanji."*

Flomanji is a unique tabletop RPG that blends horror, absurdist comedy, and cooperative gameplay, all centered around the mysterious Flomanji Goblet - a sentient drinking vessel that serves as game master, dice roller, and unpredictable chaos engine. This digital Playtest Lab allows game designers to simulate playtests using advanced AI agents, generating detailed logs and analytics to refine the game experience.

## 🎮 Game Systems

### Twin-Timer Mechanics

Flomanji's core tension comes from two escalating threat meters:

- **Heat**: A global danger counter (0-10) that increases each round
- **Weirdness**: Individual corruption meters (0-10) that transform characters when maxed

When a character's Weirdness reaches 10, they become "Flomanjified" - transformed into a chaotic entity with unpredictable new abilities and motivations.

### Core Gameplay

- **Action Economy**: Each player takes 2 actions per turn from: Move, Use Gear, Interact, Team-Up, Rest, or Mission
- **Dice System**: 2d6 + Stat checks against difficulty classes
- **Card-Driven Elements**: Gear, hazards, treasures, and character abilities represented by various card types
- **The Flomanji Goblet**: Acts as game master, dice roller, and atmosphere generator with various voice personalities

## 🧪 AI Playtest Lab Features

### Simulation Architecture

The Playtest Lab uses a sophisticated multi-agent architecture built around the `SimulationOrchestrator` class, which manages:

- Game Master Agent: Narrates the game and responds to player actions
- Player Agents: Make decisions based on character profiles and game state
- Critic Agent: Analyzes gameplay for balance and narrative quality

### Simulation Components

- **SimulationRunner**: Coordinates the overall simulation process
- **RoundManager**: Handles round progression and phase sequencing
- **PlayerManager**: Controls character actions and decision-making
- **GameStateManager**: Tracks the complete game state including regions, objectives, and character stats
- **NarrationManager**: Generates narrative descriptions and scenario text

### Analytical Tools

- Mission success rates across different character combinations
- Heat and Weirdness progression charts
- Objective completion statistics
- Critical failure points and bottlenecks
- Character effectiveness comparisons

## 🃏 Card Types

The game features multiple card categories, each managed through dedicated collections:

- **Treasure & Artifacts**: Valuable items with passive and active effects
- **Hazards**: Environmental, creature, social, and supernatural threats
- **Gear**: Tools, weapons, and equipment to help players survive
- **Regions**: Map sections with unique effects and challenges
- **Character**: Player-controlled survivors with unique abilities
- **Chaos**: Global effects that alter gameplay rules temporarily
- **Flomanjified**: Transformation cards for characters who succumb to Weirdness

## 👥 Character System

### Core Stats

Characters are defined by five primary attributes:

- **Brawn**: Physical strength for combat and feats of power
- **Moxie**: Agility and quick thinking for evasion and fast action
- **Charm**: Social ability for negotiation and interaction
- **Grit**: Resilience and determination for enduring hardship
- **Weird Sense**: Sensitivity to supernatural phenomena

Each character also has health, weirdness, and luck meters, along with unique abilities and starter gear.

## 📋 Mission Types

The system supports various mission templates:

- **Exploration**: Discover secrets and map unknown regions
- **Escape**: Flee from overwhelming danger to a safe extraction point
- **Escort**: Protect NPCs while navigating hazards
- **Collection**: Gather specific treasures or artifacts
- **Boss**: Confront and defeat a powerful entity
- **Solo**: Single-player challenges with specialized rules

## 🖥️ Technology Stack

- **Frontend**: React + TypeScript with TailwindCSS + Shadcn UI
- **AI Integration**: OpenRouter API for language model access
- **State Management**: Custom game state system with React Context
- **Data Storage**: Local storage with optional cloud sync
- **Development Tooling**: Vite, ESLint, TypeScript

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- OpenRouter API key

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Access the app at http://localhost:8080

### Setting Up OpenRouter API

1. Navigate to the Settings page
2. Enter your OpenRouter API key
3. Select your preferred language model
4. Click "Save Settings"

## 📊 Using the Playtest Lab

### Running a Simulation

1. Navigate to Simulations > New Simulation
2. Configure your scenario (rounds, player count, characters, etc.)
3. Set mission parameters and advanced options
4. Click "Start Simulation"
5. Review the resulting play log and critic feedback

### Analyzing Results

1. Navigate to the Simulations page
2. Select a simulation from the list
3. View the full transcript, critique, and analytics
4. Add your own annotations for future reference

### Managing Game Content

1. Navigate to the Content page
2. Create, edit, or delete cards of any type
3. Preview how cards will appear in-game
4. Import/export card collections

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
