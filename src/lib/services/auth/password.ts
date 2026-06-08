import { supabase } from "@/lib/supabase/client";

export const forgotPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw error;
};

export const verifyOtp = async (email: string, otp: string) => {
  const { error } = await supabase.auth.verifyOtp({
    email,
    token: otp,
    type: "recovery",
  });
  if (error) throw error;
};

// Updates password_changed_at in profiles
export const resetPassword = async (newPassword: string) => {
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) throw error;
  const userId = (await supabase.auth.getUser()).data.user?.id ?? "";
  await supabase
    .from("profiles")
    .update({ password_changed_at: new Date().toISOString() })
    .eq("id", userId);
  await supabase.auth.signOut();
};


