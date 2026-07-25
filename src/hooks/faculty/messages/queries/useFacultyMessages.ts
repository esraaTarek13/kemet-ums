import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { getFacultyMessages } from "@/lib/services/faculty/messages";
import { facultyMessagesKeys } from "./queryKeys";

export function useFacultyMessages() {
    const { user } = useAuthStore();

    return useQuery({
        queryKey: facultyMessagesKeys.list(user?.id),
        queryFn: () => getFacultyMessages(user?.id ?? ""),
        enabled: !!user?.id,
        staleTime: 1000 * 60 * 2,
    });
}