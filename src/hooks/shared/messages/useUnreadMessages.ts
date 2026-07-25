import { useFacultyMessages } from "@/hooks/faculty/messages/queries/useFacultyMessages";
import { useStudentMessages } from "@/hooks/student/messages/queries/useStudentMessages";

export function useUnreadMessages(role: string) {
  const isStudent = role === "student";
  const isFaculty = role === "faculty";

  const { data: studentData } = useStudentMessages();
  const { data: facultyData } = useFacultyMessages();

  const data = isStudent ? studentData : isFaculty ? facultyData : undefined;

  const totalUnread =
    data?.reduce((sum, thread) => sum + thread.unread_count, 0) ?? 0;

  return { totalUnread }; 
}
