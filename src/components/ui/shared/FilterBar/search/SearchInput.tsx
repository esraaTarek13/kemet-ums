"use client";

import { FiSearch } from "react-icons/fi";
import { useEffect, useId, useState } from "react";

interface SearchInputProps {
  bgColor?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export default function SearchInput({
  bgColor = "bg-bg",
  value,
  onChange,
  placeholder = "Search...",
  debounceMs = 300,
}: SearchInputProps) {
  const inputId = useId(); // unique id to avoid DOM collisions across instances
  const [inputValue, setInputValue] = useState(value);
  const [prevValue, setPrevValue] = useState(value);

  // Sync local state when the external value changes (e.g. reset from parent)
  // This is a valid React pattern for adjusting state during render.
  if (value !== prevValue) {
    setPrevValue(value);
    setInputValue(value);
  }

  useEffect(() => {
    // Debounce: only notify parent after the user stops typing
    const timeoutId = setTimeout(() => {
      if (inputValue !== value) {
        onChange(inputValue);
      }
    }, debounceMs);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, debounceMs]);

  return (
    <div
      className={`flex items-center gap-2 ${bgColor} border border-[#D8C1C3] rounded-lg py-1.5 lg:py-2 px-2 lg:px-3 focus-within:shadow-[0_0_2px_#4a1b26]`}
    >
      <label htmlFor={inputId} className="sr-only">
        Search
      </label>
      <FiSearch
        aria-hidden="true"
        className="text-text-subtle text-sm shrink-0"
      />

      <input
        id={inputId}
        type="text"
        autoComplete="off"
        placeholder={placeholder}
        aria-label={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="bg-transparent text-xs md:text-sm text-text-primary w-full outline-none"
      />
    </div>
  );
}
