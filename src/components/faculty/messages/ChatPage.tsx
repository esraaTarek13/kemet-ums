"use client" 
import ChatWindow from "@/components/ui/messages/chat/ChatWindow";
import { useFacultyCourseMessages } from "@/hooks/faculty/messages/queries/useFacultyCourseMessages";

interface ChatPageProps {
  chatId: string;
}

export default function ChatPage({ chatId }: ChatPageProps) {
  const { data, isPending, isError } = useFacultyCourseMessages(chatId);
  const messages = data?.messages ?? [];
  const courseInfo = data?.course;
  return (
    <ChatWindow
      messages={messages}
      courseInfo={courseInfo}
      isPending={isPending}
      isError={isError}
      portal="faculty"
      courseId={chatId}
    />
  );
}
