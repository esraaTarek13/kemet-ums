import * as Select from "@radix-ui/react-select";
import { useId } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface Option {
  value: string;
  label: string;
}

interface SelectInputProps {
  label?: string;
  placeholder?: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
}

export default function SelectInput({
  label,
  placeholder = "Select...",
  options,
  value,
  onChange,
  error,
}: SelectInputProps) {
  const id = useId();

  return (
    <div className="flex flex-col gap-2 md:gap-3 flex-1">
      {label && (
        <label
          htmlFor={id}
          className="font-bold text-[10px] md:text-xs text-text-secondary uppercase"
        >
          {label}
        </label>
      )}

      <Select.Root value={value} onValueChange={onChange}>
        <Select.Trigger
          id={id}
          aria-label={label ?? placeholder}
          aria-invalid={!!error}
          className={`flex justify-between items-center gap-2 bg-bg-input rounded-lg p-2 md:p-3 text-text-muted border focus:outline-none data-placeholder:text-text-subtle focus:ring-1 focus:shadow-[0_0_10px_#4a1b26] text-xs md:text-sm lg:text-base cursor-pointer ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/50"
              : "border-transparent focus:border-accent focus:ring-accent/50"
          }`}
        >
          <Select.Value placeholder={placeholder} />
          <Select.Icon>
            <IoIosArrowDown
              aria-hidden="true"
              className="text-xs md:text-sm lg:text-base shrink-0 text-text-subtle"
            />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            position="popper"
            sideOffset={4}
            className="z-50 min-w-(--radix-select-trigger-width) bg-bg-card border border-[#D8C1C3] rounded-lg shadow-md py-1"
          >
            <Select.Viewport>
              {options.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  className="px-4 py-2 text-xs md:text-sm text-text-muted cursor-pointer select-none hover:bg-bg-filter focus:bg-bg-filter focus:outline-none data-[state=checked]:text-accent data-[state=checked]:font-bold"
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      {error && (
        <span className="text-red-500 text-[10px] md:text-xs">{error}</span>
      )}
    </div>
  );
}
