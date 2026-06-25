import { MessageAttachment } from "@/types";
import { downloadFile } from "@/lib/utils/downloadFile";
import Image from "next/image";
import { FiDownload, FiFile } from "react-icons/fi";

interface AttachmentListProps {
  attachments: MessageAttachment[];
}

export default function AttachmentList({ attachments }: AttachmentListProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      {attachments.map((att) => {
        const isImage = att.file_type?.startsWith("image/");

        return (
          <div key={att.id}>
            {isImage ? (
              <a href={att.file_url} target="_blank" rel="noopener noreferrer">
                <Image
                  src={att.file_url}
                  alt={att.file_name ?? "Attached image"}
                  width={100}
                  height={100}
                  className="rounded-lg object-cover max-w-full w-auto h-auto md:w-72"
                />
              </a>
            ) : (
              <button
                type="button"
                onClick={() =>
                  downloadFile(att.file_url, att.file_name ?? "file")
                }
                className="flex items-center justify-between gap-2 bg-bg-input/70 rounded-lg p-2.5 hover:bg-bg-input/50 transition-colors text-text-primary md:w-full cursor-pointer"
              >
                <div className="flex items-center gap-2 w-15 md:w-50">
                  <FiFile
                    aria-hidden="true"
                    className="text-xl md:text-2xl shrink-0"
                  />
                  <span className="text-xs md:text-sm font-medium truncate flex-1">
                    {att.file_name ?? "Attachment"}
                  </span>
                </div>
                <FiDownload aria-hidden="true" className="text-lg shrink-0" />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
