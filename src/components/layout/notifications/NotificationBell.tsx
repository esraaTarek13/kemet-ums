"use client";
import { useNotificationPanel } from "@/hooks/shared/notifications/useNotificationPanel";
import * as Popover from "@radix-ui/react-popover";
import { FaRegBell } from "react-icons/fa";
import NotificationItem from "./NotificationItem";

export default function NotificationBell() {
  const {
    ref,
    open,
    unreadCount,
    notifications,
    handleOpen,
    close,
    isPending,
    isError,
  } = useNotificationPanel();

  if (isPending || isError)
    return (
      <FaRegBell
        aria-hidden="true"
        className="text-text-primary text-xl opacity-50"
      />
    );

  return (
    <Popover.Root open={open} onOpenChange={handleOpen}>
      {/* Wrapped in div because Radix Popover.Root doesn't forward refs */}
      <div ref={ref}>
        <Popover.Trigger asChild>
          <button type="button" aria-label="Notifications" className="relative">
            <FaRegBell
              aria-hidden="true"
              className="text-text-primary text-xl cursor-pointer"
            />
            {/* 9+ to avoid badge overflow on small screens */}
            {unreadCount > 0 && (
              <span
                aria-label={`${unreadCount} unread notifications`}
                className="absolute -top-1.5 -right-1.5 bg-accent text-text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
              >
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            align="end"
            sideOffset={10}
            className="w-80 bg-bg-card border border-border rounded-xl shadow-[0_4px_24px_0px_#4a1b2640] z-50 overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-border">
              <h6 className="font-bold text-sm text-text-primary">
                Notifications
              </h6>
            </div>

            <ul className="flex flex-col py-2 max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <li className="px-4 py-6 text-center text-sm text-text-muted">
                  No notifications yet.
                </li>
              ) : (
                notifications.map((n) => (
                  <NotificationItem
                    key={n.id}
                    notification={n}
                    onClose={close}
                  />
                ))
              )}
            </ul>
          </Popover.Content>
        </Popover.Portal>
      </div>
    </Popover.Root>
  );
}
