import type { AsideProps } from "@/types";
import { HiMiniArrowRightStartOnRectangle } from "react-icons/hi2";
import NavLink from "./NavLink";
import { useLogout } from "@/hooks/auth/useLogout";
import Image from "next/image";

export default function Aside({ portalName, navLinks }: AsideProps) {
  const { mutate, isPending } = useLogout();

  return (
    <aside
      aria-label={`${portalName} sidebar`}
      className="h-screen fixed flex flex-col bg-primary py-8 px-3 md:px-4 z-50"
    >
      {/* mobile: icon only, desktop: full logo */}
      <Image
        src="/images/mark-logo.png"
        alt="Kemet University Logo"
        width={40}
        height={40}
        className="h-auto w-auto md:hidden"
        priority
      />
      <Image
        src="/images/kemet-logo.png"
        alt="Kemet University Logo"
        width={120}
        height={40}
        className="h-auto w-auto hidden md:block"
        priority
      />
      <p className="hidden md:block font-light md:text-[10px] lg:text-xs text-text-peach uppercase tracking-wider pt-2">
        {portalName}
      </p>
      <nav aria-label="Main navigation" className="flex flex-col mt-6 md:mt-10">
        <ul className="space-y-1">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </ul>
      </nav>
      {/* pinned bottom, disabled while pending */}
      <button
        onClick={() => mutate()}
        disabled={isPending}
        type="button"
        aria-label={`Logout from ${portalName}`}
        aria-disabled={isPending}
        className="flex items-center gap-3 mt-auto px-2 md:px-4 py-1.5 md:py-3 text-text-peach cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <HiMiniArrowRightStartOnRectangle
          aria-hidden="true"
          className="text-2xl md:text-xl shrink-0"
        />
        <span className="hidden md:block uppercase text-sm lg:text-base">
          {isPending ? "Logging out..." : "Logout"}
        </span>
      </button>
    </aside>
  );
}
