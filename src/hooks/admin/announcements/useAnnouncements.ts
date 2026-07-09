import {
  createAnnouncement,
  deleteAnnouncement,
  getAdminAnnouncements,
  updateAnnouncement,
} from "@/lib/services/admin/announcements";
import {
  AnnouncementStatusFilter,
  CreateAnnouncementPayload,
  UpdateAnnouncementPayload,
} from "@/types";
import { useAuthStore } from "@/stores/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAdminAnnouncements(status?: AnnouncementStatusFilter) {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["admin-announcements", status],
    queryFn: () => getAdminAnnouncements(status),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateAnnouncement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateAnnouncementPayload) =>
      createAnnouncement(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-announcements"] });
      toast.success("Announcement created successfully!");
    },
    onError: (err: Error) => {
      toast.error(err?.message ?? "Failed to create announcement");
    },
  });
}

export function useUpdateAnnouncement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateAnnouncementPayload) =>
      updateAnnouncement(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-announcements"] });
      toast.success("Announcement updated successfully!");
    },
    onError: (err: Error) => {
      toast.error(err?.message ?? "Failed to update announcement");
    },
  });
}

export function useDeleteAnnouncement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteAnnouncement(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-announcements"] });
      toast.success("Announcement deleted successfully!");
    },
    onError: (err: Error) => {
      toast.error(err?.message ?? "Failed to delete announcement");
    },
  });
}
