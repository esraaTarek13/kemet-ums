import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteFaculty } from "@/lib/services/admin/facultyMutations";
import { adminFacultyKeys } from "./queryKeys";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { ROLE_BASE_ROUTES } from "@/data/shared/roles";

export function useDeleteFaculty() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user } = useAuthStore();
  const base = ROLE_BASE_ROUTES[user?.role ?? ""] ?? "/admin";

  return useMutation({
    mutationFn: deleteFaculty,
    onSuccess: () => {
      toast.success("Faculty member deleted successfully");
      queryClient.invalidateQueries({ queryKey: adminFacultyKeys.all });
      router.push(`${base}/faculty`);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
