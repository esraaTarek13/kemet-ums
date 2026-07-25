"use client";
import { useFacultyProfileDetail } from "@/hooks/admin/faculty/queries/useFacultyProfileDetail";
import FacultyProfileHeader from "./FacultyProfileHeader";
import ProfileSkeleton from "@/components/ui/skeletons/ProfileSkeleton";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import FacultyBreadcrumb from "./FacultyBreadcrumb";
import FacultyProfileStats from "./FacultyProfileStats";
import FacultyPersonalInformation from "./FacultyPersonalInformation";
import FacultyProfessionalSummary from "./FacultyProfessionalSummary";
import AssignedCoursesTable from "./assigned-courses-table/AssignedCoursesTable.lazy";

interface FacultyProfileSectionProps {
  facultyId: string;
}

export default function FacultyProfileSection({
  facultyId,
}: FacultyProfileSectionProps) {
  const { data, isPending, isError } = useFacultyProfileDetail(facultyId);

  if (isPending) return <ProfileSkeleton />;
  if (isError)
    return <ErrorMessage content="Failed to load Faculty Profile." />;

  // Guard against undefined data to avoid crashes and enable type narrowing
  if (!data) return <ErrorMessage content="Faculty Profile not found." />;

  return (
    <>
      <div className="space-y-4">
        <FacultyBreadcrumb facultyCode={data.header.faculty_code} />
        <FacultyProfileHeader
          header={data.header}
          hasActiveCourses={data.courses.length > 0}
        />
      </div>

      <FacultyProfileStats facultyStats={data.stats} />

      <div className="flex flex-col lg:flex-row gap-5 md:gap-6">
        <FacultyPersonalInformation header={data.header} />

        <FacultyProfessionalSummary
          facultyId={data.header.faculty_id}
          specialization={data.header.specialization}
          publications={data.header.publications}
          academicStanding={data.stats.academic_standing}
        />
      </div>

      <AssignedCoursesTable
        courses={data.courses}
        facultyId={data.header.faculty_id}
        facultyName={data.header.full_name}
        department={data.header.department}
      />
    </>
  );
}
