import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateFacultyProfile } from "@/lib/services/admin/facultyMutations";
import { adminFacultyKeys } from "./queryKeys";

export function useUpdateFacultyProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFacultyProfile,
    onSuccess: (_, variables) => {
      toast.success("Faculty profile updated successfully");
      queryClient.invalidateQueries({
        queryKey: adminFacultyKeys.profileDetail(variables.facultyId),
      });
      queryClient.invalidateQueries({ queryKey: adminFacultyKeys.all });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
