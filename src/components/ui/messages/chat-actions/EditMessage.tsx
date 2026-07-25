"use client";

import * as Dialog from "@radix-ui/react-dialog";
import EmojiPickerButton from "./EmojiPickerButton";
import TextareaAutosize from "react-textarea-autosize";
import { useEditMessageForm } from "@/hooks/shared/messages/useEditMessageForm";

interface EditMessageProps {
  messageId: string;
  content: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditMessage({
  messageId,
  content,
  open,
  onOpenChange,
}: EditMessageProps) {
  const {
    register,
    isPending,
    isUnchanged,
    handleOpenChange,
    insertEmoji,
    onSubmit,
  } = useEditMessageForm({ messageId, content, open, onOpenChange });

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />

        <Dialog.Content
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 card shadow-lg z-50 w-[90vw] max-w-md"
          aria-describedby={undefined}
        >
          <Dialog.Title className="font-bold text-text-primary">
            Edit message
          </Dialog.Title>

          <p id="edit-message-description" className="sr-only">
            Edit the content of your message then press Save.
          </p>

          <form onSubmit={onSubmit} className="mt-3">
            <div className="flex justify-between gap-3 items-center bg-bg-input rounded-xl grow p-3 md:p-4">
              <label htmlFor="edit-message" className="sr-only">
                Edit message content
              </label>

              <TextareaAutosize
                id="edit-message"
                minRows={1}
                maxRows={4}
                autoFocus
                autoComplete="off"
                {...register("content", { required: true })}
                className="text-sm md:text-base text-text-primary w-full outline-none resize-none cursor-auto"
              />

              {/* shouldDirty syncs RHF state after emoji insert */}
              <EmojiPickerButton onEmojiSelect={insertEmoji} />
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <Dialog.Close asChild>
                <button
                  type="button"
                  disabled={isPending}
                  className="px-4 py-2 text-sm rounded-lg text-text-secondary hover:bg-bg-input disabled:opacity-50 cursor-pointer"
                >
                  Cancel
                </button>
              </Dialog.Close>

              <button
                type="submit"
                disabled={isPending || isUnchanged}
                aria-busy={isPending}
                className="px-4 py-2 text-sm rounded-lg bg-accent text-white hover:bg-primary disabled:opacity-50 cursor-pointer"
              >
                {isPending ? "Saving…" : "Save"}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
