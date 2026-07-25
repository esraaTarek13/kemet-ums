import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminStudentsKeys } from "./queryKeys";
import { updateStudentProfile } from "@/lib/services/admin/studentMutations";

export function useUpdateStudentProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStudentProfile,
    onSuccess: (_, variables) => {
      toast.success("Student profile updated successfully");
      queryClient.invalidateQueries({
        queryKey: adminStudentsKeys.profileDetail(variables.studentId),
      });
      queryClient.invalidateQueries({ queryKey: adminStudentsKeys.all });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
