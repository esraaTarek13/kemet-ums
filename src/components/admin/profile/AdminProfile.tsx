"use client";

import ProfileBanner from "@/components/ui/profile/ProfileBanner";
import ProfileCard from "@/components/ui/profile/ProfileCard";
import ProfilePassword from "@/components/ui/profile/ProfilePassword";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import ProfileSkeleton from "@/components/ui/skeletons/ProfileSkeleton";
import { useAdminProfile } from "@/hooks/admin/useAdminProfile";
import {
  mapToAcademicItems,
  mapToBannerItems,
  mapToPersonalItems,
} from "@/lib/mappers/admin/profileMappers";

export default function AdminProfile() {
  const { data: profile, isPending, isError } = useAdminProfile();

  if (isPending) return <ProfileSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load profile." />;

  const bannerItems = mapToBannerItems(profile);
  const academicItems = mapToAcademicItems(profile);
  const personalItems = mapToPersonalItems(profile);

  return (
    <section
      className="space-y-5 md:space-y-6 lg:space-y-8"
      aria-label="Admin profile"
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
