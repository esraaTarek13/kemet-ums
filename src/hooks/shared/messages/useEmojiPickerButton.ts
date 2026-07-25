import { useEffect, useRef, useState } from "react";
import { EmojiClickData } from "emoji-picker-react";
import useClickOutside from "@/hooks/shared/useClickOutside";

export function useEmojiPickerButton(onEmojiSelect: (emoji: string) => void) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 640);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    useClickOutside(containerRef, {
        onClickOutside: () => setShowEmojiPicker(false),
        enabled: showEmojiPicker,
    });

    useEffect(() => {
        if (!showEmojiPicker) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setShowEmojiPicker(false);
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [showEmojiPicker]);

    function toggle() {
        setShowEmojiPicker((prev) => !prev);
    }

    function handleEmojiClick(emojiData: EmojiClickData) {
        onEmojiSelect(emojiData.emoji);
        setShowEmojiPicker(false);
    }

    return {
        containerRef,
        showEmojiPicker,
        isMobile,
        toggle,
        handleEmojiClick,
    };
}