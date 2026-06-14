import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import {
  getFacultyMessages,
  getFacultyCourseMessages,
} from "@/lib/services/faculty/messages";

export function useFacultyMessages() {
  const { user } = useAuthStore();
  return useQuery({
    queryKey: ["faculty-messages", user?.id],
    queryFn: () => getFacultyMessages(user?.id ?? ""),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 2,
  });
}

export function useFacultyCourseMessages(courseId: string) {
  const { user } = useAuthStore();
  return useQuery({
    queryKey: ["faculty-course-messages", courseId],
    queryFn: () => getFacultyCourseMessages(user?.id ?? "", courseId),
    enabled: !!user?.id && !!courseId,
    staleTime: 1000 * 30,
    refetchInterval: 1000 * 10,
  });
}