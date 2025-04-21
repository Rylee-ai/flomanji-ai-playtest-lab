
export interface AgentConfig {
  systemPrompt: string;
  temperature: number;
  verbose?: boolean;
  personality?: string;
  skillLevel?: string;
  meta?: boolean;
  focus?: string;
  detail?: string;
  suggestions?: boolean;
}
