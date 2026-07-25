import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateAssignment } from "@/lib/services/faculty/assignments";
import { UpdateAssignmentData } from "@/types";

export function useUpdateAssignment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateAssignmentData) => updateAssignment(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["faculty-course-detail"] });
            toast.success("Assignment updated successfully");
        },
        onError: (err: Error) =>
            toast.error(err.message ?? "Failed to update assignment"),
    });
}