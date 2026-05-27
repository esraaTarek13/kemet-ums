"use client";
import { logoutUser } from "@/lib/services/auth/auth.service";
import { useAuthStore } from "@/stores/authStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useLogout() {
  const router = useRouter();
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: () => logoutUser(),

    // Clear store and redirect to login on success
    onSuccess: () => {
      setUser(null);
      router.replace("/login");
    },

    onError: (err: Error) => {
      toast.error(err?.message ?? "Something went wrong");
    },
  });
}
