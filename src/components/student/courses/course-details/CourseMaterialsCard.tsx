"use client";
import { useStudentCourseDetails } from "@/hooks/student/useStudentCourseDetails";
import CourseCardSkeleton from "@/components/ui/skeletons/CourseCardSkeleton";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import CourseMaterialItem from "@/components/ui/shared/CourseMaterialItem";

export default function CourseMaterialsCard({
  courseId,
}: {
  courseId: string;
}) {
  const { data, isPending, isError } = useStudentCourseDetails(courseId);

  if (isPending) return <CourseCardSkeleton length={1} />;
  if (isError)
    return <ErrorMessage content="Failed to load Course Materials." />;
  const materials = data.materials ?? [];

  return (
    <section
      aria-label="Course materials"
      className="card-top-border space-y-5 md:space-y-6"
    >
      <h3 className="title">Course Materials</h3>

      {materials.length > 0 ? (
        <ul className="space-y-3">
          {materials.map((material) => (
            <CourseMaterialItem key={material.id} material={material} />
          ))}
        </ul>
      ) : (
        <p role="status" className="text-text-subtle text-sm text-center py-10">
          No materials available.
        </p>
      )}
    </section>
  );
}
