import { CourseThread } from "@/types";

export function filterAndSortThreads(
  threads: CourseThread[] | undefined,
  search: string,
) {
  return threads
    ?.filter(
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
    });
}