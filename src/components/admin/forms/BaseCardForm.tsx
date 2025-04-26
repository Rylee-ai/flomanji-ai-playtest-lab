
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
import { CardFormValues } from "@/types/forms/card-form";
import { missionSubtypes } from "@/schemas/card-form-schema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BaseCardFormProps {
  form: UseFormReturn<CardFormValues>;
}

export const BaseCardForm = ({ form }: BaseCardFormProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Card Name" {...field} value={field.value || ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Type</FormLabel>
            <Select
              onValueChange={field.onChange}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select card type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="treasure">Treasure</SelectItem>
                <SelectItem value="artifact">Artifact</SelectItem>
                <SelectItem value="hazard">Hazard</SelectItem>
                <SelectItem value="region">Region</SelectItem>
                <SelectItem value="npc">NPC</SelectItem>
                <SelectItem value="gear">Gear</SelectItem>
                <SelectItem value="chaos">Chaos</SelectItem>
                <SelectItem value="flomanjified">Flomanjified</SelectItem>
                <SelectItem value="secret">Secret Objective</SelectItem>
                <SelectItem value="automa">Automa</SelectItem>
                <SelectItem value="player-character">Player Character</SelectItem>
                <SelectItem value="mission">Mission</SelectItem>
                {/* Mission subtypes */}
                <SelectItem value="exploration">Mission: Exploration</SelectItem>
                <SelectItem value="escape">Mission: Escape</SelectItem>
                <SelectItem value="escort">Mission: Escort</SelectItem>
                <SelectItem value="collection">Mission: Collection</SelectItem>
                <SelectItem value="boss">Mission: Boss</SelectItem>
                <SelectItem value="solo">Mission: Solo</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="flavor"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Flavor Text</FormLabel>
            <FormControl>
              <Textarea placeholder="Card Flavor" {...field} value={field.value || ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="imagePrompt"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Image Prompt</FormLabel>
            <FormControl>
              <Textarea placeholder="Description for image generation" {...field} value={field.value || ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
