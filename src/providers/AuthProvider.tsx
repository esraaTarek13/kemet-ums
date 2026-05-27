"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { supabase } from "@/lib/supabase/client";
import { getProfile } from "@/lib/services/auth/auth.service";

// Restores user session on app load and syncs profile to global store
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        // If session exists, fetch and store user profile
        if (user) {
          const profile = await getProfile(user.id);
          setUser(profile);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, [setUser, setLoading]);

  return children;
}
