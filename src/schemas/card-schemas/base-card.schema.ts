
import { z } from "zod";

// Generic schema for validating card icons
export const cardIconSchema = z.object({
  symbol: z.string(),
  meaning: z.string(),
});

// Base GameCard schema
export const baseCardSchema = z.object({
  id: z.union([z.string(), z.number()]),
  title: z.string(),
  icons: z.array(z.union([z.string(), cardIconSchema])),
  keywords: z.array(z.string()),
  rules: z.string(),
  flavor: z.string(),
  image_prompt: z.string(),
});
