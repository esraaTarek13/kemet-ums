import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { supabase } from "@/lib/supabase/client";
import { getStudentCourseMessages } from "@/lib/services/student/messages";
import { markCourseMessagesRead } from "@/lib/services/shared/messages";
import { studentMessagesKeys } from "./queryKeys";

export function useStudentCourseMessages(courseId: string) {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: studentMessagesKeys.course(courseId),
    queryFn: () => getStudentCourseMessages(user?.id ?? "", courseId),
    enabled: !!user?.id && !!courseId,
    staleTime: 1000 * 30,
  });

  useEffect(() => {
    if (!courseId || !user?.id) return;

    markCourseMessagesRead(courseId)
      .then(() => {
        queryClient.invalidateQueries({
          queryKey: studentMessagesKeys.list(user?.id),
        });
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
          queryClient.invalidateQueries({
            queryKey: studentMessagesKeys.course(courseId),
          });
          queryClient.invalidateQueries({
            queryKey: studentMessagesKeys.list(user?.id),
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
