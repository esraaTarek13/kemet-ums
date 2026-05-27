"use client";
import ProgressBar from "@/components/ui/ProgressBar";
import AttendanceSkeletons from "../skeletons/AttendanceSkeletons";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useStudentDashboard } from "@/hooks/student/useDashboard";

export default function Attendance() {
  const { data, isPending, isError } = useStudentDashboard();
  const attendanceRate = data?.attendance_rate;

  if (isPending) return <AttendanceSkeletons />;

  if (isError)
    return (
      <ErrorMessage content="Failed to load attendance rate." />
    );

  return (
    <section className="card space-y-1.5 lg:space-y-2.5">
      <h3 className="title">Overall Attendance</h3>
      <ProgressBar
        value={attendanceRate}
        progressClass="bg-accent"
        textClass="text-accent"
      />
    </section>
  );
}
