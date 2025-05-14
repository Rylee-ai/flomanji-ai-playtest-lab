
# Flomanji: The AI Playtest Lab

![Flomanji Card Back](/lovable-uploads/e5635414-17a2-485e-86cb-feaf926b9af5.png)

A sophisticated AI-powered simulation tool for playtesting the Flomanji tabletop role-playing game - a semi-cooperative survival horror adventure set in an alternate 1987 Florida overrun with supernatural threats.

## 🌴 Welcome to Flomanji

> *"The Goblet trembles in your hand. The heat rises. Something watches from the swamp's edge. Welcome to Florida, 1987 - but not as you remember it. Welcome to Flomanji."*

Flomanji is a unique tabletop RPG that blends horror, absurdist comedy, and cooperative gameplay, all centered around the mysterious Flomanji Goblet - a sentient drinking vessel that serves as game master, dice roller, and unpredictable chaos engine. This digital Playtest Lab allows game designers to simulate playtests using advanced AI agents, generating detailed logs and analytics to refine the game experience.

## 🎮 Game Overview

### The World of Flomanji

In an alternate 1987 Florida, reality has fractured. Strange phenomena have transformed the landscape into a dangerous playground of supernatural threats. Players control survivors attempting to complete missions while managing dual threats:

- **Heat**: A global danger counter (0-10) that rises each round
- **Weirdness**: An individual corruption meter (0-10) that transforms characters when maxed

When a character's Weirdness reaches 10, they become "Flomanjified" - transformed into a chaotic entity with unpredictable new abilities and motivations.

### Core Game Mechanics

- **Twin Timers System**: Heat and Weirdness create escalating tension
- **Action Economy**: Each player takes 2 actions per turn from: Move, Use Gear, Interact, Team-Up, Rest, or Mission
- **Dice System**: 2d6 + Stat checks against difficulty classes
- **Card-Driven Gameplay**: Gear, hazards, treasures, and character abilities represented by cards
- **The Flomanji Goblet**: A physical smart device that serves as game master, dice roller, and atmosphere generator

## 🧪 AI Playtest Lab Features

- **AI-Driven Simulations**: Test scenarios with advanced language model agents
- **Multi-Agent System**: Orchestrates Game Master, Player, and Critic agents
- **Complete Game State Tracking**: Monitors character stats, inventory, objectives, and map progression
- **Rich Output Logs**: Generate detailed transcripts with GM narration, player decisions, and dice outcomes
- **Advanced Analytics**: Track mission completion rates, character performance, and difficulty progression
- **Decap CMS Integration**: Maintain cards, rules, and scenarios in a user-friendly interface

## 👤 Character Roles & Stats

Characters in Flomanji are defined by five core stats:

- **Brawn**: Physical strength for fighting and feats of power
- **Moxie**: Agility and quick thinking for evasion and fast action
- **Charm**: Social ability for negotiation and manipulation
- **Grit**: Resilience and determination for enduring hardship
- **Weird Sense**: Supernatural sensitivity for dealing with the uncanny

Each character also has unique abilities, starter gear, and special traits that allow them to approach challenges in different ways.

## 🃏 Card Types

The Flomanji system uses various card types:

- **Gear**: Tools, weapons, and equipment to help players survive
- **Hazards**: Dangerous encounters requiring skill checks to overcome
- **Treasure**: Valuable items that provide benefits or serve as mission objectives
- **Region**: Map sections with unique effects and challenges
- **Character**: Player-controlled survivors with unique abilities
- **Chaos**: Global effects that alter gameplay rules temporarily
- **Flomanjified**: Transformation cards for characters who succumb to Weirdness

## 🗺️ Mission Types

- **Exploration**: Discover secrets and map unknown regions
- **Escape**: Flee from overwhelming danger to a safe extraction point
- **Escort**: Protect NPCs while navigating hazardous terrain
- **Collection**: Gather specific treasures or artifacts
- **Boss**: Confront and defeat a powerful entity
- **Solo**: Single-player challenges with specialized rules

## 🖥️ Technology Stack

- React + TypeScript
- TailwindCSS + Shadcn UI
- OpenAI API for agent simulations
- Decap CMS (formerly Netlify CMS)
- Netlify Hosting

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- OpenAI API key

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Access the app at http://localhost:8080

### Setting Up OpenAI API

1. Navigate to the Settings page
2. Enter your OpenAI API key
3. Click "Save API Key"

## 📋 Usage

### Running a Simulation

1. Navigate to Simulations > New Simulation
2. Enter a scenario prompt or select a mission template
3. Configure settings (rounds, player count, characters, etc.)
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
4. Import/export card collections for sharing

## 📊 Analytics & Balance

The Playtest Lab provides powerful analytics:

- Mission success rates across different character combinations
- Heat and Weirdness progression charts
- Objective completion statistics
- Critical failure points and bottlenecks
- Character effectiveness comparisons

## 🔧 Deployment

This application is designed to be deployed on Netlify:

1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Enable Netlify Identity for authentication
4. Configure environment variables (OPENAI_API_KEY) in Netlify settings

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing

Contributions to improve the Flomanji Playtest Lab are welcome! Please see our contribution guidelines for more information.
