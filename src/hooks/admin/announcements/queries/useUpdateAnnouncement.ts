import { updateAnnouncement } from "@/lib/services/admin/announcements";
import { UpdateAnnouncementPayload } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminAnnouncementsKeys } from "./queryKeys";

export function useUpdateAnnouncement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateAnnouncementPayload) =>
      updateAnnouncement(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminAnnouncementsKeys.all,
      });
      toast.success("Announcement updated successfully!");
    },
    onError: (err: Error) => {
      toast.error(err?.message ?? "Failed to update announcement");
    },
  });
}
