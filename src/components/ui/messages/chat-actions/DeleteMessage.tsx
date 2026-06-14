"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useChatContext } from "../context/ChatContext";
import { useDeleteMessage } from "@/hooks/shared/useMessages";

interface DeleteMessageProps {
  messageId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DeleteMessage({
  messageId,
  open,
  onOpenChange,
}: DeleteMessageProps) {
  const { courseId, portal } = useChatContext();
  const { mutate: deleteMessage, isPending } = useDeleteMessage(
    courseId,
    portal,
  );

  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 card shadow-lg z-50 w-[90vw] max-w-sm">
          <AlertDialog.Title className="font-bold text-text-primary">
            Delete message?
          </AlertDialog.Title>
          <AlertDialog.Description className="text-sm text-text-secondary mt-2">
            This action cannot be undone. The message will be permanently
            deleted.
          </AlertDialog.Description>

          <div className="flex justify-end gap-3 mt-4">
            <AlertDialog.Cancel asChild>
              <button
                type="button"
                className="px-4 py-2 text-sm rounded-lg text-text-secondary hover:bg-bg-input cursor-pointer"
              >
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                type="button"
                disabled={isPending}
                onClick={() => deleteMessage(messageId)}
                className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 cursor-pointer"
              >
                Delete
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
