import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/authStore";
import { updateCourseCompletion } from "@/lib/services/faculty/courses";
import { facultyCoursesKeys } from "./queryKeys";

export function useUpdateCourseCompletion() {
    const { user } = useAuthStore();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            offeringId,
            completion,
        }: {
            offeringId: string;
            completion: number;
        }) => updateCourseCompletion(offeringId, completion),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: facultyCoursesKeys.list(user?.id),
            });
            queryClient.invalidateQueries({
                queryKey: facultyCoursesKeys.detail(user?.id),
            });
            toast.success("Course completion updated");
        },
        onError: (err: Error) =>
            toast.error(err.message ?? "Failed to update completion"),
    });
}