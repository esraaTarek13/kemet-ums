import type { NavLinkItem } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, label, icon: Icon }: NavLinkItem) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <li className="relative group">
      <Link
        href={href}
        aria-current={isActive ? "page" : undefined}
        className={`flex items-center gap-3 px-2 md:px-4 py-1.5 md:py-3 rounded-lg transition-colors border-l-4 
          ${
            isActive
              ? "text-text-white bg-bg-card/10 border-text-peach"
              : "text-text-white/70 hover:bg-bg-card/5 border-transparent hover:border-text-white hover:text-text-white"
          }`}
      >
        <Icon
          aria-hidden="true"
          className={`text-xl shrink-0 ${isActive ? "text-text-peach" : "text-text-white/70"}`}
        />
        <span className="hidden md:block text-xs lg:text-sm">{label}</span>
      </Link>

      <span
        role="tooltip"
        className="md:hidden absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded-md text-xs text-text-white bg-gray-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50"
      >
        {label}
      </span>
    </li>
  );
}