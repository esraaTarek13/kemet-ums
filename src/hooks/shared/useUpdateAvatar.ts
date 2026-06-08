"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/authStore";
import { deleteAvatar, updateAvatar } from "@/lib/services/shared/profile";

export function useUpdateAvatar() {
  const { user, setUser } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => {
      if (!user?.id) throw new Error("User not authenticated");
      return updateAvatar(file, user.id);
    },
    onSuccess: (publicUrl) => {
      if (user) setUser({ ...user, avatar_url: publicUrl });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Avatar updated successfully!");
    },
    onError: (err: Error) => {
      toast.error(err?.message ?? "Failed to update avatar");
    },
  });
}

export function useDeleteAvatar() {
  const { user, setUser } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      if (!user?.id) throw new Error("User not authenticated");
      if (!user?.avatar_url) throw new Error("No avatar to remove");
      return deleteAvatar(user.id, user.avatar_url);
    },
    onSuccess: () => {
      if (user) setUser({ ...user, avatar_url: null });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Avatar removed successfully!");
    },
    onError: (err: Error) => {
      toast.error(err?.message ?? "Failed to remove avatar");
    },
  });
}
