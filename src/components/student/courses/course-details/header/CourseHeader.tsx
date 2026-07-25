"use client";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import HeaderSkeleton from "@/components/ui/skeletons/HeaderSkeleton";
import { useStudentCourseDetails } from "@/hooks/student/courses/useStudentCourseDetails";
import CourseBreadcrumb from "./CourseBreadcrumb";
import CourseInfoCard from "./CourseInfoCard";

export default function CourseHeader({ courseId }: { courseId: string }) {
  const { data, isError, isPending } = useStudentCourseDetails(courseId);

  if (isPending) return <HeaderSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load course." />;

  const course = data?.course ?? {};

  return (
    <section
      aria-label={
        course ? `${course.course_name} course header` : "Course header"
      }
      className="space-y-5 md:space-y-6"
    >
      <CourseBreadcrumb
        courseCode={course?.course_code}
        courseName={course?.course_name}
      />
      <CourseInfoCard
        courseCode={course?.course_code}
        courseName={course?.course_name}
        semester={course?.semester}
        room={course?.room}
        schedule={course?.schedule}
      />
    </section>
  );
}
