import { useEffect, RefObject } from "react";

interface UseClickOutsideOptions {
  onClickOutside: () => void;
  onScroll?: () => void;
  enabled?: boolean;
}

export default function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { onClickOutside, onScroll, enabled = true }: UseClickOutsideOptions,
) {
  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClickOutside();
      }
    };

    const handleScroll = () => {
      onScroll?.();
    };

    document.addEventListener("mousedown", handleClickOutside);
    if (onScroll)
      window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (onScroll) window.removeEventListener("scroll", handleScroll);
    };
  }, [enabled, onClickOutside, onScroll]);
}
