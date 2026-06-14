"use client";
import { useState } from "react";
import ChatWindow from "@/components/ui/messages/chat/ChatWindow";
import ConversationSidebar from "./ConversationSidebar";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { useStudentCourseMessages } from "@/hooks/student/useMessages";

export default function Messages() {
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const { data, isLoading, isError } = useStudentCourseMessages(
    selectedCourseId ?? "",
  );
  const messages = data?.messages ?? [];
  const courseInfo = data?.course;

  return (
    <div className="flex h-full">
      <ConversationSidebar
        selectedCourseId={selectedCourseId}
        onSelect={setSelectedCourseId}
      />
      {selectedCourseId ? (
        <ChatWindow
          messages={messages}
          courseInfo={courseInfo}
          isLoading={isLoading}
          isError={isError}
          portal="student"
          courseId={selectedCourseId}
        />
      ) : (
        <div className="hidden lg:flex flex-1 items-center justify-center">
          <p className="flex flex-col items-center gap-3 text-text-subtle">
            <IoChatbubbleEllipses
              className="text-5xl lg:text-8xl"
              aria-hidden="true"
            />
            <span className="lg:text-xl">
              Select a course to start chatting
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
