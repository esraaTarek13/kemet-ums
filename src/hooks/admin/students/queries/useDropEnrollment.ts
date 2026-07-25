import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { dropStudentEnrollment } from "@/lib/services/admin/studentProfile";
import { adminStudentsKeys } from "./queryKeys";

export function useDropEnrollment(studentId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dropStudentEnrollment,
    onSuccess: () => {
      toast.success("Course dropped successfully");
      queryClient.invalidateQueries({
        queryKey: adminStudentsKeys.profileDetail(studentId),
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
