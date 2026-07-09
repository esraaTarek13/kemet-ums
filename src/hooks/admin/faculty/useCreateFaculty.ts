import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createFaculty } from "@/lib/services/admin/facultyMutations";

export function useCreateFaculty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFaculty,
    onSuccess: (faculty) => {
      toast.success(`Faculty member created: ${faculty.faculty_code}`);
      queryClient.invalidateQueries({ queryKey: ["admin-faculty"] });
      queryClient.invalidateQueries({ queryKey: ["admin-faculty-stats"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
