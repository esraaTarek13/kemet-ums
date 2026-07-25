import { deleteAnnouncement } from "@/lib/services/admin/announcements";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminAnnouncementsKeys } from "./queryKeys";

export function useDeleteAnnouncement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteAnnouncement(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminAnnouncementsKeys.all,
      });
      toast.success("Announcement deleted successfully!");
    },
    onError: (err: Error) => {
      toast.error(err?.message ?? "Failed to delete announcement");
    },
  });
}
