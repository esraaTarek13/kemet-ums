import { mapToAdminPersonalInfo } from "@/lib/mappers/super-admin/mapToAdminPersonalInfo";
import { AdminProfileDetail } from "@/types";

interface AdminPersonalInfoCardProps {
  admin: AdminProfileDetail | undefined;
}

export default function AdminPersonalInfoCard({
  admin,
}: AdminPersonalInfoCardProps) {
  const personalInfoItems = mapToAdminPersonalInfo(admin);

  return (
    <section className="card">
      <h4 className="title border-b border-border-card pb-4">
        Personal Information
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-between gap-6 mt-4">
        {personalInfoItems.map((info) => (
          <div key={info.id} className="space-y-1">
            <h5 className="text-text-secondary text-[10px] md:text-xs uppercase">
              {info.label}
            </h5>
            <p className="text-text-primary text-xs md:text-sm font-semibold">
              {info.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
