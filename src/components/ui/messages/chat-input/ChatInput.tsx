"use client";

import { IoSend } from "react-icons/io5";
import TextareaAutosize from "react-textarea-autosize";
import EmojiPickerButton from "../chat-actions/EmojiPickerButton";
import AttachmentButton from "./AttachmentButton";
import FilePreviewList from "./FilePreviewList";
import { useChatInput } from "../../../../hooks/shared/useChatInput";

export default function ChatInput() {
  const {
    register,
    handleSubmit,
    content,
    isPending,
    selectedFiles,
    removeFile,
    addFiles,
    addEmoji,
    onEnterKeyDown,
  } = useChatInput();

  return (
    <div className="h-fit card rounded-none z-50">
      {/* Preview of files attached before sending */}
      <FilePreviewList files={selectedFiles} onRemove={removeFile} />

      <form
        onSubmit={handleSubmit}
        className="flex justify-between items-center gap-4"
      >
        <AttachmentButton onFileSelect={addFiles} disabled={isPending} />

        <div className="flex justify-between gap-3 items-center bg-bg-input rounded-xl grow p-3 md:p-4">
          <label htmlFor="message" className="sr-only">
            Type a message
          </label>
          <TextareaAutosize
            id="message"
            autoComplete="off"
            placeholder={
              selectedFiles.length ? "Add a caption..." : "Type a message..."
            }
            disabled={isPending}
            minRows={1}
            maxRows={4}
            // Enter sends, Shift+Enter inserts a newline
            onKeyDown={onEnterKeyDown}
            {...register("content")}
            className="text-sm md:text-base text-text-primary w-full bg-transparent outline-none resize-none cursor-auto"
          />

          <EmojiPickerButton onEmojiSelect={addEmoji} />
        </div>

        {/* Icon-only button needs aria-label for screen readers */}
        <button
          type="submit"
          aria-label="Send message"
          disabled={
            isPending || (!content?.trim() && selectedFiles.length === 0)
          }
          className="flex justify-center items-center bg-accent rounded-xl p-3 cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed"
        >
          <IoSend
            aria-hidden="true"
            className="text-text-white text-xl md:text-2xl shrink-0"
          />
        </button>
      </form>
    </div>
  );
}
