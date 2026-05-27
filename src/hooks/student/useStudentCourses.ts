import { useQuery } from "@tanstack/react-query";
import { getStudentCourses } from "@/lib/services/student/courses";
import { useAuthStore } from "@/stores/authStore";
import { useState } from "react";
import { FilterStatus, StudentCourse } from "@/types";

const studentCoursesKeys = {
  all: ["student-courses"] as const,
  courses: (id: string, filter: FilterStatus) =>
    [...studentCoursesKeys.all, id, filter] as const,
};

export function useStudentCourses() {
  const { user } = useAuthStore();
  const [filter, setFilter] = useState<FilterStatus>("all");

  const query = useQuery<StudentCourse[]>({
    queryKey: studentCoursesKeys.courses(user?.id ?? "", filter),
    queryFn: () =>
      getStudentCourses(user?.id ?? "", filter === "all" ? undefined : filter),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5,
  });

  return { ...query, filter, setFilter };
}