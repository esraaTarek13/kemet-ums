import { supabase } from "@/lib/supabase/client";

export const updateAvatar = async (
  file: File,
  userId: string,
): Promise<string> => {
  const ext = file.name.split(".").pop();
  const path = `${userId}/avatar.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(path, file, { upsert: true });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from("avatars").getPublicUrl(path);

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: data.publicUrl })
    .eq("id", userId);

  if (updateError) throw updateError;

  return data.publicUrl;
};

export const deleteAvatar = async (
  userId: string,
  avatarUrl: string,
): Promise<void> => {
  // Guard against malformed URLs that don't contain the expected bucket path
  const path = avatarUrl.split("/avatars/")[1];
  if (!path) throw new Error("Invalid avatar URL");

  const { error: deleteError } = await supabase.storage
    .from("avatars")
    .remove([path]);

  if (deleteError) throw deleteError;

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: null })
    .eq("id", userId);

  if (updateError) throw updateError;
};

// For authenticated users — records password_changed_at without signing out
export const changePassword = async (newPassword: string) => {
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) throw error;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    await supabase
      .from("profiles")
      .update({ password_changed_at: new Date().toISOString() })
      .eq("id", user.id);
  }
};
