import { CourseInfo } from "@/types";

interface ChatHeaderProps {
  courseInfo?: CourseInfo;
}
export default function ChatHeader({ courseInfo }: ChatHeaderProps) {
  return (
    <div className="h-20 flex flex-col justify-center card rounded-none fixed lg:absolute top-15.25 md:top-19.5 lg:-top-6 left-18 md:left-41.5 lg:-left-3.75 -right-3.75  py-0">
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
  );
}
