import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { getStudentCourseDetails } from "@/lib/services/student/courses";
import { StudentCourseDetails } from "@/types";
import { studentCoursesKeys } from "./queryKeys";

export function useStudentCourseDetails(courseId: string) {
  const { user } = useAuthStore();

  return useQuery<StudentCourseDetails>({
    queryKey: studentCoursesKeys.details(user?.id, courseId),
    queryFn: () => getStudentCourseDetails(user?.id ?? "", courseId),
    enabled: !!user?.id && !!courseId,
    staleTime: 1000 * 60 * 5, // 5 min
  });
}
