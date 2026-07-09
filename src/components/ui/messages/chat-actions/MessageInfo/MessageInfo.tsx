import { useMessageReadStatus } from "@/hooks/shared/messages/useMessages";
import * as Dialog from "@radix-ui/react-dialog";
import { IoCheckmarkDoneOutline, IoClose } from "react-icons/io5";
import UserRow from "./UserRow";

interface MessageInfoProps {
  messageId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MessageInfo({
  messageId,
  open,
  onOpenChange,
}: MessageInfoProps) {
  const {
    data: messageInfo,
    isPending,
    isError,
  } = useMessageReadStatus(messageId, open);

  const seen = messageInfo?.filter((u) => u.seen) ?? [];
  const delivered = messageInfo?.filter((u) => !u.seen) ?? [];

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 card shadow-lg z-50 w-[90vw] max-w-md"
          aria-describedby={undefined}
        >
          <p id="message-info-description" className="sr-only">
            Shows who has seen and received this message.
          </p>

          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-border">
            <Dialog.Title className="title">Message info</Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close modal"
                className="text-text-subtle text-2xl cursor-pointer"
              >
                <IoClose aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>

          {isPending && (
            <div className="py-10 text-center text-sm text-text-subtle">
              Loading...
            </div>
          )}

          {isError && (
            <div className="py-10 text-center text-sm text-danger">
              Failed to load message info.
            </div>
          )}

          {!isPending && !isError && (
            <>
              {/* Seen */}
              <div className="my-6">
                <h6 className="flex items-center gap-1 mb-3">
                  <IoCheckmarkDoneOutline className="text-[#53bdeb] text-lg shrink-0" />
                  <span className="text-sm">Seen</span>
                </h6>

                <div className="space-y-1">
                  {seen.length > 0 ? (
                    seen.map((user) => (
                      <UserRow key={user.user_id} user={user} />
                    ))
                  ) : (
                    <p className="text-xs text-text-subtle py-2">
                      No one has seen this message yet.
                    </p>
                  )}
                </div>
              </div>

              {/* Delivered */}
              <div className="my-6">
                <h6 className="flex items-center gap-1 mb-3">
                  <IoCheckmarkDoneOutline className="text-text-subtle text-lg shrink-0" />
                  <span className="text-sm">Delivered</span>
                </h6>

                <div className="space-y-1">
                  {delivered.length > 0 ? (
                    delivered.map((user) => (
                      <UserRow key={user.user_id} user={user} />
                    ))
                  ) : (
                    <p className="text-xs text-text-subtle py-2">
                      No delivery info available.
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
