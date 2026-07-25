import { AnnouncementStatusFilter } from "@/types";

export const adminAnnouncementsKeys = {
  all: ["admin", "announcements"] as const,
  list: (status?: AnnouncementStatusFilter) =>
    [...adminAnnouncementsKeys.all, "list", status] as const,
};
