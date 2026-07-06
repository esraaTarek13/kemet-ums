import GradesSection from "@/components/faculty/grades/GradesSection";

export default async function GradesPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  return (
    <div className="Custom-container">
      <GradesSection courseId={courseId} />
    </div>
  );
}
