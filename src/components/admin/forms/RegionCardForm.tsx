
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { CardFormValues } from "../CardForm";
import { BiomeTag } from "@/types/cards/region";

interface RegionCardFormProps {
  form: UseFormReturn<CardFormValues>;
}

export const RegionCardForm = ({ form }: RegionCardFormProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="biomeTags"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Biome Tags</FormLabel>
            <FormControl>
              <Input placeholder="🐊,🏖️,🏙️" {...field} />
            </FormControl>
            <FormDescription>
              Comma-separated biome tags (🐊,🏖️,🏙️,🛣️,🌳,☀️,🕳️)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="onEnter"
        render={({ field }) => (
          <FormItem>
            <FormLabel>On Enter Effect</FormLabel>
            <FormControl>
              <Textarea placeholder="What happens when entering this region?" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="bonusZone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bonus Zone</FormLabel>
            <FormControl>
              <Textarea placeholder="Special one-time bonus for this region" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
