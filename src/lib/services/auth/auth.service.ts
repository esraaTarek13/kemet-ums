import { supabase } from "@/lib/supabase/client";
import type { User } from "@/types";

/** Signs in a user and returns the raw Supabase user object. */
export const loginUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data.user;
};

/** Fetches the user's profile record from the `profiles` table by ID. */
export const getProfile = async (userId: string): Promise<User> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error || !data) throw error ?? new Error("Profile not found");
  return data;
};

/** Signs out the current user and clears the Supabase session. */
export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
