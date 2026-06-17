"use client";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import ProfileBanner from "@/components/ui/profile/ProfileBanner";
import ProfileCard from "@/components/ui/profile/ProfileCard";
import ProfilePassword from "@/components/ui/profile/ProfilePassword";
import ProfileSkeleton from "@/components/ui/skeletons/ProfileSkeleton";
import { useStudentProfile } from "@/hooks/student/useStudentProfile";
import {
  mapToAcademicItems,
  mapToBannerItems,
  mapToPersonalItems,
} from "@/utils/student/profileMappers";

export default function StudentProfile() {
  const { data, isError, isPending } = useStudentProfile();
  const { profile, student } = data ?? {};

  if (isPending) return <ProfileSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load profile." />;

  const bannerItems = mapToBannerItems(profile, student);
  const academicItems = mapToAcademicItems(profile, student);
  const personalItems = mapToPersonalItems(profile, student);

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