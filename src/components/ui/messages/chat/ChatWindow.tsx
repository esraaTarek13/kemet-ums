import { CourseInfo, Message } from "@/types";
import ChatInput from "../chat-input/ChatInput";
import ChatHeader from "./ChatHeader";
import { ChatSkeleton } from "../../skeletons/ChatSkeleton";
import ErrorMessage from "../../shared/ErrorMessage";
import { ChatProvider } from "../context/ChatContext";
import MessageBubble from "./MessageBubble";
import { useRadixPointerEventsFix } from "@/hooks/shared/useRadixPointerEventsFix";

interface ChatWindowProps {
  messages: Message[];
  courseInfo?: CourseInfo;
  isPending: boolean;
  isError: boolean;
  courseId: string;
  portal: "student" | "faculty";
}

export default function ChatWindow({
  messages,
  courseInfo,
  isPending,
  isError,
  courseId,
  portal,
}: ChatWindowProps) {
  useRadixPointerEventsFix();
  if (isPending) return <ChatSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load messages." />;

  return (
    <ChatProvider courseId={courseId} portal={portal}>
      <section className="flex flex-col h-full w-full relative">
        <ChatHeader courseInfo={courseInfo} />

        <div className="h-full overflow-y-auto">
          <div className="Custom-container pt-8" role="log" aria-live="polite">
            {messages.length === 0 ? (
              <p className="text-center text-text-subtle">No messages yet</p>
            ) : (
              <div className="pb-18 space-y-6">
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} message={msg} />
                ))}
              </div>
            )}
          </div>
        </div>

        <ChatInput />
      </section>
    </ChatProvider>
  );
}
