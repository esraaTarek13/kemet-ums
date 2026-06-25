import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { supabase } from "@/lib/supabase/client";
import {
  getFacultyMessages,
  getFacultyCourseMessages,
} from "@/lib/services/faculty/messages";
import { markCourseMessagesRead } from "@/lib/services/shared/messages";

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
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["faculty-course-messages", courseId],
    queryFn: () => getFacultyCourseMessages(user?.id ?? "", courseId),
    enabled: !!user?.id && !!courseId,
    staleTime: 1000 * 30,
  });

  useEffect(() => {
    if (!courseId || !user?.id) return;

    markCourseMessagesRead(courseId)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["faculty-messages", user?.id] });
      })
      .catch(() => {});
  }, [courseId, user?.id, queryClient]);

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
          queryClient.invalidateQueries({ queryKey: ["faculty-course-messages", courseId] });
          queryClient.invalidateQueries({ queryKey: ["faculty-messages", user?.id] });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [courseId, user?.id, queryClient]);

  return query;
}