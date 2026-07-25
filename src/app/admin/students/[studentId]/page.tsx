import StudentProfileSection from "@/components/admin/student-profile/StudentProfileSection";

export default async function StudentDetailsPage({
  params,
}: {
  params: Promise<{ studentId: string }>;
}) {
  const { studentId } = await params;

  return (
    <div className="Custom-container h-full flex flex-col gap-5 md:gap-6">
      <StudentProfileSection studentId={studentId} />
    </div>
  );
}
