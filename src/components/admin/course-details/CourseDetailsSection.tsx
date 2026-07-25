"use client";
import { useCourseOfferingDetail } from "@/hooks/admin/courses/queries/useCourseOfferingDetail";
import CourseBreadcrumb from "./CourseBreadcrumb";
import CourseHeader from "./CourseHeader";
import ProfileSkeleton from "@/components/ui/skeletons/ProfileSkeleton";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import CourseInformation from "./CourseInformation";
import EnrollmentTrend from "./enrollment-trend/EnrollmentTrend.lazy";
import StudentsTable from "./students-table/StudentsTable.lazy";

interface CourseDetailsSectionProps {
  offeringId: string;
}
export default function CourseDetailsSection({
  offeringId,
}: CourseDetailsSectionProps) {
  const { data, isPending, isError } = useCourseOfferingDetail(offeringId);
  const courseDetail = data?.course;
  const courseStudents = data?.students

  if (isPending) return <ProfileSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load Course Details." />;

  return (
    <>
      <div className="space-y-4">
        <CourseBreadcrumb coursesCode={courseDetail?.course_code} />
        <CourseHeader course={courseDetail} />
      </div>

      <CourseInformation course={courseDetail} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <EnrollmentTrend course={courseDetail} />
        <StudentsTable students={courseStudents} />
      </div>
    </>
  );
}
