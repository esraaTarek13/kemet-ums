import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { filterAndSortThreads } from "@/lib/utils/shared/filterAndSortThreads";
import { useStudentMessages } from "./queries/useStudentMessages";

export function useConversationSidebar() {
  const { chatId: selectedCourseId } = useParams<{ chatId?: string }>();
  const { data: threads, isPending, isError } = useStudentMessages();
  const [search, setSearch] = useState("");

  // Filter by course name/code, then sort by most recent message
  const sortedThreads = useMemo(
    () => filterAndSortThreads(threads, search),
    [threads, search],
  );

  return {
    selectedCourseId,
    isPending,
    isError,
    search,
    setSearch,
    sortedThreads,
  };
}
