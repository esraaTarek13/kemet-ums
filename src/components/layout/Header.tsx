"use client";
import { useAuthStore } from "@/stores/authStore";
import Link from "next/link";
import { FaRegBell, FaUserCircle } from "react-icons/fa";
import { ROLE_BASE_ROUTES } from "@/data/roles";
import Image from "next/image";
import { HeaderSkeleton } from "../ui/skeletons/HeaderSkeleton";

interface HeaderProps {
  search?: React.ReactNode;
}
export default function Header({ search }: HeaderProps) {
  // Get current user and resolve their base route
  const { user } = useAuthStore();
  const base = ROLE_BASE_ROUTES[user?.role ?? ""] ?? "/";

  return (
    <header className="py-3 md:py-5 bg-bg-input border-b border-bg-bar">
      <div className="Custom-container flex justify-end md:justify-between items-center">
        {search}
        <div className="flex items-center gap-4">
          {/* Bell with notification badge */}
          <button
            type="button"
            aria-label="Notifications — 3 unread"
            className="relative"
          >
            <FaRegBell
              aria-hidden="true"
              className="text-text-primary text-xl"
            />
            <span
              aria-hidden="true"
              className="absolute -top-1.5 -right-1.5 bg-accent text-text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
            >
              3
            </span>
          </button>

          {/* User avatar and info linking to profile */}
          {!user ? (
            <HeaderSkeleton />
          ) : (
            <Link
              href={`${base}/profile`}
              aria-label={`Go to profile of ${user?.full_name}`}
              className="flex items-center gap-3"
            >
              {user.avatar_url ? (
                <Image
                  src={user.avatar_url}
                  alt={user.full_name}
                  width={36}
                  height={36}
                  className="rounded-full object-cover w-9 h-9"
                />
              ) : (
                <FaUserCircle
                  aria-hidden="true"
                  className="text-primary text-4xl"
                />
              )}
              <div>
                <p className="text-text-primary text-sm">{user?.full_name}</p>
                <p className="text-text-subtle text-[10px]">{user?.email}</p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
