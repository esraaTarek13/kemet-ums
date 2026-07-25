import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { filterAndSortThreads } from "@/lib/utils/shared/filterAndSortThreads";
import { useFacultyMessages } from "@/hooks/faculty/messages/queries/useFacultyMessages";

export function useConversationSidebar() {
    const { chatId: selectedCourseId } = useParams<{ chatId?: string }>();
    const { data: threads, isPending, isError } = useFacultyMessages();

    const [search, setSearch] = useState("");

    // Filter by course name/code, then sort by most recent message
    const sortedThreads = useMemo(
        () => filterAndSortThreads(threads, search),
        [threads, search],
    );

    return {
        selectedCourseId,
        search,
        setSearch,
        sortedThreads,
        isPending,
        isError,
    };
}