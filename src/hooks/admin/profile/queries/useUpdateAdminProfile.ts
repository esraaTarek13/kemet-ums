import { updateAdminProfile } from "@/lib/services/admin/proflie";
import { useAuthStore } from "@/stores/authStore";
import { UpdateAdminProfilePayload } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminProfileKeys } from "./queryKeys";

export function useUpdateAdminProfile() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  return useMutation({
    mutationFn: (payload: UpdateAdminProfilePayload) =>
      updateAdminProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminProfileKeys.detail(user?.id),
      });
      toast.success("Profile updated successfully!");
    },
    onError: (err: Error) => {
      toast.error(err?.message ?? "Failed to update profile");
    },
  });
}
