import { useFacultyMessages } from "../faculty/useMessages";
import { useStudentMessages } from "../student/useMessages";

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
