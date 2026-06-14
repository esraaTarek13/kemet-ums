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
  isLoading: boolean;
  isError: boolean;
  courseId: string;
  portal: "student" | "faculty";
}

export default function ChatWindow({
  messages,
  courseInfo,
  isLoading,
  isError,
  courseId,
  portal,
}: ChatWindowProps) {
  if (isLoading) return <ChatSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load messages." />;

  return (
    <ChatProvider courseId={courseId} portal={portal}>
      <section className="grid grid-cols-1 grid-rows-[auto_1fr_auto] w-full h-[79dvh]">
        <ChatHeader courseInfo={courseInfo} />

        <div
          className="h-full py-8 pl-6 overflow-y-auto space-y-4 md:space-y-6"
          role="log"
          aria-live="polite"
        >
          {messages.length === 0 ? (
            <p className="text-center text-text-subtle">No messages yet</p>
          ) : (
            messages.map((msg) => <MessageBubble key={msg.id} message={msg} />)
          )}
        </div>

        <ChatInput />
      </section>
    </ChatProvider>
  );
}