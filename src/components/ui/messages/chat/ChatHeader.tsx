import { CourseInfo } from "@/types";
import { FaUsers } from "react-icons/fa";

interface ChatHeaderProps {
  courseInfo?: CourseInfo;
}
export default function ChatHeader({ courseInfo }: ChatHeaderProps) {
  return (
    <div className="h-20 flex flex-col justify-center card rounded-none z-50">
      <h4 className="title">{courseInfo?.course_name ?? "Subject Name"}</h4>
      <div className="flex gap-2 items-center text-text-secondary text-sm">
        {(courseInfo?.member_count ?? 0) > 0 && (
          <>
            <div className="flex items-center gap-1 shrink-0">
              <FaUsers className="text-lg" />
              <p>
                {courseInfo?.member_count} member
                {courseInfo?.member_count !== 1 ? "s" : ""}
              </p>
            </div>
          </>
        )}
        <div className="w-1 h-1 rounded-full bg-text-secondary" />
        <p> {courseInfo?.faculty_name ?? "Instructor Name"} </p>
      </div>
    </div>
  );
}
