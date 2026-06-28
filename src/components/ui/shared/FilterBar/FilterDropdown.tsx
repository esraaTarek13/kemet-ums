"use client";
import * as Select from "@radix-ui/react-select";
import { IoIosArrowDown } from "react-icons/io";

interface FilterDropdownProps {
  filterKey: string;
  placeholder: string;
  options: (string | null)[];
  value: string;
  onChange: (key: string, value: string) => void;
}

export default function FilterDropdown({
  filterKey,
  placeholder,
  options,
  value,
  onChange,
}: FilterDropdownProps) {
  return (
    <Select.Root
      value={value || "all"}
      onValueChange={(val) => onChange(filterKey, val === "all" ? "" : val)}
    >
      <Select.Trigger
        aria-label={placeholder}
        className="flex items-center justify-between gap-3 md:gap-5 bg-bg border border-[#D8C1C3] rounded-lg py-2 px-3 cursor-pointer text-text-muted focus:outline-none data-placeholder:text-text-muted text-xs md:text-sm"
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <IoIosArrowDown className="text-sm md:text-lg" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={4}
          className="z-50 min-w-(--radix-select-trigger-width) bg-bg-card border border-[#D8C1C3] rounded-lg shadow-md py-1"
        >
          <Select.Viewport>
            <Select.Item
              value="all"
              className="px-4 py-2 text-xs md:text-sm text-text-muted cursor-pointer select-none hover:bg-bg-filter focus:bg-bg-filter focus:outline-none data-[state=checked]:text-accent data-[state=checked]:font-bold"
            >
              <Select.ItemText>{placeholder}</Select.ItemText>
            </Select.Item>

            {options.map((option) => (
              <Select.Item
                key={option}
                value={option ?? ""}
                className="px-4 py-2 text-xs md:text-sm text-text-muted cursor-pointer select-none hover:bg-bg-filter focus:bg-bg-filter focus:outline-none data-[state=checked]:text-accent data-[state=checked]:font-bold"
              >
                <Select.ItemText>{option}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
