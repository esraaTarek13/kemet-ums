"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ChangePasswordSchema } from "@/validation/profile";
import { useAuthStore } from "@/stores/authStore";
import { changePassword } from "@/lib/services/shared/profile";

export function useChangePassword() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  return useMutation({
    mutationFn: (data: ChangePasswordSchema) => changePassword(data.password),
    onSuccess: () => {
      // Refresh profile to reflect updated password_changed_at
      queryClient.invalidateQueries({
        queryKey: ["student-profile", user?.id],
      });
      toast.success("Password changed successfully!");
    },
    onError: (err: Error) => {
      toast.error(err?.message ?? "Something went wrong");
    },
  });
}
