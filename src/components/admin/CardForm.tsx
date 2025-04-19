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
import { MissionSheet } from "@/types/cards/mission";
import { GearCard } from "@/types/cards/gear";
import { ChaosCard } from "@/types/cards/chaos";
import { FlomanjifiedRoleCard } from "@/types/cards/flomanjified";
import { TreasureCard } from "@/types/cards/treasure";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

const hazardSchema = baseCardSchema.extend({
  type: z.literal("hazard"),
  subType: z.enum(["environmental", "creature", "social", "weird"]),
  difficultyClasses: z.object({
    fight: z.number().optional(),
    flee: z.number().optional(),
    negotiate: z.number().optional(),
    outsmart: z.number().optional(),
  }),
  onFailure: z.string(),
  onSuccess: z.string().optional(),
  bossHazard: z.boolean().default(false),
});

const regionSchema = baseCardSchema.extend({
  type: z.literal("region"),
  biomeTags: z.array(z.enum(["🐊", "🏖️", "🏙️", "🛣️", "🌳", "☀️", "🕳️"])),
  onEnter: z.string(),
  action: z.string().optional(),
  rest: z.string().optional(),
  bonusZone: z.string().optional(),
});

const cardSchema = z.discriminatedUnion("type", [
  hazardSchema,
  regionSchema,
  baseCardSchema,
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
                  <FormLabel>ID</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="unique-card-id" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            {cardType === "hazard" && (
              <>
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
                <FormField
                  control={form.control}
                  name="difficultyClasses.fight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fight DC</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
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
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {cardType === "region" && (
              <>
                <FormField
                  control={form.control}
                  name="biomeTags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Biome Tags</FormLabel>
                      <FormControl>
                        <Select 
                          onValueChange={(value) => field.onChange([...field.value, value])}
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
                      </FormControl>
                      <div className="flex gap-2 mt-2">
                        {field.value.map((tag, index) => (
                          <div key={index} className="bg-secondary p-1 rounded">
                            {tag}
                            <button
                              type="button"
                              onClick={() => {
                                const newTags = [...field.value];
                                newTags.splice(index, 1);
                                field.onChange(newTags);
                              }}
                              className="ml-2"
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
              </>
            )}

            <FormField
              control={form.control}
              name="icons"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icons</FormLabel>
                  <div className="flex flex-col gap-2">
                    {field.value.map((icon, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder="Symbol"
                          value={icon.symbol}
                          onChange={(e) => {
                            const newIcons = [...field.value];
                            newIcons[index] = { ...icon, symbol: e.target.value };
                            field.onChange(newIcons);
                          }}
                        />
                        <Input
                          placeholder="Meaning"
                          value={icon.meaning}
                          onChange={(e) => {
                            const newIcons = [...field.value];
                            newIcons[index] = { ...icon, meaning: e.target.value };
                            field.onChange(newIcons);
                          }}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => {
                            const newIcons = [...field.value];
                            newIcons.splice(index, 1);
                            field.onChange(newIcons);
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      onClick={() => {
                        field.onChange([...field.value, { symbol: "", meaning: "" }]);
                      }}
                    >
                      Add Icon
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keywords</FormLabel>
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
                          onClick={() => {
                            const newKeywords = [...field.value];
                            newKeywords.splice(index, 1);
                            field.onChange(newKeywords);
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      onClick={() => {
                        field.onChange([...field.value, ""]);
                      }}
                    >
                      Add Keyword
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
                  <FormLabel>Rules</FormLabel>
                  <div className="flex flex-col gap-2">
                    {field.value.map((rule, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder="Rule"
                          value={rule}
                          onChange={(e) => {
                            const newRules = [...field.value];
                            newRules[index] = e.target.value;
                            field.onChange(newRules);
                          }}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => {
                            const newRules = [...field.value];
                            newRules.splice(index, 1);
                            field.onChange(newRules);
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      onClick={() => {
                        field.onChange([...field.value, ""]);
                      }}
                    >
                      Add Rule
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
                  <FormLabel>Flavor Text</FormLabel>
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
                  <FormLabel>Image Prompt</FormLabel>
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
