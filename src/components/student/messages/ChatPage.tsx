"use client" 
import ChatWindow from "@/components/ui/messages/chat/ChatWindow";
import { useStudentCourseMessages } from "@/hooks/student/useMessages";

interface ChatPageProps {
  chatId: string;
}

export default function ChatPage({ chatId }: ChatPageProps) {
  const { data, isLoading, isError } = useStudentCourseMessages(chatId);
  const messages = data?.messages ?? [];
  const courseInfo = data?.course;
  return (
    <ChatWindow
      messages={messages}
      courseInfo={courseInfo}
      isLoading={isLoading}
      isError={isError}
      portal="student"
      courseId={chatId}
    />
  );
}
