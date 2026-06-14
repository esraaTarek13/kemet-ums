import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/authStore";
import {
  sendMessage,
  deleteMessage,
  editMessage,
  sendMessageWithFiles,
} from "@/lib/services/shared/messages";

// Shared helper to invalidate both the course chat and the sidebar list
function useInvalidateMessages(courseId: string, portal: "student" | "faculty") {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: [`${portal}-course-messages`, courseId] });
    queryClient.invalidateQueries({ queryKey: [`${portal}-messages`] });
  };
}

export function useSendMessage(courseId: string, portal: "student" | "faculty") {
  const { user } = useAuthStore();
  const invalidate = useInvalidateMessages(courseId, portal);

  return useMutation({
    mutationFn: (content: string) =>
      sendMessage({
        course_id: courseId,
        sender_id: user?.id ?? "",
        content,
      }),
    onSuccess: invalidate,
    onError: (err: Error) => toast.error(err.message ?? "Failed to send message"),
  });
}

export function useSendFiles(courseId: string, portal: "student" | "faculty") {
  const { user } = useAuthStore();
  const invalidate = useInvalidateMessages(courseId, portal);

  return useMutation({
    mutationFn: ({ files, content }: { files: File[]; content?: string }) =>
      sendMessageWithFiles(
        {
          course_id: courseId,
          sender_id: user?.id ?? "",
          content: content?.trim() || undefined,
        },
        files,
      ),
    onSuccess: invalidate,
    onError: (err: Error) => toast.error(err.message ?? "Failed to send files"),
  });
}

export function useDeleteMessage(courseId: string, portal: "student" | "faculty") {
  const { user } = useAuthStore();
  const invalidate = useInvalidateMessages(courseId, portal);

  return useMutation({
    mutationFn: (messageId: string) => deleteMessage(messageId, user?.id ?? ""),
    onSuccess: invalidate,
    onError: (err: Error) => toast.error(err.message ?? "Failed to delete message"),
  });
}

export function useEditMessage(courseId: string, portal: "student" | "faculty") {
  const { user } = useAuthStore();
  const invalidate = useInvalidateMessages(courseId, portal);

  return useMutation({
    mutationFn: ({ messageId, content }: { messageId: string; content: string }) =>
      editMessage(messageId, user?.id ?? "", content),
    onSuccess: invalidate,
    onError: (err: Error) => toast.error(err.message ?? "Failed to edit message"),
  });
}