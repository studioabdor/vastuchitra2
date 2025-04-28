
import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface StyleOption {
  value: string;
  label: string;
  description: string;
  region: "indian" | "international";
}

const styles: StyleOption[] = [
  // Indian Styles
  {
    value: "mughal",
    label: "Mughal Architecture",
    description: "Domes, arches, and intricate geometric patterns",
    region: "indian"
  },
  {
    value: "kerala",
    label: "Kerala Traditional",
    description: "Sloped roofs, courtyards, and natural materials",
    region: "indian"
  },
  {
    value: "rajasthani",
    label: "Rajasthani Style",
    description: "Ornate jharokhas, jalis, and vibrant colors",
    region: "indian"
  },
  {
    value: "modern",
    label: "Contemporary Indian",
    description: "Modern interpretation with traditional elements",
    region: "indian"
  },
  {
    value: "dravidian",
    label: "Dravidian Temple",
    description: "Gopurams, intricate carvings, and stone construction",
    region: "indian"
  },
  {
    value: "nagara",
    label: "Nagara Style",
    description: "Beehive-shaped towers and sandstone construction",
    region: "indian"
  },
  {
    value: "bengal",
    label: "Bengal Terracotta",
    description: "Curved roofs with terracotta tile decorations",
    region: "indian"
  },
  {
    value: "goan",
    label: "Indo-Portuguese",
    description: "Blend of Indian and Portuguese colonial elements",
    region: "indian"
  },
  // International Styles
  {
    value: "mediterranean",
    label: "Mediterranean",
    description: "Terracotta roofs, white walls, and arched windows",
    region: "international"
  },
  {
    value: "japanese",
    label: "Japanese",
    description: "Minimalist, natural materials, and zen aesthetics",
    region: "international"
  },
  {
    value: "scandinavian",
    label: "Scandinavian",
    description: "Clean lines, light wood, and functional design",
    region: "international"
  },
  {
    value: "gothic",
    label: "Gothic",
    description: "Pointed arches, ribbed vaults, and flying buttresses",
    region: "international"
  },
  {
    value: "modernist",
    label: "Modernist",
    description: "Form follows function, minimal ornamentation",
    region: "international"
  },
  {
    value: "art_deco",
    label: "Art Deco",
    description: "Bold geometric patterns and lavish ornamentation",
    region: "international"
  },
];

interface StyleSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function StyleSelector({ value, onValueChange }: StyleSelectorProps) {
  const [open, setOpen] = React.useState(false);
  
  // Always ensure we have a valid selection by fallback to the first style
  const selectedStyle = styles.find(style => style.value === value) || styles[0];
  
  // Filter styles by region ahead of time
  const indianStyles = styles.filter(s => s.region === "indian");
  const internationalStyles = styles.filter(s => s.region === "international");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between border-2"
        >
          {selectedStyle.label || "Select style..."}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search styles..." />
          <CommandList>
            <CommandEmpty>No style found.</CommandEmpty>
            <CommandGroup heading="Indian Styles">
              {indianStyles.map((style) => (
                <CommandItem
                  key={style.value}
                  value={style.value}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === style.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div>
                    <p>{style.label}</p>
                    <p className="text-xs text-muted-foreground">{style.description}</p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="International Styles">
              {internationalStyles.map((style) => (
                <CommandItem
                  key={style.value}
                  value={style.value}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === style.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div>
                    <p>{style.label}</p>
                    <p className="text-xs text-muted-foreground">{style.description}</p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default StyleSelector;
