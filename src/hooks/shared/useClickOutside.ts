import { useEffect, RefObject } from "react";

interface UseClickOutsideOptions {
  onClickOutside?: () => void;
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
      if (
        onClickOutside &&
        ref.current &&
        !ref.current.contains(e.target as Node)
      ) {
        onClickOutside();
      }
    };

    if (onClickOutside)
      document.addEventListener("mousedown", handleClickOutside);
    if (onScroll)
      window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (onClickOutside)
        document.removeEventListener("mousedown", handleClickOutside);
      if (onScroll) window.removeEventListener("scroll", onScroll);
    };
  }, [ref, enabled, onClickOutside, onScroll]);
}
