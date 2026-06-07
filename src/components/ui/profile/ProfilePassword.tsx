import { MdLockOpen } from "react-icons/md";

export default function ProfilePassword() {
  return (
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
          <p className="text-xs md:text-sm text-text-secondary/70">
            Last changed 3 months ago
          </p>
        </div>
        <button
          type="button"
          className="py-2 px-4 md:px-6 border border-accent rounded-lg font-semibold text-xs md:text-sm text-accent"
        >
          Change Password
        </button>
      </div>
    </section>
  );
}
