
import { FlomanjifiedRoleCard } from "@/types/cards/flomanjified";

// Cards related to bureaucratic/authority themes
export const governanceCards: FlomanjifiedRoleCard[] = [
  {
    id: "flomanjified-hoa-agent",
    name: "Agent of the HOA Overlords",
    type: "flomanjified",
    icons: [
      { symbol: "📋", meaning: "Clipboard" },
      { symbol: "🏛️", meaning: "Bureaucracy" },
      { symbol: "🏙️", meaning: "Urban" }
    ],
    keywords: ["Bureaucratic Control", "Urban Power", "Rule Enforcement"],
    rules: [
      "Objective: Ensure Survivors collectively lose at least 5 Gear cards due to HOA or Bureaucracy Hazards OR ensure the Heat track reaches 10 while at least two Survivors are in Urban/Suburban regions.",
      "Chaos Phase Action: Choose one:",
      "Issue Citation: Target one Survivor in an Urban or Suburban region. Goblet announces: \"Violation detected! Shake Charm, DC 4, or pay the fine!\" Failure: Survivor must discard 1 Gear card.",
      "Enforce Quiet Hours: Target one Survivor. Goblet announces: \"Excessive noise complaint! Shake Moxie, DC 3, or lose your next Action.\" Failure: Survivor loses 1 Action on their next turn.",
      "Special: Immune to negative effects of Bureaucracy Hazards. Can move through Urban/Suburban regions without triggering 'Social' Hazards."
    ],
    flavor: "Compliance is mandatory. Happiness is optional. The beige reign begins.",
    imagePrompt: "A figure in a crisp, unnervingly clean uniform, eyes glowing with bureaucratic fervor, holding a clipboard that seems to absorb light. Background is a disturbingly perfect suburban street.",
    originalRole: "Survivor",
    chaosAction: "Choose: Issue Citation (force Charm DC 4 check or discard gear) OR Enforce Quiet Hours (force Moxie DC 3 check or lose action).",
    specialAbility: "Immune to Bureaucracy Hazards. Ignore Social Hazards in Urban/Suburban regions."
  },
  {
    id: "flomanjified-theme-park-smile",
    name: "Theme Park Smile (Permanent)",
    type: "flomanjified",
    icons: [
      { symbol: "🎭", meaning: "Entertainment" },
      { symbol: "😷", meaning: "Mask" },
      { symbol: "🧠", meaning: "Mental" }
    ],
    keywords: ["Charm Reduction", "Fear Generation", "Forced Participation"],
    rules: [
      "Objective: Ensure all remaining Survivors have 0 Charm OR ensure a Survivor is eliminated while under the effect of a 'Fear' or 'Panic' Hazard/Status.",
      "Chaos Phase Action: Choose one:",
      "Unsettling Grin: Target one Survivor in the same region. Goblet describes the horrifyingly wide smile: \"It's just... wrong. Shake Moxie, DC 4, or lose your nerve!\" Failure: Survivor suffers -1 Charm until the end of their next turn.",
      "Forced Fun: Target one Survivor. Goblet announces brightly: \"Mandatory fun time! Shake Grit, DC 3, or participate!\" Failure: Survivor loses their next Rest action opportunity.",
      "Special: Immune to Charm loss. Automatically passes any Charm checks required by Hazards (but cannot gain positive effects from them)."
    ],
    flavor: "The smile never fades. Neither does the emptiness behind it. Have a magical day!",
    imagePrompt: "A figure with a terrifyingly fixed, wide, cheerful smile that contrasts sharply with dead eyes. They might still be wearing parts of a mascot costume.",
    originalRole: "Survivor",
    chaosAction: "Choose: Unsettling Grin (force Moxie DC 4 check or -1 Charm) OR Forced Fun (force Grit DC 3 check or lose Rest action).",
    specialAbility: "Immune to Charm loss. Auto-pass Charm checks for Hazards (no positive effects)."
  }
]
