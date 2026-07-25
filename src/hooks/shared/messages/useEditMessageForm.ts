import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useEditMessage } from "@/hooks/shared/messages/useMessages";
import { useChatContext } from "@/components/ui/messages/context/ChatContext";

interface EditFormValues {
    content: string;
}

interface UseEditMessageFormParams {
    messageId: string;
    content: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function useEditMessageForm({
    messageId,
    content,
    open,
    onOpenChange,
}: UseEditMessageFormParams) {
    const { courseId, portal } = useChatContext();
    const { mutate, isPending } = useEditMessage(courseId, portal);

    const { register, handleSubmit, control, reset, setValue } =
        useForm<EditFormValues>({
            defaultValues: { content },
        });

    const newContent = useWatch({ control, name: "content" });

    // Compare trimmed values so extra spaces don't enable the Save button
    const trimmedNew = newContent?.trim() ?? "";
    const trimmedOriginal = content.trim();
    const isUnchanged = trimmedNew === trimmedOriginal || trimmedNew === "";

    // Re-populate the form every time the dialog opens
    useEffect(() => {
        if (open) reset({ content });
    }, [open, content, reset]);

    // Prevent closing while a request is in-flight
    function handleOpenChange(next: boolean) {
        if (isPending) return;
        onOpenChange(next);
    }

    function insertEmoji(emoji: string) {
        setValue("content", (newContent ?? "") + emoji, { shouldDirty: true });
    }

    const onSubmit = handleSubmit((values) => {
        const trimmed = values.content.trim();

        if (!trimmed || trimmed === trimmedOriginal) {
            onOpenChange(false);
            return;
        }

        mutate(
            { messageId, content: trimmed },
            { onSuccess: () => onOpenChange(false) },
        );
    });

    return {
        register,
        isPending,
        isUnchanged,
        handleOpenChange,
        insertEmoji,
        onSubmit,
    };
}