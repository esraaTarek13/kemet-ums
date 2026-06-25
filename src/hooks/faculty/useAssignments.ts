import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addAssignment, deleteAssignment } from "@/lib/services/faculty/assignments";

export function useAddAssignment(offeringId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      title,
      description,
      dueDate,
      maxGrade,
    }: {
      title: string;
      description: string;
      dueDate: string;
      maxGrade: number;
    }) => addAssignment(offeringId, title, description, dueDate, maxGrade),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faculty-course-detail"] });
      toast.success("Assignment added successfully");
    },
    onError: (err: Error) => toast.error(err.message ?? "Failed to add assignment"),
  });
}

export function useDeleteAssignment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (assignmentId: string) => deleteAssignment(assignmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faculty-course-detail"] });
      toast.success("Assignment deleted");
    },
    onError: (err: Error) => toast.error(err.message ?? "Failed to delete assignment"),
  });
}