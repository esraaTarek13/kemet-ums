import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/authStore";
import {
  sendMessage,
  deleteMessage,
  editMessage,
  sendMessageWithFiles,
  getMessageReadStatus,
} from "@/lib/services/shared/messages";
import { facultyMessagesKeys } from "@/hooks/faculty/messages/queries/queryKeys";
import { studentMessagesKeys } from "@/hooks/student/messages/queries/queryKeys";


// Shared helper to invalidate both the course chat and the sidebar list
function useInvalidateMessages(
  courseId: string,
  portal: "student" | "faculty",
) {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  return () => {
    const keys = portal === "faculty" ? facultyMessagesKeys : studentMessagesKeys;

    queryClient.invalidateQueries({
      queryKey: keys.course(courseId),
    });
    queryClient.invalidateQueries({
      queryKey: keys.list(user?.id),
    });
  };
}

export function useSendMessage(
  courseId: string,
  portal: "student" | "faculty",
) {
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
    onError: (err: Error) =>
      toast.error(err.message ?? "Failed to send message"),
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

export function useDeleteMessage(
  courseId: string,
  portal: "student" | "faculty",
) {
  const { user } = useAuthStore();
  const invalidate = useInvalidateMessages(courseId, portal);

  return useMutation({
    mutationFn: (messageId: string) => deleteMessage(messageId, user?.id ?? ""),
    onSuccess: invalidate,
    onError: (err: Error) =>
      toast.error(err.message ?? "Failed to delete message"),
  });
}

export function useEditMessage(
  courseId: string,
  portal: "student" | "faculty",
) {
  const { user } = useAuthStore();
  const invalidate = useInvalidateMessages(courseId, portal);

  return useMutation({
    mutationFn: ({
      messageId,
      content,
    }: {
      messageId: string;
      content: string;
    }) => editMessage(messageId, user?.id ?? "", content),
    onSuccess: invalidate,
    onError: (err: Error) =>
      toast.error(err.message ?? "Failed to edit message"),
  });
}

export function useMessageReadStatus(messageId: string, enabled: boolean) {
  return useQuery({
    queryKey: ["message-read-status", messageId],
    queryFn: () => getMessageReadStatus(messageId),
    enabled: enabled && !!messageId,
    staleTime: 1000 * 10,
  });
}