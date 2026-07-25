import { useQuery } from "@tanstack/react-query";
import { getStudentTranscript } from "@/lib/services/admin/studentProfile";
import { adminStudentsKeys } from "./queryKeys";

export function useStudentTranscript(studentId: string) {
  return useQuery({
    queryKey: adminStudentsKeys.transcript(studentId),
    queryFn: () => getStudentTranscript(studentId),
    enabled: false, // fetched on-demand when "View Transcript" is clicked, not on page load
  });
}
