"use client";

import { useRef, useState, useEffect } from "react";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import { FaRegFaceSmile } from "react-icons/fa6";
import useClickOutside from "@/hooks/shared/useClickOutside";

interface EmojiPickerButtonProps {
  onEmojiSelect: (emoji: string) => void;
}

export default function EmojiPickerButton({
  onEmojiSelect,
}: EmojiPickerButtonProps) {
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

  function handleEmojiClick(emojiData: EmojiClickData) {
    onEmojiSelect(emojiData.emoji);
    setShowEmojiPicker(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setShowEmojiPicker((prev) => !prev)}
        aria-label="Open emoji picker"
        aria-expanded={showEmojiPicker}
        aria-haspopup="dialog"
      >
        <FaRegFaceSmile className="text-text-secondary text-lg md:text-2xl shrink-0 cursor-pointer" />
      </button>

      {showEmojiPicker && (
        <div
          className={`
            absolute z-50
            ${
              isMobile
                ? "fixed inset-x-2 bottom-16"
                : "bottom-full right-0 mb-2"
            }
          `}
        >
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            theme={Theme.LIGHT}
            width={isMobile ? "90%" : 350}
            height={isMobile ? 380 : 450}
          />
        </div>
      )}
    </div>
  );
}
