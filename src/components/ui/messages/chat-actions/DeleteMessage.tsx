"use client";

import { useDeleteMessageAction } from "@/hooks/shared/messages/useDeleteMessage";
import ConfirmDialog from "@/components/ui/shared/ConfirmDialog";

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
  const { onConfirm, isPending } = useDeleteMessageAction(() =>
    onOpenChange(false),
  );

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      onConfirm={() => onConfirm(messageId)}
      isLoading={isPending}
      title="Delete message?"
      description="This action cannot be undone. The message will be permanently deleted."
      confirmLabel="Delete"
    />
  );
}
