import StudentSection from "@/components/faculty/student-details/StudentSection";

export default async function StudentDetailsPage({
  params,
}: {
  params: Promise<{ studentId: string }>;
}) {
  const { studentId } = await params;
  return (
    <div className="Custom-container flex flex-col gap-5 md:gap-6">
      <StudentSection studentId={studentId} />
    </div>
  );
}
