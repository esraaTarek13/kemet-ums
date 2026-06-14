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

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const addFiles = (files: File[]) => {
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const addEmoji = (emoji: string) => {
    setValue("content", (content ?? "") + emoji);
  };

  const onSubmit = (values: ChatFormValues) => {
    const trimmed = values.content.trim();

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

    if (!trimmed) return;

    sendMessage(trimmed, { onSuccess: () => reset() });
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
  };
}