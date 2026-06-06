"use client";
import { useAuthStore } from "@/stores/authStore";
import Link from "next/link";
import { FaRegBell, FaUserCircle } from "react-icons/fa";
import { ROLE_BASE_ROUTES } from "@/data/roles";
import Image from "next/image";
import { ProfileSkeleton } from "../ui/skeletons/ProfileSkeleton";
import { useMemo } from "react";

interface HeaderProps {
  search?: React.ReactNode;
}

export default function Header({ search }: HeaderProps) {
  const { user } = useAuthStore();
  const base = useMemo(
    () => ROLE_BASE_ROUTES[user?.role ?? ""] ?? "/",
    [user?.role],
  );

  return (
    <header className="py-3 md:py-5 bg-bg-input border-b border-bg-bar">
      <div className="Custom-container flex justify-end md:justify-between items-center">
        {/* Search slot injected by parent */}
        {search}

        <div className="flex items-center gap-4">
          {/* Notification bell */}
          <button type="button" aria-label="Notifications" className="relative">
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

          {/* Profile: skeleton while loading, avatar/fallback icon when ready */}
          {!user ? (
            <ProfileSkeleton />
          ) : (
            <Link
              href={`${base}/profile`}
              aria-label={`Go to ${user.full_name}'s profile`}
              className="flex items-center gap-3"
            >
              {user.avatar_url ? (
                <Image
                  src={user.avatar_url}
                  alt={user.full_name}
                  width={36}
                  height={36}
                  priority
                  className="rounded-full object-cover w-9 h-9"
                />
              ) : (
                <FaUserCircle
                  aria-hidden="true"
                  className="text-primary text-4xl"
                />
              )}

              {/* Hidden from screen readers — link label already covers this */}
              <div aria-hidden="true">
                <p className="text-text-primary text-sm">{user.full_name}</p>
                <p className="text-text-subtle text-[10px]">{user.email}</p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
