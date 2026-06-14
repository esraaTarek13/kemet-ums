import { supabase } from "@/lib/supabase/client";
import { SendMessagePayload } from "@/types";

export async function sendMessage(payload: SendMessagePayload): Promise<void> {
  const { error } = await supabase.from("messages").insert(payload);
  if (error) throw new Error(error.message);
}

export async function deleteMessage(messageId: string, senderId: string): Promise<void> {
  const { error } = await supabase
    .from("messages")
    .delete()
    .eq("id", messageId)
    .eq("sender_id", senderId);
  if (error) throw new Error(error.message);
}

export async function editMessage(messageId: string, senderId: string, content: string): Promise<void> {
  const { error } = await supabase
    .from("messages")
    .update({ content, edited_at: new Date().toISOString() })
    .eq("id", messageId)
    .eq("sender_id", senderId);
  if (error) throw new Error(error.message);
}

export async function sendMessageWithFiles(
  payload: { course_id: string; sender_id: string; content?: string },
  files: File[],
): Promise<void> {
  const { data: message, error: msgError } = await supabase
    .from("messages")
    .insert(payload)
    .select()
    .single();

  if (msgError) throw new Error(msgError.message);

  for (const file of files) {
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) throw new Error(`${file.name} exceeds 10MB limit`);

    const ext = file.name.split(".").pop();
    const path = `${payload.sender_id}/${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("chat-attachments")
      .upload(path, file);

    if (uploadError) throw new Error(uploadError.message);

    const { data: urlData } = supabase.storage.from("chat-attachments").getPublicUrl(path);

    await supabase.from("message_attachments").insert({
      message_id: message.id,
      file_url: urlData.publicUrl,
      file_name: file.name,
      file_type: file.type,
      file_size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
    });
  }
}
