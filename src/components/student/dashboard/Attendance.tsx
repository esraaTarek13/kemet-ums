"use client";
import ProgressBar from "@/components/ui/shared/ProgressBar";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import AttendanceSkeletons from "@/components/ui/skeletons/AttendanceSkeletons";
import { useStudentDashboardStats } from "@/hooks/student/useDashboard";

export default function Attendance() {
 const { data, isPending, isError } = useStudentDashboardStats();
  const attendanceRate = data?.attendance_rate;

  if (isPending) return <AttendanceSkeletons />;
  if (isError)
    return <ErrorMessage content="Failed to load attendance rate." />;

  return (
    <section
      aria-label="Overall attendance"
      className="card space-y-1.5 lg:space-y-2.5"
    >
      <h3 className="title">Overall Attendance</h3>
      {/* student's overall attendance rate across all courses */}
      <ProgressBar
        value={attendanceRate}
        aria-label={`Overall attendance: ${attendanceRate}%`}
        progressClass="bg-accent"
        textClass="text-accent"
      />
    </section>
  );
}
