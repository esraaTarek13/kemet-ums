"use client";
import { useAuthStore } from "@/stores/authStore";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { ROLE_BASE_ROUTES } from "@/data/shared/roles";
import Image from "next/image";
import { useMemo } from "react";
import NotificationBell from "./notifications/NotificationBell";
import { useNotificationPanel } from "@/hooks/shared/notifications/useNotificationPanel";
import { NavbarSkeleton } from "../ui/skeletons/UserInfoSkeleton";
import ErrorMessage from "../ui/shared/ErrorMessage";

interface HeaderProps {
  search?: React.ReactNode;
}

export default function Header({ search }: HeaderProps) {
  const { user, isLoading } = useAuthStore();
  const { isPending, isError } = useNotificationPanel();
  const base = useMemo(
    () => ROLE_BASE_ROUTES[user?.role ?? ""] ?? "/",
    [user?.role],
  );

  if (isLoading && isPending) return <NavbarSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load notifications" />;

  return (
    <header className="py-3 md:py-5 bg-bg-input border-b border-bg-bar">
      <div className="Custom-container flex justify-end md:justify-between items-center">
        {search}

        <div className="flex items-center gap-4">
          <NotificationBell />

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
