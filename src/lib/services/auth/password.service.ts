import { supabase } from "@/lib/supabase/client";

/** Sends a password reset OTP to the user's email. */
export const forgotPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw error;
};

/** Verifies the OTP sent to the user's email. */
export const verifyOtp = async (email: string, otp: string) => {
  const { error } = await supabase.auth.verifyOtp({
    email,
    token: otp,
    type: "recovery",
  });
  if (error) throw error;
};

/** Updates the user's password after OTP verification. */
export const resetPassword = async (newPassword: string) => {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  if (error) throw error;
  await supabase.auth.signOut();
};
