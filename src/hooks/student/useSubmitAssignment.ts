import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/authStore";
import { submitAssignment } from "@/lib/services/student/assignments";

export function useSubmitAssignment() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ assignmentId, file }: { assignmentId: string; file: File }) =>
      submitAssignment(assignmentId, user?.id ?? "", file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-assignments"] });
      toast.success("Assignment submitted successfully!");
    },
    onError: (err: Error) => {
      toast.error(err?.message ?? "Failed to submit assignment");
    },
  });
}