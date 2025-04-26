
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { CardFormValues } from "@/types/forms/card-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

interface HazardCardFormProps {
  form: UseFormReturn<CardFormValues>;
}

export const HazardCardForm = ({ form }: HazardCardFormProps) => {
  const gearBonuses = form.watch("gearBonuses") || [];

  const addGearBonus = () => {
    const currentBonuses = form.getValues("gearBonuses") || [];
    form.setValue("gearBonuses", [...currentBonuses, { itemName: "", effect: "bonus", bonusValue: 1 }]);
  };

  const removeGearBonus = (index: number) => {
    const currentBonuses = form.getValues("gearBonuses") || [];
    form.setValue("gearBonuses", currentBonuses.filter((_, i) => i !== index));
  };

  return (
    <>
      <FormField
        control={form.control}
        name="subType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sub Type</FormLabel>
            <Select
              onValueChange={field.onChange}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select hazard subtype" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="environmental">Environmental</SelectItem>
                <SelectItem value="creature">Creature</SelectItem>
                <SelectItem value="social">Social</SelectItem>
                <SelectItem value="weird">Weird</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="space-y-4 border rounded-lg p-4">
        <FormLabel>Difficulty Classes</FormLabel>
        
        <FormField
          control={form.control}
          name="difficultyClasses.fight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fight DC</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Fight DC" 
                  {...field}
                  value={field.value || ""}
                  onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="difficultyClasses.flee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Flee DC</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Flee DC" 
                  {...field}
                  value={field.value || ""}
                  onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="difficultyClasses.negotiate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Negotiate DC</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Negotiate DC" 
                  {...field}
                  value={field.value || ""}
                  onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="difficultyClasses.outsmart"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Outsmart DC</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Outsmart DC" 
                  {...field}
                  value={field.value || ""}
                  onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={form.control}
        name="onFailure"
        render={({ field }) => (
          <FormItem>
            <FormLabel>On Failure</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Consequence on failing the check" 
                {...field}
                value={field.value || ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="onSuccess"
        render={({ field }) => (
          <FormItem>
            <FormLabel>On Success</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Rewards on successful check" 
                {...field}
                value={field.value || ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="bossHazard"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel>Boss Hazard</FormLabel>
              <FormDescription>
                Is this a boss level hazard?
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value || false}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <FormLabel>Gear Bonuses</FormLabel>
          <Button type="button" variant="outline" size="sm" onClick={addGearBonus}>
            <Plus className="h-4 w-4 mr-1" />
            Add Gear Bonus
          </Button>
        </div>

        {gearBonuses.map((_, index) => (
          <div key={index} className="space-y-4 p-4 border rounded-md">
            <div className="flex justify-end">
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => removeGearBonus(index)}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>

            <FormField
              control={form.control}
              name={`gearBonuses.${index}.itemName`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Gear name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`gearBonuses.${index}.effect`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Effect Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select effect" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="autoSuccess">Auto Success</SelectItem>
                      <SelectItem value="bonus">Bonus</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch(`gearBonuses.${index}.effect`) === "bonus" && (
              <FormField
                control={form.control}
                name={`gearBonuses.${index}.bonusValue`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bonus Value</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Bonus amount" 
                        {...field}
                        onChange={e => field.onChange(e.target.value ? Number(e.target.value) : 1)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
};
