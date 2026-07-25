import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminStudentsKeys } from "./queryKeys";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { ROLE_BASE_ROUTES } from "@/data/shared/roles";
import { deleteStudent } from "@/lib/services/admin/studentMutations";

export function useDeleteStudent() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user } = useAuthStore();
  const base = ROLE_BASE_ROUTES[user?.role ?? ""] ?? "/admin";

  return useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      toast.success("Student deleted successfully");
      queryClient.invalidateQueries({ queryKey: adminStudentsKeys.all });
      router.push(`${base}/students`);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
