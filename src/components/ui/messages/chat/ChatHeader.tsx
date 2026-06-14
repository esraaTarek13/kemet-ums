import { CourseInfo } from "@/types";

interface ChatHeaderProps {
  courseInfo?: CourseInfo;
}
export default function ChatHeader({ courseInfo }: ChatHeaderProps) {
  return (
    <div className="w-full relative pb-4 pl-8">
      <div className="card rounded-none absolute left-0 -right-3.75 -top-6 bottom-0 -z-10" />
      <div>
        <h4 className="title">{courseInfo?.course_name ?? "Subject Name"}</h4>
        <div className="flex gap-2 items-center text-text-secondary text-xs md:text-sm">
          <p> {courseInfo?.faculty_name ?? "Instructor Name"} </p>
          {(courseInfo?.student_count ?? 0) > 0 && (
            <>
              <div className="w-1 h-1 rounded-full bg-text-secondary" />
              <p>{courseInfo?.student_count} students</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
