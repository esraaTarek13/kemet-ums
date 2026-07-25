import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { gradeSubmission } from "@/lib/services/faculty/submissions";
import { facultyAssignmentsKeys } from "./queryKeys";

export function useGradeSubmission(assignmentId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      submissionId,
      grade,
      feedback,
    }: {
      submissionId: string;
      grade: number;
      feedback?: string;
    }) => gradeSubmission(submissionId, grade, feedback),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: facultyAssignmentsKeys.submissions(assignmentId),
      });
      toast.success("Grade saved successfully");
    },
    onError: (err: Error) =>
      toast.error(err.message ?? "Failed to save grade"),
  });
}