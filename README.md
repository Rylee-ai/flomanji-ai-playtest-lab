
# Flonaki AI Playtest Lab

An AI-powered simulation tool for testing tabletop RPG gameplay scenarios.

## Overview

Flonaki AI Playtest Lab is a web-based system that enables game designers to conduct AI-driven playtest sessions for the Flonaki tabletop RPG. Using OpenAI-based agents to act as the Game Master, players, and a critic, the tool can simulate game rounds and produce detailed play logs.

## Features

- **AI-driven Simulations:** Start playtest sessions by entering prompt scenarios and settings
- **Multi-Agent System:** Orchestrates Game Master, Player, and Critic AI agents
- **Rich Output Logs:** Generate detailed transcripts of each session
- **Markdown-Driven Rules:** Maintain game rules and card details in Markdown format
- **Admin Dashboard:** Configure and launch simulations, review archives of past logs
- **Decap CMS Integration:** Easy content management for game rules and cards

## Technology Stack

- React
- TypeScript
- TailwindCSS
- Shadcn UI
- OpenAI API
- Decap CMS (formerly Netlify CMS)
- Netlify Hosting

## Getting Started

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

## Usage

### Running a Simulation

1. Navigate to Simulations > New Simulation
2. Enter a scenario prompt
3. Configure settings (rounds, players, etc.)
4. Click "Start Simulation"

### Viewing Results

1. Navigate to the Simulations page
2. Select a simulation from the list
3. View the full transcript, critique, and add your own annotations

### Editing Game Rules

1. Navigate to the /admin route
2. Log in with your credentials
3. Edit rules, cards, and scenarios through the CMS interface

## Deployment

This application is designed to be deployed on Netlify:

1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Enable Netlify Identity for authentication
4. Configure environment variables (OPENAI_API_KEY) in Netlify settings

## License

This project is licensed under the MIT License - see the LICENSE file for details.
