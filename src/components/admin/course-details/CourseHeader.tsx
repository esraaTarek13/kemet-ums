import StatusBadge, { BadgeStatus } from "@/components/ui/shared/StatusBadge";
import { CourseOfferingDetail } from "@/types";
import UpdateCourseModal from "./update-course/UpdateCourseModal";
import DeleteCourse from "./DeleteCourse";

interface CourseHeaderProps {
  course: CourseOfferingDetail | undefined;
}
export default function CourseHeader({ course }: CourseHeaderProps) {
  return (
    <section
      aria-label={
        course ? `${course.course_name} course header` : "Course header"
      }
      className="card flex flex-col lg:flex-row justify-between gap-4 lg:items-center"
    >
      <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-5 lg:gap-6">
        <div
          aria-hidden="true"
          className="bg-bg-subtle border border-primary/10 rounded-lg py-4 md:py-6 px-2 w-fit h-fit"
        >
          <p className="font-bold text-accent text-base md:text-lg lg:text-xl">
            {course?.course_code}
          </p>
        </div>

        <div className="space-y-2 sm:space-y-1">
          <div className="flex items-center justify-center sm:justify-start gap-1.5 lg:gap-3 flex-wrap">
            <h3 className="header-title">{course?.course_name}</h3>
            {/* course type badge */}
            {course?.status && (
              <StatusBadge status={course.status as BadgeStatus} />
            )}
          </div>

          <div
            aria-label={`Room ${course?.room}`}
            className="flex items-center justify-center sm:justify-start gap-1 md:gap-3 flex-wrap"
          >
            <span
              aria-hidden="true"
              className="header-subtitle text-text-secondary/80"
            >
              {course?.department}
            </span>

            <div
              aria-hidden="true"
              className="h-1.5 w-1.5 bg-text-secondary/50 rounded-full"
            />

            <span
              aria-hidden="true"
              className="header-subtitle text-text-secondary/80"
            >
              {course?.credits} Credits
            </span>

            <div
              aria-hidden="true"
              className="h-1.5 w-1.5 bg-text-secondary/50 rounded-full"
            />
            <span
              aria-hidden="true"
              className="header-subtitle text-text-secondary/80"
            >
              {course?.room}
            </span>
          </div>
        </div>
      </div>

      {course && (
        <div className="h-fit flex flex-row gap-2 w-full lg:w-fit ">
          <UpdateCourseModal offering={course} />
          <DeleteCourse offeringId={course?.offering_id} />
        </div>
      )}
    </section>
  );
}
