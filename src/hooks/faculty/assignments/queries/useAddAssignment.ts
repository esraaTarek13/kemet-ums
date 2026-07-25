import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addAssignment } from "@/lib/services/faculty/assignments";
import { AssignmentFormData } from "@/types";

export function useAddAssignment(offeringId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: AssignmentFormData) => addAssignment(offeringId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["faculty-course-detail"] });
            toast.success("Assignment added successfully");
        },
        onError: (err: Error) =>
            toast.error(err.message ?? "Failed to add assignment"),
    });
}