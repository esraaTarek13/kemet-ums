import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { getStudentCourses } from "@/lib/services/student/courses";
import { FilterStatus, StudentCourse } from "@/types";
import { studentCoursesKeys } from "./queryKeys";

export function useStudentCourses() {
  const { user } = useAuthStore();
  const [filter, setFilter] = useState<FilterStatus>("all");

  const query = useQuery<StudentCourse[]>({
    queryKey: studentCoursesKeys.list(user?.id, filter),
    queryFn: () =>
      filter === "all"
        ? getStudentCourses(user?.id ?? "")
        : getStudentCourses(user?.id ?? "", filter),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5, // 5 min
  });

  return { ...query, filter, setFilter };
}
