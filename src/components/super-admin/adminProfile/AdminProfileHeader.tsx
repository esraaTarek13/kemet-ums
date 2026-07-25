import StatusBadge, { BadgeStatus } from "@/components/ui/shared/StatusBadge";
import { AdminProfileDetail } from "@/types";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import UpdateAdminProfileModal from "./update-admin-profile/UpdateAdminProfileModal";

interface AdminProfileHeaderProps {
  admin: AdminProfileDetail | undefined;
}

export default function AdminProfileHeader({ admin }: AdminProfileHeaderProps) {
  return (
    <section
      aria-label={`${admin?.full_name} Admin Profile header`}
      className="card flex flex-col lg:flex-row justify-between gap-4 lg:items-center"
    >
      <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-5 lg:gap-6">
        {admin?.avatar_url ? (
          <Image
            src={admin?.avatar_url}
            alt={`${admin?.full_name}'s profile picture`}
            width={100}
            height={100}
            priority
            className="rounded-full object-cover w-18 md:w-22 h-18 md:h-22"
          />
        ) : (
          <span role="img" aria-label={`${admin?.full_name}'s profile picture`}>
            <FaUserCircle
              aria-hidden="true"
              className="text-primary text-7xl md:text-8xl shrink-0"
            />
          </span>
        )}

        <div className="flex flex-col justify-center md:items-start gap-1">
          <div className="flex items-center justify-center sm:justify-start gap-1.5 lg:gap-3 flex-wrap">
            <h3 className="header-title">{admin?.full_name}</h3>
            {admin?.status && (
              <StatusBadge status={admin?.status as BadgeStatus} />
            )}
          </div>

          <span className="header-subtitle text-text-secondary/80 text-center sm:text-start">
            {admin?.admin_code}
          </span>
        </div>
      </div>

      {admin && <UpdateAdminProfileModal admin={admin} />}
    </section>
  );
}
