import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { supabase } from "@/lib/supabase/client";
import {
  getStudentMessages,
  getStudentCourseMessages,
} from "@/lib/services/student/messages";

// Get all messages for the logged-in student (sidebar)
export function useStudentMessages() {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["student-messages", user?.id],
    queryFn: () => getStudentMessages(user?.id ?? ""),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 2,
  });
}

// Get messages for a specific course + realtime updates
export function useStudentCourseMessages(courseId: string) {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["student-course-messages", courseId],
    queryFn: () => getStudentCourseMessages(user?.id ?? "", courseId),
    enabled: !!user?.id && !!courseId,
    staleTime: 1000 * 30,
  });

  // Listen for new messages and refresh chat + sidebar
  useEffect(() => {
    if (!courseId) return;

    const channel = supabase
      .channel(`messages:${courseId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `course_id=eq.${courseId}`,
        },
        () => {
          queryClient.invalidateQueries({
            queryKey: ["student-course-messages", courseId],
          });
          queryClient.invalidateQueries({
            queryKey: ["student-messages", user?.id],
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [courseId, user?.id, queryClient]);

  return query;
}
