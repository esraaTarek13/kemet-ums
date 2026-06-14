import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSendFiles, useSendMessage } from "@/hooks/shared/useMessages";
import { useChatContext } from "../context/ChatContext";

interface ChatFormValues {
  content: string;
}

export function useChatInput() {
  const { courseId, portal } = useChatContext();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const { register, handleSubmit, reset, watch, setValue } =
    useForm<ChatFormValues>({
      defaultValues: { content: "" },
    });

  const { mutate: sendMessage, isPending: isSendingMessage } = useSendMessage(
    courseId,
    portal,
  );
  const { mutate: sendFiles, isPending: isSendingFile } = useSendFiles(
    courseId,
    portal,
  );

  const content = watch("content");
  const isPending = isSendingMessage || isSendingFile;

  // Remove a file from the pending attachments list
  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Append newly selected files to the pending list
  const addFiles = (files: File[]) => {
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  // Insert emoji at the end of the current message text
  const addEmoji = (emoji: string) => {
    setValue("content", (content ?? "") + emoji);
  };

  const onSubmit = (values: ChatFormValues) => {
    const trimmed = values.content.trim();

    // Files take priority: send with optional caption
    if (selectedFiles.length > 0) {
      sendFiles(
        { files: selectedFiles, content: trimmed || undefined },
        {
          onSuccess: () => {
            setSelectedFiles([]);
            reset();
          },
        },
      );
      return;
    }

    // No files and empty text — nothing to send
    if (!trimmed) return;

    sendMessage(trimmed, { onSuccess: () => reset() });
  };

  // Enter sends the message, Shift+Enter inserts a newline
  const onEnterKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    content,
    isPending,
    selectedFiles,
    removeFile,
    addFiles,
    addEmoji,
    onEnterKeyDown,
  };
}
