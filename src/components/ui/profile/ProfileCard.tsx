import { useAuthStore } from "@/stores/authStore";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdLockOutline } from "react-icons/md";
import EditPersonalItemsModal from "./EditPersonalItemsModal";

interface ProfileCardProps {
  header: string;
  items: { label: string; value?: string }[];
}

export default function ProfileCard({ header, items }: ProfileCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthStore();
  const isAdminRole = user?.role === "admin" || user?.role === "super_admin";
  return (
    <section className="card grow space-y-6" aria-label={header}>
      <div className="flex justify-between items-center gap-2 flex-wrap">
        <h4 className="flex items-center gap-2 text-text-secondary">
          <MdLockOutline aria-hidden="true" />
          <span className="font-bold text-[10px] md:text-xs uppercase">
            {header}
          </span>
        </h4>

        {header === "personal information" && isAdminRole && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex gap-2 items-center text-accent cursor-pointer"
          >
            <CiEdit />
            <span className="text-xs md:text-sm font-semibold tracking-wider">
              Edit
            </span>
          </button>
        )}
      </div>

      <ul className="space-y-5 md:space-y-6">
        {items.map(({ label, value }) => (
          <li
            key={label}
            className="flex justify-between items-center gap-2 flex-wrap border-b border-border-card pb-2"
          >
            <span className="text-xs md:text-sm text-text-primary/70">
              {label}
            </span>
            <span className="text-xs md:text-sm text-accent font-medium">
              {value}
            </span>
          </li>
        ))}
      </ul>

      <EditPersonalItemsModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </section>
  );
}
