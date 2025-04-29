// components/MultiSelectCombobox.tsx
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "../../lib/utils";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Badge } from "./badge";

type Option = {
  label: string;
  value: string;
};

interface MultiSelectComboboxProps {
  options: Option[];
  value: string[]; // selected values
  onSelect: (values: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function MultiSelectCombobox({
  disabled = false,
  options,
  value,
  onSelect,
  placeholder = "Select options...",
}: MultiSelectComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const toggleOption = (val: string) => {
    if (value.includes(val)) {
      onSelect(value.filter((v) => v !== val));
    } else {
      onSelect([...value, val]);
    }
  };

  const selectedLabels = options
    .filter((option) => value.includes(option.value))
    .map((o) => o.label);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {disabled ? (
        <Button
          variant="outline"
          role="combobox"
          className="w-full h-auto justify-between flex-wrap "
        >
          <div className="flex flex-wrap items-center gap-2">
            {selectedLabels.length > 0 ? (
              selectedLabels.map((item, index) => (
                <Badge className="bg-[#53B69A] hover:bg-[#53B69A]" key={index}>{item} </Badge>
              ))
            ) : (
              <p className="text-sm font-normal text-gray-500">{placeholder}</p>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      ) : (
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full h-auto justify-between flex-wrap "
          >
            <div className="flex flex-wrap items-center gap-2">
              {selectedLabels.length > 0 ? (
                selectedLabels.map((item, index) => (
                  <Badge key={index}>{item} </Badge>
                ))
              ) : (
                <p className="text-sm font-normal text-gray-500">
                  {placeholder}
                </p>
              )}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
      )}

      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = value.includes(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => toggleOption(option.value)}
                  >
                    <div className="flex items-center gap-2">
                      <Check
                        className={cn(
                          "h-4 w-4",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {option.label}
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
