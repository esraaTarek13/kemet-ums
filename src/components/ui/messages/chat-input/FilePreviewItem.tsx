import { FiFile, FiX } from "react-icons/fi";
import Image from "next/image";
import { useEffect, useState } from "react";

interface FilePreviewItemProps {
  file: File;
  onRemove: () => void;
}

export default function FilePreviewItem({
  file,
  onRemove,
}: FilePreviewItemProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const isImage = file.type.startsWith("image/");

  // Generate a local preview URL for images, and clean it up on unmount/change
  useEffect(() => {
    if (!isImage) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file, isImage]);

  return (
    <div className="flex items-center gap-2 bg-bg-input rounded-xl p-2 w-fit max-w-50 mb-1">
      {previewUrl ? (
        // unoptimized: blob URLs can't be processed by Next's image optimizer
        <Image
          src={previewUrl}
          alt={file.name}
          width={48}
          height={48}
          unoptimized
          className="rounded-lg object-cover w-12 h-12 shrink-0"
        />
      ) : (
        <FiFile
          aria-hidden="true"
          className="text-2xl text-text-secondary shrink-0"
        />
      )}
      <span className="text-xs text-text-primary truncate flex-1">
        {file.name}
      </span>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${file.name}`}
        className="cursor-pointer text-text-secondary hover:text-red-500 shrink-0"
      >
        <FiX aria-hidden="true" className="text-lg" />
      </button>
    </div>
  );
}
