"use client";
import { useMemo, useState } from "react";
import ConversationSearchBar from "@/components/ui/messages/Conversation/ConversationSearchBar";
import { useStudentMessages } from "@/hooks/student/useMessages";
import ConversationItem from "@/components/ui/messages/Conversation/ConversationItem";
import { ConversationSidebarSkeleton } from "@/components/ui/skeletons/ConversationSidebarSkeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";

interface Props {
  selectedCourseId: string | null;
  onSelect: (courseId: string) => void;
}

export default function ConversationSidebar({
  selectedCourseId,
  onSelect,
}: Props) {
  const { data: threads, isPending, isError } = useStudentMessages();
  const [search, setSearch] = useState("");

  const sortedThreads = useMemo(
    () =>
      threads
        ?.slice()
        .filter(
          (t) =>
            t.course_name.toLowerCase().includes(search.toLowerCase()) ||
            t.course_code.toLowerCase().includes(search.toLowerCase()),
        )
        .sort((a, b) => {
          if (!a.last_message && !b.last_message) return 0;
          if (!a.last_message) return 1;
          if (!b.last_message) return -1;
          return (
            new Date(b.last_message.created_at).getTime() -
            new Date(a.last_message.created_at).getTime()
          );
        }),
    [threads, search],
  );

  if (isPending) return <ConversationSidebarSkeleton />;
  if (isError)
    return (
      <div className="w-full lg:max-w-72.5">
        <ErrorMessage content="Failed to load conversations." />
      </div>
    );

  return (
    <aside
      aria-label="Conversations"
      className="w-full lg:max-w-72.5 relative"
    >
      <div
        className="hidden lg:block bg-bg-navbar border-r border-bg-bar absolute -top-6 -bottom-6 right-0 -left-50 -z-10"
        aria-hidden="true"
      />

      <div className="flex flex-col gap-4 md:gap-6 w-full h-[78dvh] overflow-y-hidden">
        <h3 className="title">Messages</h3>
        <ConversationSearchBar value={search} onChange={setSearch} />

        <ul className="flex-1 overflow-y-auto space-y-1 min-h-0 pr-4">
          {sortedThreads?.length === 0 ? (
            <li className="text-sm text-text-secondary text-center py-6">
              No conversations found.
            </li>
          ) : (
            sortedThreads?.map((thread) => (
              <ConversationItem
                key={thread.course_id}
                CourseThread={thread}
                isSelected={selectedCourseId === thread.course_id}
                onSelect={() => onSelect(thread.course_id)}
              />
            ))
          )}
        </ul>
      </div>
    </aside>
  );
}
