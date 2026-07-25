"use client";

import { useEmojiPickerButton } from "@/hooks/shared/messages/useEmojiPickerButton";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { FaRegFaceSmile } from "react-icons/fa6";

interface EmojiPickerButtonProps {
  onEmojiSelect: (emoji: string) => void;
}

export default function EmojiPickerButton({
  onEmojiSelect,
}: EmojiPickerButtonProps) {
  const { containerRef, showEmojiPicker, isMobile, toggle, handleEmojiClick } =
    useEmojiPickerButton(onEmojiSelect);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={toggle}
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
