import { useState } from "react";
import { Message } from "@/types";

const TRUNCATE_LENGTH = 200;

export function useMessageBubble(message: Message) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [infoOpen, setInfoOpen] = useState(false);

    const isMine = message.is_mine;
    const content = message.content ?? "";
    const isLong = content.length > TRUNCATE_LENGTH;
    const displayContent =
        isLong && !isExpanded
            ? content.slice(0, TRUNCATE_LENGTH) + "..."
            : content;

    function toggleExpanded() {
        setIsExpanded((prev) => !prev);
    }

    return {
        isMine,
        content,
        isLong,
        displayContent,
        isExpanded,
        toggleExpanded,
        editOpen,
        setEditOpen,
        deleteOpen,
        setDeleteOpen,
        infoOpen,
        setInfoOpen,
    };
}