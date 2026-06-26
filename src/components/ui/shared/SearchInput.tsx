"use client";
import { FiSearch } from "react-icons/fi";
import {
  useRef,
  useCallback,
  useState,
  useId,
  useEffect,
  useTransition,
} from "react";
import useClickOutside from "@/hooks/shared/useClickOutside";
import { usePathname } from "next/navigation";

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  onClose?: () => void;
  results?: React.ReactNode;
}

export default function SearchInput({
  value,
  onChange,
  onClose,
  results,
}: SearchInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchId = useId();
  const resultsId = useId();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  const close = useCallback(() => {
    setIsOpen(false);
    onChange("");
    onClose?.();
  }, [onChange, onClose]);

  useEffect(() => {
    startTransition(close);
  }, [pathname, close]);

  useClickOutside(containerRef, {
    onClickOutside: close,
    onScroll: close,
    enabled: isOpen,
  });

  return (
    <div className="relative" ref={containerRef}>
      {/* Desktop */}
      <div className="hidden md:flex items-center gap-2 bg-bg-search-input rounded-lg px-4 py-2 border border-transparent focus-within:border-accent focus-within:ring-1 focus-within:ring-accent/50 focus-within:shadow-[0_0_10px_#4a1b26]">
        <label htmlFor={searchId} className="sr-only">
          Search
        </label>
        <FiSearch
          aria-hidden="true"
          className="text-text-subtle text-sm shrink-0"
        />
        <input
          id={searchId}
          type="text"
          value={value}
          placeholder="Search..."
          aria-label="Search..."
          aria-controls={results ? resultsId : undefined}
          aria-expanded={isOpen && !!results}
          aria-autocomplete="list"
          role="combobox"
          autoComplete="off"
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          className="bg-transparent text-xs md:text-sm text-text-subtle w-full outline-none"
        />
      </div>

      {/* Mobile toggle */}
      <button
        type="button"
        aria-label="Open search"
        aria-expanded={isOpen}
        className="md:hidden text-text-primary text-xl px-4 cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <FiSearch aria-hidden="true" />
      </button>

      {/* Mobile input */}
      {isOpen && (
        <div className="md:hidden absolute top-10 left-0 w-60 flex items-center gap-2 bg-bg-search-input rounded-lg px-4 py-2 border border-accent ring-1 ring-accent/50 shadow-[0_0_10px_#4a1b26] z-50">
          <FiSearch
            aria-hidden="true"
            className="text-text-subtle text-sm shrink-0"
          />
          <input
            type="text"
            value={value}
            placeholder="Search..."
            aria-label="Search"
            aria-controls={results ? resultsId : undefined}
            aria-expanded={!!results}
            aria-autocomplete="list"
            role="combobox"
            autoComplete="off"
            autoFocus
            onChange={(e) => {
              onChange(e.target.value);
              setIsOpen(true);
            }}
            className="bg-transparent text-sm text-text-subtle w-full outline-none"
          />
        </div>
      )}

      {/* Dropdown */}
      {isOpen && results && (
        <div
          id={resultsId}
          role="listbox"
          aria-label="Search results"
          className="absolute top-18.5 md:top-full mt-2 w-60 md:w-full bg-bg-card border border-accent/30 rounded-xl shadow-[0_4px_24px_0px_#4a1b2640] z-50 overflow-hidden"
        >
          {results}
        </div>
      )}
    </div>
  );
}
