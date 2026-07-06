"use client";
import { FilterOption } from "@/types";
import * as Select from "@radix-ui/react-select";
import { IoIosArrowDown } from "react-icons/io";

interface FilterDropdownProps {
  filterKey: string;
  placeholder: string;
  options: (FilterOption | null)[];
  value: string;
  onChange: (key: string, value: string) => void;
}

function normalizeOption(option: FilterOption | null) {
  if (option && typeof option === "object") {
    return { value: option.value, label: option.label };
  }
  return { value: option ?? "", label: option ?? "" };
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
        className="flex items-center justify-between gap-2 lg:gap-5 bg-bg border border-[#D8C1C3] rounded-lg py-2 px-3 cursor-pointer text-text-muted focus:outline-none data-placeholder:text-text-muted text-xs lg:text-sm"
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <IoIosArrowDown className="text-sm lg:text-lg" />
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

            {options.map((option) => {
              const { value: optValue, label } = normalizeOption(option);
              return (
                <Select.Item
                  key={optValue}
                  value={optValue}
                  className="px-4 py-2 text-xs md:text-sm text-text-muted cursor-pointer select-none hover:bg-bg-filter focus:bg-bg-filter focus:outline-none data-[state=checked]:text-accent data-[state=checked]:font-bold"
                >
                  <Select.ItemText>{label}</Select.ItemText>
                </Select.Item>
              );
            })}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
