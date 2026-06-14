"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useChatContext } from "../context/ChatContext";
import { useEditMessage } from "@/hooks/shared/useMessages";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import EmojiPickerButton from "./EmojiPickerButton";
import TextareaAutosize from "react-textarea-autosize";

interface EditMessageProps {
  messageId: string;
  content: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
interface EditFormValues {
  content: string;
}

export default function EditMessage({
  messageId,
  content,
  open,
  onOpenChange,
}: EditMessageProps) {
  const { courseId, portal } = useChatContext();
  const { mutate, isPending } = useEditMessage(courseId, portal);

  const { register, handleSubmit, watch, reset, setValue } =
    useForm<EditFormValues>({
      defaultValues: { content },
    });

  const newContent = watch("content");

  // Reset the form to the current content whenever the dialog opens
  useEffect(() => {
    if (open) reset({ content });
  }, [open, content, reset]);

  const onSubmit = (values: EditFormValues) => {
    const trimmed = values.content.trim();

    if (!trimmed || trimmed === content.trim()) {
      onOpenChange(false);
      return;
    }

    mutate(
      { messageId, content: trimmed },
      { onSuccess: () => onOpenChange(false) },
    );
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 card shadow-lg z-50 w-[90vw] max-w-md">
          <Dialog.Title className="font-bold text-text-primary">
            Edit message
          </Dialog.Title>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
            <div className="flex justify-between gap-3 items-center bg-bg-input rounded-xl grow p-3 md:p-4">
              <label htmlFor="edit-message" className="sr-only">
                Edit message content
              </label>
              <TextareaAutosize
                minRows={1}
                maxRows={4}
                id="edit-message"
                autoFocus
                autoComplete="off"
                {...register("content", { required: true })}
                className="text-sm md:text-base text-text-primary w-full outline-none resize-none cursor-auto"
              />

              <EmojiPickerButton
                onEmojiSelect={(emoji) =>
                  setValue("content", (newContent ?? "") + emoji)
                }
              />
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <Dialog.Close asChild>
                <button
                  type="button"
                  disabled={isPending}
                  className="px-4 py-2 text-sm rounded-lg text-text-secondary hover:bg-bg-input cursor-pointer"
                >
                  Cancel
                </button>
              </Dialog.Close>
              <button
                type="submit"
                disabled={isPending || newContent === content}
                className="px-4 py-2 text-sm rounded-lg bg-accent text-white hover:bg-primary disabled:opacity-50 cursor-pointer"
              >
                Save
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
