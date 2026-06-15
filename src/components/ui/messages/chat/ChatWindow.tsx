import { CourseInfo, Message } from "@/types";
import ChatInput from "../chat-input/ChatInput";
import ChatHeader from "./ChatHeader";
import { ChatSkeleton } from "../../skeletons/ChatSkeleton";
import ErrorMessage from "../../ErrorMessage";
import { ChatProvider } from "../context/ChatContext";
import MessageBubble from "./MessageBubble";

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
  if (isPending) return <ChatSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load messages." />;

  return (
    <ChatProvider courseId={courseId} portal={portal}>
      <section className="flex flex-col min-h-full w-full relative">
        <ChatHeader courseInfo={courseInfo} />

        <div
          className="px-6 pt-6 mt-14 h-[70vh] md:h-[68vh] lg:h-[65vh] overflow-y-auto"
          role="log"
          aria-live="polite"
        >
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

        <ChatInput />
      </section>
    </ChatProvider>
  );
}
