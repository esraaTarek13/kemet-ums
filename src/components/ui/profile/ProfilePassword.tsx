import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { MdLockOpen } from "react-icons/md";
import ChangePasswordModal from "./ChangePasswordModal";

interface ProfilePasswordProps {
  lastPasswordChangedAt?: string | null;
}

export default function ProfilePassword({
  lastPasswordChangedAt,
}: ProfilePasswordProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Guard against invalid/missing date values from the server
  const parsedDate = lastPasswordChangedAt
    ? new Date(lastPasswordChangedAt)
    : null;
  const isValidDate = parsedDate && !isNaN(parsedDate.getTime());

  const lastChanged = isValidDate
    ? `Last changed ${formatDistanceToNow(parsedDate, { addSuffix: true })}`
    : "Password has never been changed";

  return (
    <>
      <section className="card space-y-6" aria-label="Security">
        <h4 className="flex items-center justify-between gap-2 text-text-secondary">
          <span className="font-bold text-xs uppercase">security</span>
          <MdLockOpen aria-hidden="true" />
        </h4>

        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div>
            <p className="text-sm md:text-base text-accent font-medium">
              Password
            </p>
            <p className="text-xs md:text-sm text-text-secondary">
              {lastChanged}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="btn-light py-2 px-4 md:px-6 border border-accent rounded-lg font-semibold text-xs md:text-sm text-accent cursor-pointer"
          >
            Change Password
          </button>
        </div>
      </section>

      <ChangePasswordModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
