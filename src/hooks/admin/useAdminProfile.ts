import {
  getAdminProfile,
  updateAdminProfile,
} from "@/lib/services/admin/proflie";
import { useAuthStore } from "@/stores/authStore";
import { UpdateAdminProfilePayload } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAdminProfile() {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["profile", user?.id],
    queryFn: () => getAdminProfile(),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 10,
  });
}

export function useUpdateAdminProfile() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  return useMutation({
    mutationFn: (payload: UpdateAdminProfilePayload) =>
      updateAdminProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
      toast.success("Profile updated successfully!");
    },
    onError: (err: Error) => {
      toast.error(err?.message ?? "Failed to update profile");
    },
  });
}
