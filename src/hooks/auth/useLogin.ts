"use client";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { LoginSchema } from "@/validation/auth/schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ROLE_BASE_ROUTES } from "@/data/roles";
import { getProfile, loginUser, logoutUser } from "@/lib/services/auth/auth.service";

export function useLogin() {
  const { setUser } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: LoginSchema) => {
      const user = await loginUser(data.email, data.password);
      if (!user) throw new Error("Login failed, please try again");

      const profile = await getProfile(user.id);

      // Reject role mismatch — except super_admin signing in as admin
      if (
        profile.role !== data.role &&
        !(data.role === "admin" && profile.role === "super_admin")
      ) {
        await logoutUser().catch(() => {});
        throw new Error(`You are not registered as ${data.role}`);
      }

      return profile;
    },

    // Store profile and redirect to role base route
    onSuccess: (profile) => {
      setUser(profile);
      toast.success(`Welcome back, ${profile.full_name}!`);
      const base = ROLE_BASE_ROUTES[profile.role];
      router.replace(base ? `${base}/dashboard` : "/");
    },

    onError: (err: Error) => {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
    },
  });
}
