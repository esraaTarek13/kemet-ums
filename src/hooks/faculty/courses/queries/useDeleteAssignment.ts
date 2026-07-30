import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteAssignment } from "@/lib/services/faculty/assignments";
import { facultyCoursesKeys } from "./queryKeys";

export function useDeleteAssignment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (assignmentId: string) => deleteAssignment(assignmentId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: facultyCoursesKeys.detailAll });
            toast.success("Assignment deleted");
        },
        onError: (err: Error) =>
            toast.error(err.message ?? "Failed to delete assignment"),
    });
}