import { AsideProps } from "@/types";
import { HiMiniArrowRightStartOnRectangle } from "react-icons/hi2";
import NavLink from "./NavLink";
import { useLogout } from "@/hooks/auth/useLogout";

export default function Aside({ portalName, navLinks }: AsideProps) {
  const { mutate, isPending } = useLogout();

  return (
    <aside
      aria-label={`${portalName} sidebar`}
      className="h-screen fixed flex flex-col bg-primary py-8 px-3 md:px-4 z-50"
    >
      {/* Responsive logo: icon on mobile, full logo on md+ */}
      <picture>
        <source media="(min-width: 768px)" srcSet="/images/kemet-logo.png" />
        <img
          src="/images/mark-logo.png"
          alt="Kemet University Logo"
          width={120}
          height={40}
          className="w-10 md:w-26 lg:w-30"
        />
      </picture>

      {/* Portal name label — hidden on mobile */}
      <p className="hidden md:block font-light md:text-[10px] lg:text-xs text-text-peach uppercase tracking-wider pt-2">
        {portalName}
      </p>

      {/* Nav links */}
      <nav aria-label="Main navigation" className="flex flex-col mt-6 md:mt-10">
        <ul className="space-y-1">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </ul>
      </nav>

      {/* Logout button — pinned to bottom */}
      <button
        onClick={() => mutate()}
        disabled={isPending}
        type="button"
        aria-label="Logout from your account"
        className="flex items-center gap-3 mt-auto px-2 md:px-4 py-1.5 md:py-3 text-text-peach cursor-pointer"
      >
        <HiMiniArrowRightStartOnRectangle
          aria-hidden="true"
          className="text-2xl md:text-xl shrink-0"
        />
        <span className="hidden md:block uppercase text-sm lg:text-base">
          Logout
        </span>
      </button>
    </aside>
  );
}
