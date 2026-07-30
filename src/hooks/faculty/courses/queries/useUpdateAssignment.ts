import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateAssignment } from "@/lib/services/faculty/assignments";
import { UpdateAssignmentData } from "@/types";
import { facultyCoursesKeys } from "./queryKeys";

export function useUpdateAssignment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateAssignmentData) => updateAssignment(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: facultyCoursesKeys.detailAll });
            toast.success("Assignment updated successfully");
        },
        onError: (err: Error) =>
            toast.error(err.message ?? "Failed to update assignment"),
    });
}