import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { getStudentMessages } from "@/lib/services/student/messages";
import { studentMessagesKeys } from "./queryKeys";

export function useStudentMessages() {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: studentMessagesKeys.list(user?.id),
    queryFn: () => getStudentMessages(user?.id ?? ""),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 2,
  });
}
