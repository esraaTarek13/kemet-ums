import { useEffect } from "react";

export function useRadixPointerEventsFix() {
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const openDialogs = document.querySelectorAll(
        "[data-radix-dialog-overlay], [data-radix-alert-dialog-overlay]"
      );

      if (openDialogs.length === 0) {
        document.body.style.pointerEvents = "";
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style"],
    });

    return () => observer.disconnect();
  }, []);
}