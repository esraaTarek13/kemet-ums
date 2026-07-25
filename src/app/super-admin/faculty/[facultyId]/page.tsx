import FacultyProfileSection from "@/components/admin/faculty-profile/FacultyProfileSection";

export default async function FacultyDetailsPage({
  params,
}: {
  params: Promise<{ facultyId: string }>;
}) {
  const { facultyId } = await params;
  
  return (
    <div className="Custom-container h-full flex flex-col gap-5 md:gap-6">
      <FacultyProfileSection facultyId={facultyId} />
    </div>
  );
}
