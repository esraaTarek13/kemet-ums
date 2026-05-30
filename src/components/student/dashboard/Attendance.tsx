"use client";
import ProgressBar from "@/components/ui/ProgressBar";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useStudentDashboard } from "@/hooks/student/useDashboard";
import AttendanceSkeletons from "@/components/ui/skeletons/AttendanceSkeletons";

export default function Attendance() {
  const { data, isPending, isError } = useStudentDashboard();
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
