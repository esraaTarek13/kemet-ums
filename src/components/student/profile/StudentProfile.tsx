"use client";
import ErrorMessage from "@/components/ui/ErrorMessage";
import ProfileBanner from "@/components/ui/profile/ProfileBanner";
import ProfileCard from "@/components/ui/profile/ProfileCard";
import ProfilePassword from "@/components/ui/profile/ProfilePassword";
import ProfileSkeleton from "@/components/ui/skeletons/ProfileSkeleton";
import { useStudentProfile } from "@/hooks/student/useStudentProfile";
import { format } from "date-fns";

export default function StudentProfile() {
  const { data, isError, isPending } = useStudentProfile();
  const { profile, student } = data ?? {};

  if (isPending) return <ProfileSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load profile." />;

  const bannerItems = {
    name: profile?.full_name ?? "—",
    studentId: student?.student_code ?? "—",
    department: student?.department ?? "—",
    year: student?.academic_year ? `Year ${student.academic_year}` : "—",
    avatarUrl: profile?.avatar_url ?? null,
  };

  const academicItems = [
    { label: "University Email", value: profile?.email ?? "—" },
    { label: "Student ID", value: student?.student_code ?? "—" },
    { label: "Department", value: student?.department ?? "—" },
    {
      label: "Academic Year",
      value: student?.academic_year ? `Year ${student.academic_year}` : "—",
    },
    {
      label: "Enrollment Date",
      value: student?.enrollment_date
        ? format(new Date(student.enrollment_date), "MMM d, yyyy")
        : "—",
    },
  ];

  const personalItems = [
    { label: "Full Name", value: profile?.full_name ?? "—" },
    {
      label: "Date of Birth",
      value: student?.date_of_birth
        ? format(new Date(student.date_of_birth), "dd/MM/yyyy")
        : "—",
    },
    { label: "Nationality", value: profile?.nationality ?? "—" },
    { label: "Phone Number", value: profile?.phone ?? "—" },
    { label: "Residential Address", value: profile?.address ?? "—" },
  ];

  return (
    <section
      className="space-y-5 md:space-y-6 lg:space-y-8"
      aria-label="Student profile"
    >
      <ProfileBanner {...bannerItems} />
      <div className="w-full flex flex-col lg:flex-row gap-5 md:gap-6 lg:gap-8">
        <ProfileCard header="academic information" items={academicItems} />
        <ProfileCard header="personal information" items={personalItems} />
      </div>
      <ProfilePassword lastPasswordChangedAt={profile?.password_changed_at} />
    </section>
  );
}
