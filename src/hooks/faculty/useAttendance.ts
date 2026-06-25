import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getFacultyAttendance,
  markAttendance,
} from "@/lib/services/faculty/attendance";

export function useFacultyAttendance(offeringId: string) {
  return useQuery({
    queryKey: ["faculty-attendance", offeringId],
    queryFn: () => getFacultyAttendance(offeringId),
    enabled: !!offeringId,
    staleTime: 1000 * 60 * 5,
  });
}

export function useMarkAttendance(offeringId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      enrollmentId,
      date,
      status,
    }: {
      enrollmentId: string;
      date: string;
      status: "present" | "absent" | "late";
    }) => markAttendance(enrollmentId, date, status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["faculty-attendance", offeringId],
      });
    },
  });
}
