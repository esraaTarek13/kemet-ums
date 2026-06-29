"use client";
import * as Popover from "@radix-ui/react-popover";
import { format, getDaysInMonth, startOfMonth, getDay, addMonths, subMonths } from "date-fns";
import { useState } from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface DatePickerProps {
  value: string; 
  onChange: (value: string) => void;
  disabled?: boolean;
  hasError?: boolean;
  
}

export default function DatePicker({ value, onChange, disabled, hasError }: DatePickerProps) {
  const selected = value ? new Date(value + "T00:00:00") : null;
  const [viewDate, setViewDate] = useState(selected ?? new Date());

  const daysInMonth = getDaysInMonth(viewDate);
  const firstDay = getDay(startOfMonth(viewDate));
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  const handleSelect = (day: number) => {
    const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    onChange(format(date, "yyyy-MM-dd"));
  };

  const isSelected = (day: number) =>
    selected?.getFullYear() === viewDate.getFullYear() &&
    selected?.getMonth() === viewDate.getMonth() &&
    selected?.getDate() === day;

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={`w-full border rounded-md px-3 py-2 text-sm text-left outline-none flex items-center justify-between gap-2
            ${hasError ? "border-red-500" : "border-border"}
            ${selected ? "text-text-primary" : "text-text-muted"}
            focus:border-accent disabled:opacity-50`}
        >
          {selected ? format(selected, "MMM d, yyyy") : "Pick a date"}
          <MdOutlineDateRange className="text-text-secondary shrink-0" />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="z-[100] bg-bg-navbar border border-border rounded-md p-4 shadow-lg w-72"
          sideOffset={4}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={() => setViewDate(subMonths(viewDate, 1))}
              className="p-1 rounded hover:bg-bg-subtle text-text-secondary cursor-pointer"
            >
              <IoChevronBack />
            </button>
            <span className="text-sm font-bold text-text-primary">
              {format(viewDate, "MMMM yyyy")}
            </span>
            <button
              type="button"
              onClick={() => setViewDate(addMonths(viewDate, 1))}
              className="p-1 rounded hover:bg-bg-subtle text-text-secondary cursor-pointer"
            >
              <IoChevronForward />
            </button>
          </div>

          {/* Day names */}
          <div className="grid grid-cols-7 mb-1">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <span key={d} className="text-center text-[10px] text-text-muted font-bold py-1">
                {d}
              </span>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7">
            {blanks.map((i) => <span key={`b-${i}`} />)}
            {days.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => handleSelect(day)}
                className={`text-xs py-1.5 rounded-md text-center cursor-pointer transition-colors
                  ${isSelected(day)
                    ? "bg-accent text-white font-bold"
                    : "text-text-primary hover:bg-accent/10"
                  }`}
              >
                {day}
              </button>
            ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}