import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createFaculty } from "@/lib/services/admin/facultyMutations";
import { adminFacultyKeys } from "./queryKeys";

export function useCreateFaculty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFaculty,
    onSuccess: (faculty) => {
      toast.success(`Faculty member created: ${faculty.faculty_code}`);
      queryClient.invalidateQueries({ queryKey: adminFacultyKeys.all });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
