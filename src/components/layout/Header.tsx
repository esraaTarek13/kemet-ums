"use client";
import { useAuthStore } from "@/stores/authStore";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { ROLE_BASE_ROUTES } from "@/data/shared/roles";
import Image from "next/image";
import { useMemo } from "react";
import NotificationBell from "./notifications/NotificationBell";
import { NavbarSkeleton } from "../ui/skeletons/UserInfoSkeleton";
import { LuMessageSquare } from "react-icons/lu";
import { useUnreadMessages } from "@/hooks/shared/useUnreadMessages";

interface HeaderProps {
  search?: React.ReactNode;
}

export default function Header({ search }: HeaderProps) {
  const { user, isLoading } = useAuthStore();
  const base = useMemo(
    () => ROLE_BASE_ROUTES[user?.role ?? ""] ?? "/",
    [user?.role],
  );
  const { totalUnread } = useUnreadMessages(user?.role ?? "");

  if (isLoading) return <NavbarSkeleton />;

  return (
    <header className="py-3 md:py-5 bg-bg-input border-b border-bg-bar">
      <div className="Custom-container flex justify-end md:justify-between items-center">
        {search}
        <div className="flex items-center gap-4">
          <NotificationBell />

          {(base === "/faculty" || base === "/student") && (
            <Link href={`${base}/messages`} className="relative">
              <LuMessageSquare
                aria-hidden="true"
                className="text-text-primary text-2xl cursor-pointer"
              />
              {totalUnread > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-accent text-text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalUnread}
                </span>
              )}
            </Link>
          )}

          {user && (
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
