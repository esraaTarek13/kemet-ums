import { Message } from "@/types";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { format } from "date-fns";
import MessageMenu from "../chat-actions/MessageMenu";
import AttachmentList from "./AttachmentList";
import { memo, useState } from "react";

interface MessageBubbleProps {
  message: Message;
}

const TRUNCATE_LENGTH = 200;

// Format timestamp safely, falling back to empty string on invalid dates
function formatTime(date: string) {
  const parsed = new Date(date);
  return isNaN(parsed.getTime()) ? "" : format(parsed, "hh:mm a");
}

function MessageBubble({ message }: MessageBubbleProps) {
  const isMine = message.is_mine;
  const [isExpanded, setIsExpanded] = useState(false);

  const content = message.content ?? "";
  const isLong = content.length > TRUNCATE_LENGTH;
  const displayContent =
    isLong && !isExpanded ? content.slice(0, TRUNCATE_LENGTH) + "..." : content;

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"} `}>
      <div
        className={`flex gap-3 max-w-[80%] ${isMine ? "flex-row-reverse" : ""}`}
      >
        {/* Avatar: image or fallback icon (sender name nearby provides context) */}
        {message.sender_avatar ? (
          <Image
            src={message.sender_avatar}
            alt={message.sender_name}
            width={36}
            height={36}
            className="rounded-full object-cover w-7 md:w-9 h-7 md:h-9 shrink-0"
          />
        ) : (
          <FaUserCircle
            aria-hidden="true"
            className="text-primary text-3xl md:text-4xl shrink-0"
          />
        )}

        <div
          className={`${isMine ? "text-end" : "text-start"} space-y-1.5 min-w-0`}
        >
          {/* Sender name label */}
          <h6 className="font-bold text-xs text-primary">
            {isMine ? "You" : message.sender_name}
          </h6>

          {/* Message bubble */}
          <div
            className={`${isMine ? "bg-accent rounded-tr-none" : "bg-bg-card rounded-tl-none"} max-w-50 md:max-w-100 group border border-bg-bar shadow-xl rounded-xl py-2 md:py-3 px-2 md:px-4`}
          >
            <div
              className={`${
                isMine ? "text-text-white" : "text-text-primary "
              } text-sm wrap-break-words flex gap-2 items-start`}
            >
              <MessageMenu
                isMine={isMine}
                messageId={message.id}
                content={message.content}
              />
              <div className="space-y-4">
                {message.attachments.length > 0 && (
                  <AttachmentList attachments={message.attachments} />
                )}

                {message.content && <p>{displayContent}</p>}
              </div>
            </div>

            <div className="flex justify-between items-center gap-2">
              {message.content && isLong && (
                <button
                  type="button"
                  onClick={() => setIsExpanded((prev) => !prev)}
                  aria-expanded={isExpanded}
                  className={`text-xs font-semibold underline cursor-pointer ${
                    isMine ? "text-text-white/80 " : "text-primary"
                  }`}
                >
                  {isExpanded ? "Show less" : "Read more"}
                </button>
              )}

              <p
                className={`${
                  isMine ? "text-text-white/70 ml-auto" : "text-text-muted "
                } text-[10px] mt-2 self-end`}
              >
                {formatTime(message.created_at)}
                {message.edited_at && <span> · edited</span>}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Avoid re-rendering unchanged messages when new ones arrive
export default memo(MessageBubble);
