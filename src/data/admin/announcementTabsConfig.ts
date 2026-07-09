import { AnnouncementStatusFilter } from "@/types";

export const filterOptions: { id: "all" | AnnouncementStatusFilter; label: string }[] =
  [
    { id: "all", label: "All" },
    { id: "active", label: "Active" },
    { id: "scheduled", label: "Scheduled" },
    { id: "expired", label: "Expired" },
  ];

