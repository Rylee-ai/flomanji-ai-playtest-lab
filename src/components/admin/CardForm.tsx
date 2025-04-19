
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CardType, GameCard } from "@/types/cards";
import { HazardCard, HazardSubType } from "@/types/cards/hazard";
import { RegionCard, BiomeTag } from "@/types/cards/region";
import { NPCCard } from "@/types/cards/npc";
import { MissionSheet, MissionObjective } from "@/types/cards/mission";
import { GearCard } from "@/types/cards/gear";
import { ChaosCard } from "@/types/cards/chaos";
import { FlomanjifiedRoleCard } from "@/types/cards/flomanjified";
import { TreasureCard } from "@/types/cards/treasure";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash, Plus, Key, Tag, BookText, Image, Info } from "lucide-react";

// Base schema for all cards
const baseCardSchema = z.object({
  id: z.string().min(1, "ID is required"),
  name: z.string().min(1, "Name is required"),
  type: z.enum(["treasure", "artifact", "hazard", "automa", "region", "npc", "mission", "gear", "chaos", "flomanjified", "secret"]),
  icons: z.array(z.object({
    symbol: z.string(),
    meaning: z.string()
  })).default([]),
  keywords: z.array(z.string()).default([]),
  rules: z.array(z.string()).default([]),
  flavor: z.string().default(""),
  imagePrompt: z.string().default("")
});

// Treasure & Artifact cards schema
const treasureSchema = baseCardSchema.extend({
  type: z.enum(["treasure", "artifact"]),
  consumable: z.boolean().optional(),
  value: z.number().optional(),
  passiveEffect: z.string().optional(),
  useEffect: z.string().optional(),
});

// Hazard cards schema
const hazardSchema = baseCardSchema.extend({
  type: z.literal("hazard"),
  subType: z.enum(["environmental", "creature", "social", "weird"]),
  difficultyClasses: z.object({
    fight: z.number().optional(),
    flee: z.number().optional(),
    negotiate: z.number().optional(),
    outsmart: z.number().optional(),
    grit: z.number().optional(),
    moxie: z.number().optional(),
    charm: z.number().optional(),
    weirdSense: z.number().optional(),
  }),
  onFailure: z.string(),
  onSuccess: z.string().optional(),
  bossHazard: z.boolean().default(false),
  gearBonuses: z.array(z.object({
    itemName: z.string(),
    effect: z.enum(["autoSuccess", "bonus"]),
    bonusValue: z.number().optional()
  })).optional(),
});

// Region cards schema
const regionSchema = baseCardSchema.extend({
  type: z.literal("region"),
  biomeTags: z.array(z.enum(["🐊", "🏖️", "🏙️", "🛣️", "🌳", "☀️", "🕳️"])),
  onEnter: z.string(),
  action: z.string().optional(),
  rest: z.string().optional(),
  bonusZone: z.string().optional(),
});

// NPC cards schema
const npcSchema = baseCardSchema.extend({
  type: z.literal("npc"),
  checkDC: z.number().optional(),
  actions: z.array(z.object({
    description: z.string(),
    cost: z.number(),
    effect: z.string()
  })).default([]),
});

// Mission cards schema
const missionSchema = baseCardSchema.extend({
  type: z.literal("mission"),
  hook: z.string(),
  mapLayout: z.string(),
  startingHeat: z.number(),
  objectives: z.array(z.object({
    description: z.string(),
    required: z.boolean(),
    reward: z.string().optional()
  })).default([]),
  extractionRegion: z.string(),
  specialRules: z.array(z.string()).default([]),
  scaling: z.object({
    small: z.string(),
    large: z.string()
  })
});

// Gear cards schema
const gearSchema = baseCardSchema.extend({
  type: z.literal("gear"),
  actionCost: z.number().optional(),
  consumable: z.boolean().optional(),
  uses: z.number().optional(),
  category: z.enum(["consumable", "tool", "weapon", "vehicle", "supply"]),
  statBonus: z.object({
    stat: z.enum(["brawn", "moxie", "charm", "grit", "weirdSense"]),
    value: z.number()
  }).optional(),
  passive: z.string().optional(),
});

// Chaos cards schema
const chaosSchema = baseCardSchema.extend({
  type: z.literal("chaos"),
  heatEffect: z.number().optional(),
  globalEffect: z.string(),
  duration: z.enum(["immediate", "ongoing", "end-of-round"]).optional(),
});

// Flomanjified cards schema
const flomanjifiedSchema = baseCardSchema.extend({
  type: z.literal("flomanjified"),
  originalRole: z.string().optional(),
  chaosAction: z.string(),
  specialAbility: z.string().optional(),
});

// Secret objectives schema
const secretSchema = baseCardSchema.extend({
  type: z.literal("secret"),
  alignment: z.enum(["saboteur", "innocent"]),
  winCondition: z.string(),
});

// Automa cards schema
const automaSchema = baseCardSchema.extend({
  type: z.literal("automa"),
  movement: z.string().optional(),
  combatBonus: z.number().optional(),
  specialEffect: z.string().optional(),
});

// Combined schema with discriminated union
const cardSchema = z.discriminatedUnion("type", [
  treasureSchema,
  hazardSchema,
  regionSchema,
  npcSchema,
  missionSchema,
  gearSchema,
  chaosSchema,
  flomanjifiedSchema,
  secretSchema,
  automaSchema,
]);

export type CardFormValues = z.infer<typeof cardSchema>;

type CardFormProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CardFormValues) => void;
  initialData?: GameCard;
  activeTab?: CardType;
};

export function CardForm({ 
  open, 
  onClose, 
  onSubmit, 
  initialData, 
  activeTab 
}: CardFormProps) {
  const form = useForm<CardFormValues>({
    resolver: zodResolver(cardSchema),
    defaultValues: initialData || {
      id: "",
      name: "",
      type: activeTab || "treasure",
      icons: [],
      keywords: [],
      rules: [],
      flavor: "",
      imagePrompt: ""
    }
  });

  const cardType = form.watch("type");

  const handleSubmit = async (data: CardFormValues) => {
    try {
      await onSubmit(data);
      toast.success(`Card ${initialData ? "updated" : "created"} successfully`);
      onClose();
    } catch (error) {
      toast.error("Failed to save card");
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Card" : "Add New Card"}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select card type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {["treasure", "artifact", "hazard", "automa", "region", "npc", "mission", "gear", "chaos", "flomanjified", "secret"].map((type) => (
                          <SelectItem key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <Key className="h-4 w-4 mr-1" /> 
                      ID
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="unique-card-id" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Card Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Treasure & Artifact specific fields */}
            {(cardType === "treasure" || cardType === "artifact") && (
              <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="text-lg font-semibold">Treasure Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Value</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                            value={field.value || ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="consumable"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-5">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Consumable</FormLabel>
                          <FormDescription>
                            Is this a one-time use item?
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="passiveEffect"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Passive Effect</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Passive effects that trigger without actions..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="useEffect"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Use Effect</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Effect when player uses this card..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Hazard specific fields */}
            {cardType === "hazard" && (
              <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="text-lg font-semibold">Hazard Details</h3>
                <FormField
                  control={form.control}
                  name="subType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hazard Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select hazard type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {["environmental", "creature", "social", "weird"].map((type) => (
                            <SelectItem key={type} value={type}>
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="difficultyClasses.fight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fight DC</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                            value={field.value || ''}
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
                            {...field} 
                            onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                            value={field.value || ''}
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
                            {...field} 
                            onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                            value={field.value || ''}
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
                            {...field} 
                            onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                            value={field.value || ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="bossHazard"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Boss Hazard</FormLabel>
                        <FormDescription>
                          Is this a boss-level hazard?
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="onFailure"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>On Failure Effect</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="What happens when players fail this hazard check..." />
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
                      <FormLabel>On Success Effect</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="What happens when players succeed this hazard check..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Region specific fields */}
            {cardType === "region" && (
              <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="text-lg font-semibold">Region Details</h3>
                <FormField
                  control={form.control}
                  name="biomeTags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <Tag className="h-4 w-4 mr-1" />
                        Biome Tags
                      </FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          if (!field.value.includes(value as BiomeTag)) {
                            field.onChange([...field.value, value as BiomeTag]);
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Add biome tag" />
                        </SelectTrigger>
                        <SelectContent>
                          {["🐊", "🏖️", "🏙️", "🛣️", "🌳", "☀️", "🕳️"].map((tag) => (
                            <SelectItem key={tag} value={tag}>
                              {tag}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {field.value.map((tag, index) => (
                          <div key={index} className="bg-secondary px-2 py-1 rounded flex items-center">
                            {tag}
                            <button
                              type="button"
                              onClick={() => {
                                const newTags = [...field.value];
                                newTags.splice(index, 1);
                                field.onChange(newTags);
                              }}
                              className="ml-2 text-muted-foreground hover:text-destructive"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
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
                        <Textarea {...field} placeholder="What happens when a player enters this region..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="action"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Region Action</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Special action available in this region..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rest Effect</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Effect when resting in this region..." />
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
                        <Textarea {...field} placeholder="Special one-time bonus when visiting this region..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* NPC specific fields */}
            {cardType === "npc" && (
              <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="text-lg font-semibold">NPC Details</h3>
                <FormField
                  control={form.control}
                  name="checkDC"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interaction DC</FormLabel>
                      <FormControl>
                        <Input 
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel className="block mb-2">NPC Actions</FormLabel>
                  {form.watch("actions")?.map((_, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 mb-3">
                      <div className="col-span-7">
                        <FormField
                          control={form.control}
                          name={`actions.${index}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input {...field} placeholder="Action description" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="col-span-2">
                        <FormField
                          control={form.control}
                          name={`actions.${index}.cost`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  {...field} 
                                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                                  value={field.value || 0}
                                  placeholder="Cost"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="col-span-2">
                        <FormField
                          control={form.control}
                          name={`actions.${index}.effect`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input {...field} placeholder="Effect" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="col-span-1 flex items-center">
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => {
                            const currentActions = form.getValues("actions") || [];
                            form.setValue("actions", [
                              ...currentActions.slice(0, index),
                              ...currentActions.slice(index + 1)
                            ]);
                          }}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const currentActions = form.getValues("actions") || [];
                      form.setValue("actions", [
                        ...currentActions,
                        { description: "", cost: 1, effect: "" }
                      ]);
                    }}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Action
                  </Button>
                </div>
              </div>
            )}

            {/* Mission specific fields */}
            {cardType === "mission" && (
              <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="text-lg font-semibold">Mission Details</h3>
                <FormField
                  control={form.control}
                  name="hook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mission Hook</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Brief narrative hook for the mission..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="mapLayout"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Map Layout</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., 3x3 grid, linear path, etc." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="startingHeat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Starting Heat</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                            value={field.value || 0}
                          />
                        </FormControl>
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
                          <Input {...field} placeholder="Name of extraction region" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormLabel className="block mb-2">Objectives</FormLabel>
                  {form.watch("objectives")?.map((_, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 mb-3">
                      <div className="col-span-6">
                        <FormField
                          control={form.control}
                          name={`objectives.${index}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input {...field} placeholder="Objective description" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="col-span-2">
                        <FormField
                          control={form.control}
                          name={`objectives.${index}.required`}
                          render={({ field }) => (
                            <FormItem className="flex items-center h-full">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="ml-2">Required</FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="col-span-3">
                        <FormField
                          control={form.control}
                          name={`objectives.${index}.reward`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input {...field} placeholder="Reward" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="col-span-1 flex items-center">
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => {
                            const currentObjectives = form.getValues("objectives") || [];
                            form.setValue("objectives", [
                              ...currentObjectives.slice(0, index),
                              ...currentObjectives.slice(index + 1)
                            ]);
                          }}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const currentObjectives = form.getValues("objectives") || [];
                      form.setValue("objectives", [
                        ...currentObjectives,
                        { description: "", required: false, reward: "" }
                      ]);
                    }}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Objective
                  </Button>
                </div>

                <div>
                  <FormLabel className="block mb-2">Special Rules</FormLabel>
                  {form.watch("specialRules")?.map((_, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <FormField
                        control={form.control}
                        name={`specialRules.${index}`}
                        render={({ field }) => (
                          <FormItem className="flex-grow">
                            <FormControl>
                              <Input {...field} placeholder="Special rule" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => {
                          const currentRules = form.getValues("specialRules") || [];
                          form.setValue("specialRules", [
                            ...currentRules.slice(0, index),
                            ...currentRules.slice(index + 1)
                          ]);
                        }}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const currentRules = form.getValues("specialRules") || [];
                      form.setValue("specialRules", [...currentRules, ""]);
                    }}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Rule
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="scaling.small"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Small Group Scaling</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Adjustments for 2-3 players" />
                        </FormControl>
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
                          <Input {...field} placeholder="Adjustments for 5-6 players" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {/* Gear specific fields */}
            {cardType === "gear" && (
              <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="text-lg font-semibold">Gear Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gear category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {["consumable", "tool", "weapon", "vehicle", "supply"].map((type) => (
                              <SelectItem key={type} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="actionCost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Action Cost</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                            value={field.value || ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="uses"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Uses</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                            value={field.value || ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="consumable"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-5">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Consumable</FormLabel>
                          <FormDescription>
                            Is this a one-time use item?
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="statBonus.stat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stat Bonus</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Which stat does this boost?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {["brawn", "moxie", "charm", "grit", "weirdSense"].map((stat) => (
                              <SelectItem key={stat} value={stat}>
                                {stat.charAt(0).toUpperCase() + stat.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="statBonus.value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bonus Value</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                            value={field.value || 0}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="passive"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Passive Effect</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Passive effect while holding this gear..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Chaos specific fields */}
            {cardType === "chaos" && (
              <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="text-lg font-semibold">Chaos Card Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="heatEffect"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Heat Effect</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                            value={field.value || ''}
                            placeholder="e.g., 2 for +2 Heat"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {["immediate", "ongoing", "end-of-round"].map((duration) => (
                              <SelectItem key={duration} value={duration}>
                                {duration.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="globalEffect"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Global Effect</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="How does this chaos card affect the game globally..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Flomanjified specific fields */}
            {cardType === "flomanjified" && (
              <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="text-lg font-semibold">Flomanjified Role Details</h3>
                <FormField
                  control={form.control}
                  name="originalRole"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Original Role</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Original character role (if applicable)" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="chaosAction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chaos Action</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="What does this role do during Chaos phase..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="specialAbility"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Special Ability</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Any unique abilities this role has..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Secret Objective specific fields */}
            {cardType === "secret" && (
              <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="text-lg font-semibold">Secret Objective Details</h3>
                <FormField
                  control={form.control}
                  name="alignment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alignment</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select alignment" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {["saboteur", "innocent"].map((alignment) => (
                            <SelectItem key={alignment} value={alignment}>
                              {alignment.charAt(0).toUpperCase() + alignment.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="winCondition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Win Condition</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="What this player needs to do to win..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Automa specific fields */}
            {cardType === "automa" && (
              <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="text-lg font-semibold">Automa Card Details</h3>
                <FormField
                  control={form.control}
                  name="movement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Movement Pattern</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="How the AI moves (e.g., 'toward nearest player')" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="combatBonus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Combat Bonus</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field} 
                          onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="specialEffect"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Special Effect</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Any unique AI behaviors or effects..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Common fields for all card types */}
            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <Key className="h-4 w-4 mr-1" />
                    Keywords
                  </FormLabel>
                  <div className="flex flex-col gap-2">
                    {field.value.map((keyword, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder="Keyword"
                          value={keyword}
                          onChange={(e) => {
                            const newKeywords = [...field.value];
                            newKeywords[index] = e.target.value;
                            field.onChange(newKeywords);
                          }}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => {
                            const newKeywords = [...field.value];
                            newKeywords.splice(index, 1);
                            field.onChange(newKeywords);
                          }}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        field.onChange([...field.value, ""]);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Keyword
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="icons"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <Tag className="h-4 w-4 mr-1" />
                    Icons
                  </FormLabel>
                  <div className="flex flex-col gap-2">
                    {field.value.map((icon, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder="Symbol (e.g., 🪙, 🛟, 🗣️)"
                          value={icon.symbol}
                          onChange={(e) => {
                            const newIcons = [...field.value];
                            newIcons[index] = { ...icon, symbol: e.target.value };
                            field.onChange(newIcons);
                          }}
                          className="w-1/3"
                        />
                        <Input
                          placeholder="Meaning (e.g., Value, Treasure, Social)"
                          value={icon.meaning}
                          onChange={(e) => {
                            const newIcons = [...field.value];
                            newIcons[index] = { ...icon, meaning: e.target.value };
                            field.onChange(newIcons);
                          }}
                          className="flex-grow"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => {
                            const newIcons = [...field.value];
                            newIcons.splice(index, 1);
                            field.onChange(newIcons);
                          }}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        field.onChange([...field.value, { symbol: "", meaning: "" }]);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Icon
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rules"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <BookText className="h-4 w-4 mr-1" />
                    Rules
                  </FormLabel>
                  <div className="flex flex-col gap-2">
                    {field.value.map((rule, index) => (
                      <div key={index} className="flex gap-2">
                        <Textarea
                          placeholder="Game rule or effect"
                          value={rule}
                          onChange={(e) => {
                            const newRules = [...field.value];
                            newRules[index] = e.target.value;
                            field.onChange(newRules);
                          }}
                          className="flex-grow"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => {
                            const newRules = [...field.value];
                            newRules.splice(index, 1);
                            field.onChange(newRules);
                          }}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        field.onChange([...field.value, ""]);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Rule
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="flavor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <Info className="h-4 w-4 mr-1" />
                    Flavor Text
                  </FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Enter flavor text..." />
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
                  <FormLabel className="flex items-center">
                    <Image className="h-4 w-4 mr-1" />
                    Image Prompt
                  </FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Enter image prompt..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {initialData ? "Save Changes" : "Create Card"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
