"use client";

import { useRef, useState } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, {
    onClickOutside: () => setShowEmojiPicker(false),
    enabled: showEmojiPicker,
  });

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onEmojiSelect(emojiData.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setShowEmojiPicker((prev) => !prev)}
        aria-label="Open emoji picker"
      >
        <FaRegFaceSmile className="text-text-secondary text-2xl shrink-0 cursor-pointer" />
      </button>

      {showEmojiPicker && (
        <div className="absolute bottom-full right-0 mb-2 z-50">
          <EmojiPicker onEmojiClick={handleEmojiClick} theme={Theme.LIGHT} />
        </div>
      )}
    </div>
  );
}
