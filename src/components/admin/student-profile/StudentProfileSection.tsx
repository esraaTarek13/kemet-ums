"use client";
import StudentProfileStats from "./StudentProfileStats";
import StudentProfileHeader from "./StudentProfileHeader";
import StudentBreadcrumb from "./StudentBreadcrumb";
import { useStudentProfileDetail } from "@/hooks/admin/students/queries/useStudentProfileDetail";
import ProfileSkeleton from "@/components/ui/skeletons/ProfileSkeleton";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import StudentPersonalInformation from "./StudentPersonalInformation";
import StudentAcademicSummary from "./StudentAcademicSummary";
import EnrolledCoursesTable from "./enrolled-courses/EnrolledCoursesTable.lazy";
import PaymentStatusCard from "./payment-status/PaymentStatusCard";

interface StudentProfileSectionProps {
  studentId: string;
}

export default function StudentProfileSection({
  studentId,
}: StudentProfileSectionProps) {
  const { data, isPending, isError } = useStudentProfileDetail(studentId);

  if (isPending) return <ProfileSkeleton />;
  if (isError)
    return <ErrorMessage content="Failed to load Student Profile." />;

  if (!data) return <ErrorMessage content="Student Profile not found." />;

  return (
    <>
      <div className="space-y-4">
        <StudentBreadcrumb studentCode={data.header.student_code} />
        <StudentProfileHeader
          hasActiveCourses={data.courses.some(
            (course) => course.status === "active",
          )}
          header={data.header}
        />
      </div>

      <StudentProfileStats studentStats={data.stats} />

      <div className="flex flex-col lg:flex-row gap-5 md:gap-6">
        <StudentPersonalInformation informations={data.header} />
        <StudentAcademicSummary
          standing={data.stats.standing}
          creditsLeft={data.stats.credits_left}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] gap-5 md:gap-6">
        <EnrolledCoursesTable
          courses={data.courses}
          studentId={data.header.student_id}
          studentName={data.header.full_name}
        />
        <PaymentStatusCard studentId={data.header.student_id} />
      </div>
    </>
  );
}
