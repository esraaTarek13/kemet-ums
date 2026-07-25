import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteAssignment } from "@/lib/services/faculty/assignments";

export function useDeleteAssignment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (assignmentId: string) => deleteAssignment(assignmentId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["faculty-course-detail"] });
            toast.success("Assignment deleted");
        },
        onError: (err: Error) =>
            toast.error(err.message ?? "Failed to delete assignment"),
    });
}