
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
              <Input placeholder="Card Name" {...field} />
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
            <FormControl>
              <Input placeholder="Card Type" {...field} />
            </FormControl>
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
