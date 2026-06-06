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

// Sign out after reset to force re-login
export const resetPassword = async (newPassword: string) => {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  if (error) throw error;
  await supabase.auth.signOut();
};
