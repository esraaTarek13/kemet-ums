"use client";
import { useState, useRef } from "react";
import useClickOutside from "@/hooks/shared/useClickOutside";
import { useMarkNotificationsRead, useNotifications } from "./useNotifications";

export function useNotificationPanel() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { data, isPending, isError } = useNotifications();
  const { mutate: markRead } = useMarkNotificationsRead();

  const unreadCount = data?.unread_count ?? 0;
  const notifications = data?.notifications ?? [];

  function handleOpen(isOpen: boolean) {
    setOpen(isOpen);
    if (isOpen && unreadCount > 0) markRead(undefined);
  }

  useClickOutside(ref, {
    onScroll: () => setOpen(false),
    enabled: open,
  });

  return {
    ref,
    open,
    unreadCount,
    notifications,
    handleOpen,
    close: () => setOpen(false),
    isPending,
    isError,
  };
}
