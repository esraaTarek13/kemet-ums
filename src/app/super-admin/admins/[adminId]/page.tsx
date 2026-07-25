import AdminProfileSection from "@/components/super-admin/adminProfile/AdminProfileSection";

export default async function AdminDetailsPage({
  params,
}: {
  params: Promise<{ adminId: string }>;
}) {
  const { adminId } = await params;

  return (
    <div className="Custom-container h-full flex flex-col gap-5 md:gap-6">
      <AdminProfileSection adminId={adminId} />
    </div>
  );
}
