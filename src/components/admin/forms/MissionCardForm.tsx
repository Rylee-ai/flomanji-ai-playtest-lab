
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { CardFormValues } from "../CardForm";
import { Plus, Minus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

interface MissionCardFormProps {
  form: UseFormReturn<CardFormValues>;
}

export const MissionCardForm: React.FC<MissionCardFormProps> = ({ form }) => {
  const { control } = form;
  
  const objectiveFields = useFieldArray({
    control,
    name: "objectives"
  });
  
  const challengeFields = useFieldArray({
    control,
    name: "challenges"
  });
  
  const phaseFields = useFieldArray({
    control,
    name: "phases"
  });

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="hook"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mission Hook</FormLabel>
            <FormControl>
              <Textarea placeholder="Enter the mission hook..." {...field} />
            </FormControl>
            <FormDescription>
              A brief, compelling description of the mission that draws players in.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="mapLayout"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Map Layout</FormLabel>
            <FormControl>
              <Input placeholder="e.g., 3x3 grid" {...field} />
            </FormControl>
            <FormDescription>
              Describe the layout structure for this mission.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="startingHeat"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Starting Heat: {field.value}</FormLabel>
            <FormControl>
              <Slider
                min={0}
                max={8}
                step={1}
                defaultValue={[field.value || 0]}
                onValueChange={(value) => field.onChange(value[0])}
              />
            </FormControl>
            <FormDescription>
              The initial Heat level for this mission (0-8).
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="extractionRegion"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Extraction Region</FormLabel>
            <FormControl>
              <Input placeholder="Where players need to go to escape" {...field} />
            </FormControl>
            <FormDescription>
              The name of the region players must reach to extract.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <Separator className="my-4" />

      <div>
        <h3 className="text-lg font-medium mb-2">Mission Objectives</h3>
        
        {objectiveFields.map((field, index) => (
          <div key={field.id} className="border p-4 rounded-md mb-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">Objective {index + 1}</h4>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeObjective(index)}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-4">
              <FormField
                control={form.control}
                name={`objectives.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Objective description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name={`objectives.${index}.required`}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Required</FormLabel>
                      <FormDescription>
                        Is this objective mandatory for mission completion?
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name={`objectives.${index}.reward`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reward</FormLabel>
                    <FormControl>
                      <Input placeholder="What players get for completing this" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name={`objectives.${index}.difficultyLevel`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty Level: {field.value || 1}</FormLabel>
                    <FormControl>
                      <Slider
                        min={1}
                        max={5}
                        step={1}
                        defaultValue={[field.value || 1]}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                    <FormDescription>
                      How difficult is this objective? (1-5)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name={`objectives.${index}.completionCheck`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Completion Check</FormLabel>
                    <FormControl>
                      <Textarea placeholder="How to determine if this objective is completed" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}
        
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => appendObjective({
            description: "",
            required: false,
            reward: "",
            difficultyLevel: 1
          })}
          className="mt-2"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Objective
        </Button>
      </div>

      <Separator className="my-4" />

      <div>
        <h3 className="text-lg font-medium mb-2">Mission Challenges</h3>
        
        {challengeFields.map((field, index) => (
          <div key={field.id} className="border p-4 rounded-md mb-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">Challenge {index + 1}</h4>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeChallenge(index)}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-4">
              <FormField
                control={form.control}
                name={`challenges.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Challenge description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name={`challenges.${index}.frequency`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frequency</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                        {...field}
                      >
                        <option value="once">Once</option>
                        <option value="recurring">Recurring</option>
                        <option value="triggered">Triggered</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {field.frequency === 'triggered' && (
                <FormField
                  control={form.control}
                  name={`challenges.${index}.trigger`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trigger Condition</FormLabel>
                      <FormControl>
                        <Input placeholder="When does this challenge trigger?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              <FormField
                control={form.control}
                name={`challenges.${index}.heatEffect`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Heat Effect</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormDescription>
                      Heat change when this challenge is active
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name={`challenges.${index}.weirdnessEffect`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weirdness Effect</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormDescription>
                      Weirdness change when this challenge is active
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}
        
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => appendChallenge({
            description: "",
            frequency: "once",
            heatEffect: 0,
            weirdnessEffect: 0
          })}
          className="mt-2"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Challenge
        </Button>
      </div>

      <Separator className="my-4" />
      
      <div>
        <h3 className="text-lg font-medium mb-2">Special Rules</h3>
        
        {form.watch("specialRules")?.map((rule, index) => (
          <div key={index} className="flex items-center mb-2">
            <Input
              value={rule}
              onChange={(e) => {
                const newRules = [...(form.watch("specialRules") || [])];
                newRules[index] = e.target.value;
                form.setValue("specialRules", newRules);
              }}
              className="mr-2"
            />
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                const newRules = [...(form.watch("specialRules") || [])];
                newRules.splice(index, 1);
                form.setValue("specialRules", newRules);
              }}
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        ))}
        
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            const currentRules = form.watch("specialRules") || [];
            form.setValue("specialRules", [...currentRules, ""]);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Special Rule
        </Button>
      </div>

      <Separator className="my-4" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="scaling.small"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Small Group Scaling</FormLabel>
              <FormControl>
                <Input placeholder="For 1-2 players..." {...field} />
              </FormControl>
              <FormDescription>
                How to adjust difficulty for smaller groups
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="scaling.large"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Large Group Scaling</FormLabel>
              <FormControl>
                <Input placeholder="For 3-4 players..." {...field} />
              </FormControl>
              <FormDescription>
                How to adjust difficulty for larger groups
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="recommendedPlayerCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recommended Player Count</FormLabel>
              <FormControl>
                <Input
                  placeholder="1,2,3,4"
                  {...field}
                  value={field.value?.join(',')}
                  onChange={(e) => {
                    const values = e.target.value.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v));
                    field.onChange(values);
                  }}
                />
              </FormControl>
              <FormDescription>
                Comma-separated list of player counts this mission is designed for
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="estimatedDuration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated Duration (Rounds)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="5" {...field} />
              </FormControl>
              <FormDescription>
                How many rounds this mission is expected to take
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="difficultyRating"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Difficulty Rating: {field.value || 5}</FormLabel>
            <FormControl>
              <Slider
                min={1}
                max={10}
                step={1}
                defaultValue={[field.value || 5]}
                onValueChange={(value) => field.onChange(value[0])}
              />
            </FormControl>
            <FormDescription>
              Overall mission difficulty (1-10)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default MissionCardForm;
