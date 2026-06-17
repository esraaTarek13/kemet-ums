"use client";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import ProfileBanner from "@/components/ui/profile/ProfileBanner";
import ProfileCard from "@/components/ui/profile/ProfileCard";
import ProfilePassword from "@/components/ui/profile/ProfilePassword";
import ProfileSkeleton from "@/components/ui/skeletons/ProfileSkeleton";
import { useFacultyProfile } from "@/hooks/faculty/useFacultyProfile";
import {
  mapToAcademicItems,
  mapToBannerItems,
  mapToPersonalItems,
} from "@/utils/faculty/profileMappers";

export default function FacultyProfile() {
  const { data, isPending, isError } = useFacultyProfile();
  const profile = data?.profile;
  const faculty = data?.faculty;

  if (isPending) return <ProfileSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load profile." />;

  const bannerItems = mapToBannerItems(profile, faculty);
  const academicItems = mapToAcademicItems(profile, faculty);
  const personalItems = mapToPersonalItems(profile, faculty);

  return (
    <section
      className="space-y-5 md:space-y-6 lg:space-y-8"
      aria-label="Faculty profile"
    >
      <ProfileBanner {...bannerItems} />
      <div className="w-full flex flex-col lg:flex-row gap-5 md:gap-6 lg:gap-8">
        <ProfileCard header="academic information" items={academicItems} />
        <ProfileCard
          header="contact & personal information"
          items={personalItems}
        />
      </div>
      <ProfilePassword lastPasswordChangedAt={profile?.password_changed_at} />
    </section>
  );
}
