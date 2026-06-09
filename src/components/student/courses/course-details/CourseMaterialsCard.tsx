"use client";
import { useStudentCourseDetails } from "@/hooks/student/useStudentCourseDetails";
import CourseCardSkeleton from "@/components/ui/skeletons/CourseCardSkeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import CourseMaterialsList from "../../shared/CourseMaterialsList";

export default function CourseMaterialsCard({
  courseId,
}: {
  courseId: string;
}) {
  const { data, isPending, isError } = useStudentCourseDetails(courseId);

  if (isPending) return <CourseCardSkeleton length={1} />;
  if (isError)
    return <ErrorMessage content="Failed to load Course Materials." />;

  return (
    <section
      aria-label="Course materials"
      className="card-top-border space-y-5 md:space-y-6"
    >
      <h3 className="title">Course Materials</h3>
      <CourseMaterialsList materials={data?.materials ?? []} />
    </section>
  );
}
