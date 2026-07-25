import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { supabase } from "@/lib/supabase/client";
import { getFacultyCourseMessages } from "@/lib/services/faculty/messages";
import { markCourseMessagesRead } from "@/lib/services/shared/messages";
import { facultyMessagesKeys } from "./queryKeys";

export function useFacultyCourseMessages(courseId: string) {
    const { user } = useAuthStore();
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: facultyMessagesKeys.course(courseId),
        queryFn: () => getFacultyCourseMessages(user?.id ?? "", courseId),
        enabled: !!user?.id && !!courseId,
        staleTime: 1000 * 30,
    });

    useEffect(() => {
        if (!courseId || !user?.id) return;

        markCourseMessagesRead(courseId)
            .then(() => {
                queryClient.invalidateQueries({
                    queryKey: facultyMessagesKeys.list(user?.id),
                });
            })
            .catch(() => { });
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
                        queryKey: facultyMessagesKeys.course(courseId),
                    });
                    queryClient.invalidateQueries({
                        queryKey: facultyMessagesKeys.list(user?.id),
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