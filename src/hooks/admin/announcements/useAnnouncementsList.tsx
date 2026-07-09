import { useState } from "react";
import { useAdminAnnouncements } from "./useAnnouncements";
import { AnnouncementStatusFilter } from "@/types";

type FilterState = "all" | AnnouncementStatusFilter;

export function useAnnouncementsList() {
  const [filterState, setFilterState] = useState<FilterState>("all");

  const statusParam = filterState === "all" ? undefined : filterState;
  const { data, isPending, isError } = useAdminAnnouncements(statusParam);

  return {
    filterState,
    setFilterState,
    announcements: data?.announcements,
    isPending,
    isError,
  };
}
