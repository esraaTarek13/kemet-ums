import { useChatContext } from "@/components/ui/messages/context/ChatContext";
import { useCallback } from "react";
import { useDeleteMessage } from "./useMessages";

export function useDeleteMessageAction(onSuccess: () => void) {
  const { courseId, portal } = useChatContext();
  const { mutate: deleteMessage, isPending } = useDeleteMessage(
    courseId,
    portal,
  );

  const onConfirm = useCallback(
    (messageId: string) => {
      deleteMessage(messageId, { onSuccess, onError: onSuccess });
    },
    [deleteMessage, onSuccess],
  );

  return { onConfirm, isPending };
}
