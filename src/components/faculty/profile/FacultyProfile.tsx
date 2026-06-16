"use client";
import ErrorMessage from "@/components/ui/ErrorMessage";
import ProfileBanner from "@/components/ui/profile/ProfileBanner";
import ProfileCard from "@/components/ui/profile/ProfileCard";
import ProfilePassword from "@/components/ui/profile/ProfilePassword";
import ProfileSkeleton from "@/components/ui/skeletons/ProfileSkeleton";
import { useFacultyProfile } from "@/hooks/faculty/useFacultyProfile";
import { format } from "date-fns";

export default function FacultyProfile() {
  const { data, isPending, isError } = useFacultyProfile();
  const profile = data?.profile;
  const faculty = data?.faculty;
  console.log(data);

  if (isPending) return <ProfileSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load profile." />;

  const bannerItems = {
    name: profile?.full_name ?? "—",
    Id: faculty?.faculty_code ?? "—",
    department: faculty?.department ?? "—",
    rank: faculty?.rank ?? "—",
    avatarUrl: profile?.avatar_url ?? null,
  };

const academicItems = [
  { label: "Faculty ID", value: faculty?.faculty_code ?? "—" },
  { label: "Department", value: faculty?.department ?? "—" },
  { label: "Rank", value: faculty?.rank ?? "—" },
  {
    label: "Employment Type",
    value: faculty?.employment_type
      ? faculty.employment_type.replace("_", " ")
      : "—",
  },
  {
    label: "Join Date",
    value: faculty?.join_date
      ? format(new Date(faculty.join_date), "MMM d, yyyy")
      : "—",
  },
  {
    label: "Max Courses",
    value: faculty?.max_courses != null ? String(faculty.max_courses) : "—",
  },
];

const personalItems = [
  { label: "Full Name", value: profile?.full_name ?? "—" },
  { label: "University Email", value: profile?.email ?? "—" },
  { label: "Office Location", value: faculty?.office_location ?? "—" },
  { label: "Phone Number", value: profile?.phone ?? "—" },
  { label: "Nationality", value: profile?.nationality ?? "—" },
  { label: "Residential Address", value: profile?.address ?? "—" },
];

  return (
    <section
      className="space-y-5 md:space-y-6 lg:space-y-8"
      aria-label="Faculty profile"
    >
      <ProfileBanner {...bannerItems} />
      <div className="w-full flex flex-col lg:flex-row gap-5 md:gap-6 lg:gap-8">
            <ProfileCard header="academic information" items={academicItems} />
            <ProfileCard  header="contact & personal information" items={personalItems} />
          </div>
          <ProfilePassword lastPasswordChangedAt={profile?.password_changed_at} />
    </section>
  );
}
