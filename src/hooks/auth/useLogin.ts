"use client";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { LoginSchema } from "@/validation/auth.schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ROLE_BASE_ROUTES } from "@/data/shared/roles";
import {
  getProfile,
  loginUser,
  logoutUser,
} from "@/lib/services/auth/auth";

export function useLogin() {
  const { setUser } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: LoginSchema) => {
      const user = await loginUser(data.email, data.password);
      if (!user) throw new Error("Login failed, please try again");

      const profile = await getProfile(user.id);

      // Allow super_admin to sign in through the admin portal; block all other mismatches
      if (
        profile.role !== data.role &&
        !(data.role === "admin" && profile.role === "super_admin")
      ) {
        await logoutUser().catch(() => {});
        throw new Error(`You are not registered as ${data.role}`);
      }

      return profile;
    },

    onSuccess: (profile) => {
      setUser(profile);
      toast.success(`Welcome back, ${profile.full_name}!`);
      const base = ROLE_BASE_ROUTES[profile.role];
      router.replace(base ? `${base}/dashboard` : "/");
    },

    onError: (err: Error) => {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    },
  });
}
