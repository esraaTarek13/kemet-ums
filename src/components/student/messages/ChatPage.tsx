"use client" 
import ChatWindow from "@/components/ui/messages/chat/ChatWindow";
import { useStudentCourseMessages } from "@/hooks/student/messages/queries/useStudentCourseMessages";

interface ChatPageProps {
  chatId: string;
}

export default function ChatPage({ chatId }: ChatPageProps) {
  const { data, isPending, isError } = useStudentCourseMessages(chatId);
  const messages = data?.messages ?? [];
  const courseInfo = data?.course;
  
  return (
    <ChatWindow
      messages={messages}
      courseInfo={courseInfo}
      isPending={isPending}
      isError={isError}
      portal="student"
      courseId={chatId}
    />
  );
}
