"use client";

import { useRef } from "react";
import { FiPlusCircle } from "react-icons/fi";

interface AttachmentButtonProps {
  onFileSelect: (files: File[]) => void;
  disabled?: boolean;
}

export default function AttachmentButton({
  onFileSelect,
  disabled,
}: AttachmentButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length) onFileSelect(files);
    e.target.value = "";
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled}
        aria-label="Attach file"
        className="cursor-pointer disabled:opacity-50"
      >
        <FiPlusCircle className="text-text-secondary text-2xl md:text-3xl shrink-0" />
      </button>
    </>
  );
}
