import { getStudentCourseDetails } from "@/lib/services/student/courses";
import { useAuthStore } from "@/stores/authStore";
import { StudentCourseDetails } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useStudentCourseDetails(courseId: string) {
  const { user } = useAuthStore();

  return useQuery<StudentCourseDetails>({
    queryKey: ["student-course-details", user?.id ?? "", courseId],
    queryFn: () => getStudentCourseDetails(user?.id ?? "", courseId),
    enabled: !!user?.id && !!courseId,
    staleTime: 1000 * 60 * 5,
  });
}