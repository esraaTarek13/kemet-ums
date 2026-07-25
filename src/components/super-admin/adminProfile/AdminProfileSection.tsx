"use client";
import { useAdminProfileDetail } from "@/hooks/super-admin/queries/useAdminProfileDetail";
import AdminBreadcrumb from "./AdminBreadcrumb";
import AdminProfileHeader from "./AdminProfileHeader";
import AdminPersonalInfoCard from "./AdminPersonalInfoCard";
import ProfileSkeleton from "@/components/ui/skeletons/ProfileSkeleton";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";

interface AdminProfileSectionProps {
  adminId: string;
}

export default function AdminProfileSection({
  adminId,
}: AdminProfileSectionProps) {
  const { data, isPending, isError } = useAdminProfileDetail(adminId);

  if (isPending) return <ProfileSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load Admin Profile." />;

  if (!data) return <ErrorMessage content="Admin Profile not found." />;

  return (
    <>
      <div className="space-y-4">
        <AdminBreadcrumb adminCode={data?.admin_code} />
        <AdminProfileHeader admin={data} />
      </div>
      <AdminPersonalInfoCard admin={data} />
    </>
  );
}
