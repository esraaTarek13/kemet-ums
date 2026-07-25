import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import ConversationItem from "@/components/ui/messages/Conversation/ConversationItem";
import ConversationSearchBar from "@/components/ui/messages/Conversation/ConversationSearchBar";
import { ConversationSidebarSkeleton } from "@/components/ui/skeletons/ConversationSidebarSkeleton";
import { useConversationSidebar } from "@/hooks/faculty/messages/useConversationSidebar";

export default function ConversationSidebar() {
  const {
    selectedCourseId,
    search,
    setSearch,
    sortedThreads,
    isPending,
    isError,
  } = useConversationSidebar();

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
      className="w-full h-full lg:max-w-72.5 relative pt-4"
    >
      {/* Decorative background, hidden from assistive tech */}
      <div
        className="bg-bg-navbar border-r border-bg-bar absolute top-0 bottom-0 right-0 -left-50 -z-10"
        aria-hidden="true"
      />

      <div className="flex flex-col gap-4 md:gap-6 w-full h-[calc(100%-10px)] overflow-y-hidden">
        <h3 className="title">Messages</h3>
        <ConversationSearchBar value={search} onChange={setSearch} />

        {/* aria-live: announce filtered results to screen readers */}
        <ul
          aria-live="polite"
          className="flex-1 overflow-y-auto space-y-1 min-h-0 pr-4"
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
