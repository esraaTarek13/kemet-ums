import { createAnnouncement } from "@/lib/services/admin/announcements";
import { CreateAnnouncementPayload } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminAnnouncementsKeys } from "./queryKeys";

export function useCreateAnnouncement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateAnnouncementPayload) =>
      createAnnouncement(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminAnnouncementsKeys.all,
      });
      toast.success("Announcement created successfully!");
    },
    onError: (err: Error) => {
      toast.error(err?.message ?? "Failed to create announcement");
    },
  });
}
