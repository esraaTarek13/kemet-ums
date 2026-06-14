"use client";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import ConversationSearchBar from "@/components/ui/messages/Conversation/ConversationSearchBar";
import { useStudentMessages } from "@/hooks/student/useMessages";
import ConversationItem from "@/components/ui/messages/Conversation/ConversationItem";
import { ConversationSidebarSkeleton } from "@/components/ui/skeletons/ConversationSidebarSkeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function ConversationSidebar() {
  const { chatId: selectedCourseId } = useParams<{ chatId?: string }>();
  const { data: threads, isPending, isError } = useStudentMessages();
  const [search, setSearch] = useState("");

  // Filter by course name/code, then sort by most recent message
  const sortedThreads = useMemo(
    () =>
      threads
        ?.filter(
          (t) =>
            t.course_name.toLowerCase().includes(search.toLowerCase()) ||
            t.course_code.toLowerCase().includes(search.toLowerCase()),
        )
        .sort((a, b) => {
          // Threads without messages go last
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
    <aside aria-label="Conversations" className="w-full lg:max-w-72.5 relative">
      {/* Decorative background, hidden from assistive tech */}
      <div
        className="hidden lg:block bg-bg-navbar border-r border-bg-bar absolute -top-6 -bottom-10.5 right-0 -left-50 -z-10"
        aria-hidden="true"
      />

      <div className="flex flex-col gap-4 md:gap-6 w-full lg:h-[78dvh] lg:overflow-y-hidden">
        <h3 className="title">Messages</h3>
        <ConversationSearchBar value={search} onChange={setSearch} />

        {/* aria-live: announce filtered results to screen readers */}
        <ul
          aria-live="polite"
          className="flex-1 lg:overflow-y-auto space-y-1 min-h-0 pr-4"
        >
          {sortedThreads?.length === 0 ? (
            <li className="text-sm text-text-secondary text-center py-6">
              No conversations found.
            </li>
          ) : (
            sortedThreads?.map((thread) => (
              <ConversationItem
                key={thread.course_id}
                courseThread={thread}
                isSelected={selectedCourseId === thread.course_id}
              />
            ))
          )}
        </ul>
      </div>
    </aside>
  );
}
