import { useQuery } from "@tanstack/react-query";
import { getStudentCourses } from "@/lib/services/student/courses";
import { useAuthStore } from "@/stores/authStore";
import { useState } from "react";
import { FilterStatus, StudentCourse } from "@/types";

export function useStudentCourses() {
  const { user } = useAuthStore();
  const [filter, setFilter] = useState<FilterStatus>("all");

  const query = useQuery<StudentCourse[]>({
    queryKey: ["student-courses", user?.id ?? "", filter],
    // "all" fetches without status filter; otherwise pass the selected status
    queryFn: () =>
      filter === "all"
        ? getStudentCourses(user?.id ?? "")
        : getStudentCourses(user?.id ?? "", filter),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5, // 5 min
  });

  return { ...query, filter, setFilter };
}
