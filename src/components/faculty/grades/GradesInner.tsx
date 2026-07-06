import { useGradesForm } from "@/hooks/faculty/useGradesForm";
import CourseBreadcrumb from "./CourseBreadcrumb";
import GradesHeader from "./GradesHeader";
import GradesTable from "./GradesTable";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import { useFacultyGrades } from "@/hooks/faculty/useFacultyGrades";

export default function GradesInner({ courseId }: { courseId: string }) {
  const { data, isPending, isError } = useFacultyGrades(courseId);
  const { isUpdating, register, errors, handleSubmit, onSubmit } =
    useGradesForm(courseId);

  if (isPending) return <TableSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load grades." />;

  return (
    <>
      <CourseBreadcrumb
        courseId={courseId}
        courseCode={data?.course_code ?? ""}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 md:space-y-6"
      >
        <GradesHeader
          courseName={data?.course_name ?? ""}
          courseCode={data?.course_code ?? ""}
          totalStudents={data?.total_students?.toString() ?? "0"}
          semester={data.semester ?? ""}
          isUpdating={isUpdating}
        />
        <div className="border border-bg-bar overflow-hidden rounded-xl">
          <GradesTable
            students={data?.students ?? []}
            canEnterMidterm={data?.can_enter_midterm ?? false}
            canEnterFinal={data?.can_enter_final ?? false}
            register={register}
            errors={errors}
          />
        </div>
      </form>
    </>
  );
}
