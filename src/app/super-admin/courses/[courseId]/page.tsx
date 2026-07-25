import CourseDetailsSection from "@/components/admin/course-details/CourseDetailsSection";

export default async function CourseDetailsPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  return (
    <div className="Custom-container h-full flex flex-col gap-5 md:gap-6">
      <CourseDetailsSection offeringId={courseId} />
    </div>
  );
}
